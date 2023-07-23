export default function emailTemplate(validationCode: string) {
  return {
    from: "blah@example.com",
    to: "blabla@example.com",
    subject: "Test Email",
    text: `Your activation code ${validationCode}`,
    html: `<p>Your activation code ${validationCode}</p>`,
  };
}
