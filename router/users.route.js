const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const { ObjectID } = require("mongodb");
const authenticate = require("../middleware/auth");
const faker = require("faker");
const Utilities = require("../utils");

import {
  getUsers,
  deleteMe,
  getMe,
  getUser,
} from "../controllers/user.controller";

router.get("/me", authenticate, getMe);
router.delete("/me", authenticate, deleteMe);

router.get("/", authenticate, getUsers);
router.get("/:userName", authenticate, getUser);

// router.get("/me", authenticate, async (req, res) => {
//   res.send(req.user);
// });

router.get("/seed", async (req, res) => {
  let users = [];
  for (var i = 0; i < 50; i++) {
    const userName = faker.random.words(2);
    const slug = Utilities.stringToSlug(userName);

    let user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      userName: slug,
      password: "12345678",
      email: faker.internet.exampleEmail(),
      avatar: "https://picsum.photos/400/400?random=" + i,
      isVerified: true,
    };

    const u = new User(user);
    users.push(u);
  }

  User.insertMany(users)
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(400);
    });
});

router.patch("/me", authenticate, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "firstName",
    "lastName",
    "email",
    "password",
    "userName",
  ];
  const isValidOperation = updates.every((update) =>
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
    updates.forEach((update) => (req.user[update] = req.body[update]));
    req.user.updatedAt = new Date();
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = router;
