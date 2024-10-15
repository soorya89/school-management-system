import jwt from 'jsonwebtoken'; 

 const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET_KEY, {
    expiresIn: "5h",
  });
};
export default generateAccessToken
