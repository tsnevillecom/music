const express = require("express");
const router = new express.Router();
const authenticate = require("../middleware/auth");
const Band = require("../models/band");
const User = require("../models/user");
const faker = require("faker");
const crypto = require("crypto");
const Utilities = require("../utils/");

router.get("/bands/seed", async (req, res) => {
  const users = await User.find({});

  let bands = [];
  for (var i = 0; i < 50; i++) {
    const randomUsers = [];
    for (var j = 0; j < 5; j++) {
      randomUsers.push(faker.random.arrayElement(users)._id);
    }
    const name = faker.random.words();
    const slug = Utilities.stringToSlug(name);

    let band = {
      introduction: faker.lorem.words(12),
      description: faker.lorem.words(60),
      address: {
        street: "1234 Main Street",
        city: faker.address.city(),
        state: faker.address.stateAbbr(),
        zip: parseInt(faker.address.zipCode())
      },
      members: randomUsers,
      avatar: "https://picsum.photos/400/400?random=" + i,
      websites: ["www.fsfsd.com", "www.abc123.net"],
      genres: ["R&B", "Blues", "Funk", "Rock"],
      active: true,
      name,
      slug
    };

    const b = new Band(band);
    bands.push(b);
  }

  Band.insertMany(bands)
    .then(bands => {
      res.status(200).send({ bands });
    })
    .catch(err => {
      res.status(400);
    });
});

router.get("/bands", authenticate, async (req, res) => {
  Band.find({ active: true }, (error, bands) => {
    if (error) return done(error);

    if (bands) {
      res.status(200).send(bands);
    }
  });
});

router.get("/bands/:slug", authenticate, async (req, res) => {
  const slug = req.params.slug;

  // Band.findOne({ slug }, (error, band) => {
  //   if (error || !band)
  //     return res.status(400).send({
  //       error: "We were unable to find this band."
  //     });
  //
  //   if (band) {
  //     res.status(200).send({ band });
  //   }
  // });

  Band.aggregate(
    [
      { $match: { slug } },
      { $unwind: "$slug" },
      {
        $lookup: {
          from: "users",
          localField: "members",
          foreignField: "_id",
          as: "members"
        }
      }
    ],
    (error, band) => {
      if (error || !band.length)
        return res.status(400).send({
          error: "We were unable to find this band."
        });

      if (!!band.length) {
        res.status(200).send({ band: band[0] });
      }
    }
  );
});

// router.get("/bands", async (req, res) => {
//   let arr = [];
//   for (var i = 0; i < 50; i++) {
//     const name = faker.random.words();
//     const slug = stringToSlug(name);
//
//     let band = {
//       _id: crypto.randomBytes(8).toString("hex"),
//       introduction: faker.lorem.words(12),
//       description: faker.lorem.words(60),
//       city: faker.address.city(),
//       state: faker.address.state(),
//       zipCode: faker.address.zipCode(),
//       avatar: "https://picsum.photos/400/400?random=" + i,
//       websites: ["www.fsfsd.com", "www.abc123.net"],
//       genres: ["R&B", "Blues", "Funk", "Rock"],
//       active: true,
//       name,
//       slug
//     };
//     arr.push(band);
//   }
//   return res.status(200).send(arr);
// });

module.exports = router;
