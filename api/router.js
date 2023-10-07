const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const fileUpload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid'); // Import UUID generator
const { MongoClient } = require('mongodb'); // MongoDB driver

// Configure AWS SDK with credentials and region
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const kms = new AWS.KMS({ apiVersion: '2014-11-01' });
const jwtSecretKey = process.env.JWT_SECRET_KEY || 'default-secret-key';
const signingAlgorithm = process.env.SIGNING_ALGORITHM || 'RSASSA_PKCS1_V1_5_SHA_256';

// Move fileUpload middleware configuration below routes
router.use(fileUpload());

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Define a route to sign a PDF
router.post('/sign', async (req, res) => {
  try {
    if (!req.files || !req.files.pdfFile) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    const pdfFile = req.files.pdfFile.data; // Access the uploaded file data

    const { KeyId, Signature } = await kms.sign({
      KeyId: process.env.AWS_KMS_KEY_ID,
      Message: pdfFile,
      MessageType: 'RAW',
      SigningAlgorithm: signingAlgorithm,
    }).promise();

    const token = jwt.sign({ Signature }, jwtSecretKey);


    // Create a UUID for the document
    const documentId = uuidv4();

    // Save the response in MongoDB
    const client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    const db = client.db(process.env.MONGODB_DATABASE);
    const collection = db.collection('signed_documents'); // Replace with your collection name

    const signDocument = {
      _id: documentId,
      token,
      // Add other properties you want to save here
    };

    await collection.insertOne(signDocument);

    client.close();

    res.json({ token, documentId });

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to sign PDF' });
  }
});

// Define a route to verify a PDF
router.post('/verify', async (req, res) => {
  try {
    if (!req.files || !req.files.pdfFile) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    const pdfFile = req.files.pdfFile.data; // Access the uploaded file data

    const documentId = req.body.documentId; // Assuming you pass the document ID in the request body

    // Retrieve the JWT token from MongoDB using the document ID
    const client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    const db = client.db(process.env.MONGODB_DATABASE);
    const collection = db.collection('signed_documents'); // Replace with your collection name

    const document = await collection.findOne({ _id: documentId });

    if (!document) {
      client.close();
      return res.status(200).json({ verified: false });
    }

    const token = document.token;

    
    const decoded = jwt.verify(token, jwtSecretKey);
    const signature = decoded.Signature;

    const verificationResult = await kms.verify({
      KeyId: process.env.AWS_KMS_KEY_ID,
      Message: pdfFile,
      MessageType: 'RAW',
      SigningAlgorithm: signingAlgorithm,
      Signature: Buffer.from(signature, 'base64'),
    }).promise();

    res.json({ verified: verificationResult.SignatureValid });
  } catch (error) {
    console.error(error);
    res.status(200).json({ verified: false });
  }
});

module.exports = router;
