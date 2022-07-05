import mongoose from "mongoose";

const dbConnection = async (dbUrl) => {
  await mongoose
    .connect(dbUrl)
    .then(() => console.log(`Database connected`))
    .catch((err) => console.log("Error", err));
};

export default dbConnection;
