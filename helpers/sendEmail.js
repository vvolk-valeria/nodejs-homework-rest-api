const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (data) => {
  try {
    const email = {...data, from: 'vvolk.valeria@meta.ua'}
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error;
  }
}


module.exports = sendEmail;