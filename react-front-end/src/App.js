import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { createApiUrl } from './Api'; // Import the createApiUrl function

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [documentId, setDocumentId] = useState('');
  const [verificationResult, setVerificationResult] = useState('');

  // Function to handle PDF file upload
  const handleFileUpload = (event) => {
    setPdfFile(event.target.files[0]);
  };

  // Function to sign the PDF
  const signPdf = async () => {
    try {
      const formData = new FormData();
      formData.append('pdfFile', pdfFile);

      // Send a POST request to sign endpoint
      const apiUrl = createApiUrl('sign');
      const response = await axios.post(apiUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setDocumentId(response.data.documentId);
      setVerificationResult(''); // Clear verification result
    } catch (error) {
      console.error('Error signing PDF:', error);
    }
  };

  // Function to verify the PDF
  const verifyPdf = async () => {
    try {
      if (!pdfFile || !documentId) {
        return console.error('Incomplete data for verification.');
      }

      const formData = new FormData();
      formData.append('pdfFile', pdfFile);
      formData.append('documentId', documentId);

      // Send a POST request to verify endpoint with the PDF file, token, and documentId
      const apiUrl = createApiUrl('verify');
      const response = await axios.post(apiUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setVerificationResult(response.data.verified ? 'Valid' : 'Invalid');
    } catch (error) {
      console.error('Error verifying PDF:', error);
    }
  };

  return (
    <div className="App">
      <h1>PDF Signing and Verification</h1>
      <div>
        <h2>Sign PDF</h2>
        <input type="file" accept=".pdf" onChange={handleFileUpload} />
        <button onClick={signPdf}>Sign</button>
        {documentId && (
          <div>
            <p>Document ID: {documentId}</p>         
          </div>
        )}
      </div>
      <div>
        <h2>Verify PDF</h2>
        <input
          type="file"
          accept=".pdf"
          onChange={(event) => {
            setPdfFile(event.target.files[0]);
            setVerificationResult(''); // Clear verification result
          }}
        />
        <input
          type="text"
          placeholder="Document ID"
          value={documentId}
          onChange={(event) => setDocumentId(event.target.value)}
        />
        <button onClick={verifyPdf}>Verify</button>
        {verificationResult && <p>Verification Result: {verificationResult}</p>}
      </div>
    </div>
  );
}

export default App;

