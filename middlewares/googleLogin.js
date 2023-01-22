require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const { GoogleUser } = require("../models/GoogleUser");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleVerify = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  console.log(payload);
  return payload;
};

const googleLogin = async (token) => {
  try {
    const credential = await googleVerify(token);
    let user = await GoogleUser.find({ email: credential.email });

    if (user.length < 1) {
      await GoogleUser.create({
        email: credential.email,
        email_verified: credential.email_verified,
        sub: credential.sub,
        username: credential.name,
        "profile.path": credential.picture,
      });
      user = await GoogleUser.find({ email: credential.email });
    }

    return user;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { googleLogin };
