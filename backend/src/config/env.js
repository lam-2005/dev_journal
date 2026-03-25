import "dotenv/config";
const ENV = {
  PORT: process.env.PORT || 8080,
  DB_URI: process.env.DB_URI,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
};
export default ENV;
