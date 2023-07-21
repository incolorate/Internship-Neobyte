const checkAuth = (req, res, next) => {
  if (req.session.user.role === "Admin") {
    next();
  } else {
    return res.status(401).json("Unauthorized");
  }
};
export default checkAuth;
