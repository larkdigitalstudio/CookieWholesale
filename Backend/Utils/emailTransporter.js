import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, 
        pass: process.env.EMAIL_PASSWORD 
    }
});

// Verify the transporter
transporter.verify((error, success) => {
    if (error) {
        console.error('Error configuring Nodemailer:', error);
    } else {
        console.log('Nodemailer is ready to send emails');
    }
});
