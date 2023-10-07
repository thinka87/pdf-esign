
# SecureSign PDF System using node,express,react,mongo DB, AWS KMS  

SecureSign PDF is a robust and user-friendly system designed for the secure digital signing and verification of PDF documents, powered by AWS Key Management Service (KMS). Whether you need to authenticate the origin of a PDF or add your digital signature to ensure its integrity, this system provides a seamless and reliable solution. With SecureSign PDF, you can confidently manage your PDF documents with the assurance of authenticity and security, leveraging the encryption capabilities of AWS KMS. Sign and verify your PDFs with ease, making document validation a breeze while harnessing the power of AWS KMS for enhanced encryption and protection.

## Table of Contents

- [System Overview](#system-overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Setting Up the Express.js Server](#setting-up-the-expressjs-server)
  - [Setting Up the React Frontend](#setting-up-the-react-frontend)
- [Usage](#usage)
  - [Uploading and Signing a PDF](#uploading-and-signing-a-pdf)
  - [Verifying a PDF](#verifying-a-pdf)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

## System Overview

The PDF Signing and Verification System consists of two main components:

1. **Express.js Server:** This server provides endpoints for uploading, signing, and verifying PDF documents. It communicates with AWS KMS for PDF signing and MongoDB for document storage.

2. **React Frontend:** The React frontend allows users to interact with the system. It provides a user-friendly interface for uploading PDFs, signing them, and verifying their authenticity.

## Prerequisites

Before setting up and using the system, make sure you have the following prerequisites installed:

- Node.js and npm
- MongoDB (for storing signed documents)
- AWS account with KMS access (for PDF signing)
- Basic knowledge of React and Express.js

## Getting Started

### Setting Up the Express.js Server

1. Clone this repository to your local machine.

2. Navigate to the `api` directory:

   ```bash
   cd api
3. Install server dependencies:
    ```bash
   cd npm install

 4. Create a .env file in the server directory and configure the following environment variables:

    ```bash
    PORT=5000
    AWS_ACCESS_KEY_ID=your_aws_access_key_id
    AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
    AWS_REGION=your_aws_region
    AWS_KMS_KEY_ID=your_aws_kms_key_id
    JWT_SECRET_KEY=your_jwt_secret_key
    SIGNING_ALGORITHM=RSASSA_PKCS1_V1_5_SHA_256
    MONGODB_URI=your_mongodb_uri
    MONGODB_DATABASE=your_mongodb_database

 Replace the placeholders with your AWS credentials, KMS key ID, JWT secret key, MongoDB connection details, and other configuration options.
    
 5. Start the Express.js server:

    ```bash
    cd npm start
  The server will run on the specified port (default is 5000).
   
 ## Setting Up the React Frontend

To set up the React frontend of the PDF Signing and Verification System, follow these steps:

1. Open a new terminal window.

2. Navigate to the `react-front-end` directory within your project:

   ```bash
   cd react-front-end
3. Install server dependencies:
    ```bash
   cd npm install
4. Start the React app by running:
    ```bash
   cd npm start
    
The React app will now run locally and be accessible at http://localhost:3000 in your web browser. You can interact with the front end to upload, sign, and verify PDF documents.

Note: If the React app does not automatically open in your web browser, you can manually navigate to http://localhost:3000.

The React front end provides a user-friendly interface for users to interact with the system. It enables users to upload PDF documents, initiate the signing process, and verify the authenticity of signed documents. The front end communicates with the Express.js backend to perform these actions seamlessly.

Feel free to customize and enhance the React front end to meet the specific needs of your project or application.

## Usage

### Uploading and Signing a PDF

1. Access the React frontend at http://localhost:3000 (or the URL where your frontend is hosted).

2. Click the "Choose File" button to select a PDF file for signing.

3. Click the "Sign PDF" button to sign the uploaded PDF. You will receive  a document ID.

### Verifying a PDF

1. Upload the signed PDF that you want to verify.

2. Enter the document ID obtained during signing.

3. Click the "Verify PDF" button to check the authenticity of the PDF. The result (Valid or Invalid) will be displayed.

## Customization

You can customize the system by modifying the React frontend or Express.js server according to your requirements. Feel free to add more features or improve the user interface.

## Contributing

Contributions to this project are welcome! If you have any suggestions, enhancements, or bug fixes, please open an issue or create a pull request.
