const { connect } = require("mongoose");

const connectDB = async () => {
  try {
    await connect(process.env.MONGO_DB).then(() =>
      console.log("DB Connection successfully!")
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDB };
