const { Vonage } = require("@vonage/server-sdk");

const vonage = new Vonage({
  apiKey: "c211a1db",
  apiSecret: "iWn9vRwihk9d4MMb",
});

const from = "Vonage APIs";
const to = "918207202380";
const text = "This is sent from the trial file";

async function sendSMS() {
  await vonage.sms
    .send({ to, from, text })
    .then((resp) => {
      console.log("Message sent successfully");
      console.log(resp);
    })
    .catch((err) => {
      console.log("There was an error sending the messages.");
      console.error(err);
    });
}

sendSMS();
