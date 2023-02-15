const User = require("../models/userModel");

exports.postUser = async (req, res, next) => {
  try {
    const user = await User.updateOne(
      { email: req.params.email },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          photoURL: req.body.photo,
        },
      },
      { upsert: true }
    );
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.query.email }, { __v: 0 });
    if (user?.email) {
      return res.status(200).send({ status: true, user });
    }
    res.status(404).send({ status: false, message: "User Not Found" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
