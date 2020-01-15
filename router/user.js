const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const { ObjectID } = require("mongodb");
const authenticate = require("../middleware/auth");
const validator = require("validator");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

import { SENDGRID_PASSWORD, SENDGRID_USERNAME } from "../config";

const EmailToken = require("../models/emailToken");

router.get("/verify/:token", async (req, res) => {
  const token = req.params.token;
  debugger;
  EmailToken.findOne({ token }, (err, token) => {
    if (!token)
      return res.status(400).send({
        error:
          "We were unable to find a valid token. Your token may have expired."
      });

    //If token found, find a matching user
    User.findOne({ _id: token._userId }, (err, user) => {
      console.log(user);

      if (!user)
        return res.status(400).send({
          error: "We were unable to find a user for this token."
        });

      if (user.isVerified)
        return res.status(400).send({
          error: "This account has already been verified. Please login."
        });

      // Verify and save the user
      user.isVerified = true;
      user.save(error => {
        if (error) {
          return res.status(500).send({
            error: "We've encountered a problem verifying this account."
          });
        }
        res.status(200).send({
          user
        });
      });
    });
  });
});

router.get("/users", authenticate, async (req, res) => {
  User.find({}, (error, users) => {
    if (error) return done(error);

    if (users) {
      res.status(200).send(users);
    }
  });
});

router.post("/register", async (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(user => {
      const emailToken = new EmailToken({
        _userId: user._id,
        token: crypto.randomBytes(16).toString("hex")
      });

      emailToken
        .save()
        .then(token => {
          const transporter = nodemailer.createTransport({
            service: "Sendgrid",
            auth: {
              user: SENDGRID_USERNAME,
              pass: SENDGRID_PASSWORD
            }
          });

          const mailOptions = {
            from: "tsneville@gmail.com",
            to: user.email,
            subject: "Account Verification Token",
            text:
              "Hello,\n\n" +
              "Please verify your account by clicking the link: \nhttp://" +
              req.headers.host +
              "/verify/" +
              token.token +
              ".\n"
          };

          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              return res.status(409).send({
                user,
                error: "Could not send verification email. " + err.message
              });
            }

            res.status(200).send({
              user,
              token: token.token,
              success:
                "A verification email has been sent to " + user.email + "."
            });
          });
        })
        .catch(error => {
          res.status(409).send({
            user,
            message: "Could not send verification email."
          });
        });
    })
    .catch(error => {
      if (error.name === "MongoError" && error.code === 11000) {
        return res.status(400).send({
          success: false,
          message: "Username or email already exists."
        });
      }
      res.status(400).send(error);
    });
});

router.get("/users/:userName", authenticate, async (req, res) => {
  const userName = req.params.userName;

  if (userName === "me") {
    return res.send(req.user);
  }

  User.findOne({ userName: userName }, (err, user) => {
    if (err) return res.status(400).send("User not found.");

    if (user) {
      res.status(200).send(user);
    }
  });
});

router.get("/me", authenticate, async (req, res) => {
  res.send(req.user);
});

router.patch("/me", authenticate, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "firstName",
    "lastName",
    "email",
    "password",
    "userName"
  ];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );
  const _id = req.user._id;

  if (!isValidOperation) {
    res.status(400).send({ error: "Invalid request" });
  }

  if (!ObjectID.isValid(_id)) {
    return res.status(404).send();
  }

  try {
    updates.forEach(update => (req.user[update] = req.body[update]));
    req.user.updatedAt = new Date();
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send();
  }
});

router.delete("/me", authenticate, async (req, res) => {
  if (!ObjectID.isValid(req.user._id)) {
    return res.status(404).send();
  }

  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.checkValidCredentials(
      req.body.userName,
      req.body.password
    );
    const token = await user.newAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

router.post("/logout", authenticate, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/logoutall", authenticate, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
