const { default: mongoose } = require("mongoose");

const connectDB = async (DATABASE_URL) => {
    console.log(DATABASE_URL);
    try {
        const DB_OPTIONS = {
            dbName: "emailCornJob",
        };
        await mongoose.connect(DATABASE_URL, DB_OPTIONS);
        console.log("Connected Successfully...");
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;
