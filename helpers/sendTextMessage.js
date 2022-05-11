const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const twilioTextMessage = async(data) => {
    await client.messages
      .create({
        body: `Se ha guardado correctamente la cita de ${data.puppyName}.`,
        from: "+19896568171",
        // messagingServiceSid: 'MG5bb5c6c7bbc183c732bf4811915491c5', 
        to: `+51${data.phone}`
      })
      .then(message => console.log(message.sid))
      .catch(error => console.log(error));
}

module.exports = twilioTextMessage;