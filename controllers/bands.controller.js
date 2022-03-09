import Band from "../models/band";
import User from "../models/user";

const Utils = require("../utils");
const faker = require("faker");

export const getBands = async (req, res) => {
  try {
    const bands = await Band.find({ active: true });
    res.status(200).json(bands);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getBand = async (req, res) => {
  const slug = req.params.slug;

  try {
    const band = await Band.aggregate([
      { $match: { slug } },
      { $unwind: "$slug" },
      {
        $lookup: {
          from: "users",
          localField: "members",
          foreignField: "_id",
          as: "members",
        },
      },
    ]);
    res.status(200).json({ band: band[0] });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const seedBands = async (req, res) => {
  try {
    const users = await User.find({});

    let bandsSeed = [];
    for (var i = 0; i < 50; i++) {
      const randomUsers = [];
      for (var j = 0; j < 5; j++) {
        randomUsers.push(faker.random.arrayElement(users)._id);
      }
      const name = faker.random.words();
      const slug = Utils.stringToSlug(name);

      let band = {
        introduction: faker.lorem.words(12),
        description: faker.lorem.words(60),
        address: {
          street: "1234 Main Street",
          city: faker.address.city(),
          state: faker.address.stateAbbr(),
          zip: parseInt(faker.address.zipCode()),
        },
        members: randomUsers,
        avatar: "https://picsum.photos/400/400?random=" + i,
        websites: ["www.fsfsd.com", "www.abc123.net"],
        genres: ["R&B", "Blues", "Funk", "Rock"],
        active: true,
        name,
        slug,
      };

      const b = new Band(band);
      bandsSeed.push(b);
    }

    const bands = await Band.insertMany(bandsSeed);
    res.status(200).send({ bands });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
