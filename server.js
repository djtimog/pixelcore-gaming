require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/send-pdf', async (req, res) => {
  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).send('Invalid or missing email');
  }

  try {
    // Generate PDF in memory
    const doc = new PDFDocument();
    let pdfBuffer = [];
    doc.on('data', (chunk) => pdfBuffer.push(chunk));
    doc.on('end', async () => {
      const pdfData = Buffer.concat(pdfBuffer);

      // Send email with PDF attachment
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your PDF is Ready!',
        text: 'Please find your PDF attached.',
        attachments: [
          {
            filename: 'output.pdf',
            content: pdfData,
          },
        ],
      };

      try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('PDF sent to your email!');
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        res.status(500).send('Failed to send email.');
      }
    });

    // Write PDF content
    doc.fontSize(18).text('Hello from the PDF!', { align: 'center' });
    doc.fontSize(12).text('This PDF was generated and sent via Node.js.', { align: 'center' });
    doc.end();
  } catch (error) {
    console.error('Error generating PDF or processing request:', error);
    res.status(500).send('Server error.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
