const isValidFile = (req, res, next) => {
  if (!req.file) {
    res.status(400).json({
      message: "Missing file",
    });
    return;
  }
  next();
};

module.exports = isValidFile;
