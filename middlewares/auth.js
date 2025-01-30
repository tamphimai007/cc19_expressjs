exports.auth = (req, res, next) => {
  if (true) {
    console.log("Hello middlewares");
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
