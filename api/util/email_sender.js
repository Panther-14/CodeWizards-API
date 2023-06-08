const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmail({ toEmail, subject, body }){
  const msg = {
    to: toEmail,
    from: process.env.FROM_EMAIL,
    subject: subject,
    text: body,
  };
  sgMail.send(msg);
}

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
  sendEmail,
  sendBroadcastEmail
}