import jwt from "jsonwebtoken";

export const generateToken = async (req, res) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const userId = req.body.userId;

  if (!jwtSecretKey) {
    return res.status(400).send("JWT Secret not set");
  }

  if (!userId) {
    return res.status(400).send("UserId not set");
  }

  const data = {
    time: Date(),
    userId,
  };

  const token = jwt.sign(data, jwtSecretKey);

  res.send({ token });
};
