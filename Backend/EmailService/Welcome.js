const ejs = require("ejs");
const dotenv = require("dotenv");
const sendMail = require("../helpers/sendEmail");
dotenv.config();

const sendWelcomeEmail = async (fullname, staffID, password, email) => {
  ejs.renderFile(
    "templates/welcome.ejs",
    {fullname, staffID, password},
    async (err, data) => {
      let messageoption = {
        from: process.env.EMAIL,
        to: email,
        subject: "Your Welcome Credentials",
        html: data,
        attachments: [
          {
            filename: "assignment.txt",
            content: `Make sure to remember that password when logging in`,
          },
        ],
      };

      try {
        sendMail(messageoption);
      } catch (error) {
        console.log(err);
      }
    }
  );
};

module.exports={sendWelcomeEmail};
