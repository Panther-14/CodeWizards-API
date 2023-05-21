const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


function sendBroadcastEmail({ toEmails, subject, body }){
  const msg = {
    to: toEmails,
    from: process.env.FROM_EMAIL,
    subject: subject,
    text: body,
  };
  sgMail.sendMultiple(msg);
}

module.exports = {
  sendBroadcastEmail
}