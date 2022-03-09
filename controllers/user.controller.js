import User from "../models/user";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ isVerified: true });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  const userName = req.params.userName;

  try {
    const user = await User.aggregate([
      { $match: { userName } },
      {
        $lookup: {
          from: "bands",
          localField: "_id",
          foreignField: "members",
          as: "bands",
        },
      },
    ]);
    res.status(200).json({ user: user[0] });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMe = async (req, res) => {
  res.send(req.user);

  //   try {
  //     const user = req.user;
  //     res.send(req.user);
  //     // res.status(200).json(user);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
};

export const deleteMe = async (req, res) => {
  try {
    if (!ObjectID.isValid(req.user._id)) {
      return res.status(404).send();
    }

    try {
      await req.user.remove();
      res.send(req.user);
    } catch (error) {}
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
