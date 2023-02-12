const User = require("../models/userModel");

exports.postUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await User.updateOne(
      { email: req.params.email },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          photoURL: req.body.photoURL,
        },
      },
      { upsert: true }
    );
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
