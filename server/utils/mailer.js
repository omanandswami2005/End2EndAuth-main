import chalk from "chalk";
import nodemailer from "nodemailer";
import "dotenv/config.js"

const transporter = nodemailer.createTransport({
  service: "Gmail",
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationCodeEmail = async (email, verificationCode) => {
  const message = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verification Code",
    text: "Check your verification code!",
    html: `Your Verification code is 👉 ${verificationCode}`,
  };

  try {
    await transporter.sendMail(message);
    console.log(
      chalk.bgMagentaBright.underline("Success send the verification email!")
    );
  } catch (error) {
    console.error(error);
  }
};

const sendVerificationEmail = async (email, redirectLink) => {
  const message = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verification Code",
    text: "Check your verification code!",
    html: `Your Link is 👉 ${redirectLink}`,
  };

  try {
    await transporter.sendMail(message);
    console.log(
      chalk.bgMagentaBright.underline("Success send the verification email!")
    );
  } catch (error) {
    console.error(error);
  }
};

export { sendVerificationCodeEmail, sendVerificationEmail };
