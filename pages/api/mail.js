// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SEND_GRID_API_KEY);
// 1st approach - with node server running
export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  const message = `
    Name: ${body.name}\r\n
    Email: ${body.email}\r\n
    Message: ${body.message}\r\n
  `;

  const data = {
    to: "rafal@digital-detox.co.uk",
    from: "hello@porzucek.dev",
    subject: "NextJS + SendGrid POC",
    text: message,
    html: message.replace(/\r\n/g, '<br>')
  };

  try {
    await sendgrid.send(data);
    res.status(200).json({ status: 'OK' });

  } catch ( error ) {
    res.status(error.statusCode || 500).json({ error: error.message })
  }
};
