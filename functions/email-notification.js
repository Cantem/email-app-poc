const sendgrid = require("@sendgrid/mail");

// 2nd approach using serverless function
exports.handler = async function (event, context) {
	/**
	 * TODO add SendGrid API key as a secret
	 * and retrieve it in the handler
	 * as netlify.toml gets commited
	 */
	sendgrid.setApiKey(process.env.SEND_GRID_API_KEY);

  try {
    const parsedPayload = JSON.parse(event.body);
    const data = {
      to: "rafal@digital-detox.co.uk",
      from: "hello@porzucek.dev",
      subject: "NextJS + SendGrid POC",
      text: parsedPayload.message,
      html: parsedPayload.html,
    };
    await sendgrid.send(data);
		/**
		 * even in 'Success' case
		 * throws error if you don't return statusCode
		 */
    return {
      statusCode: 200,
    };
  } catch (error) {
    console.log('Error while sending your email', error);
    return {
      statusCode: 500,
      error,
    };
  }
};
