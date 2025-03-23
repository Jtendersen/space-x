import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Authheader--->", authHeader);
    if (!authHeader) {
      return res
        .status(401)
        .send("Authorization required. Please provide ad valid token.");
    }

    const decodedToken = jwt.verify(authHeader, process.env.JWT_SECRET_KEY);

    req.currentUserId = (decodedToken as { userId: string }).userId;
    return next();
  } catch (error) {
    return res.status(401).send("Invalid token or expired.. ");
  }
};
