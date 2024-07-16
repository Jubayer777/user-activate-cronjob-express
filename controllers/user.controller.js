const sendEmail = require("../config/send_mail");
const { validateEmail } = require("../helpers/validator");
const User = require("../model/user.model");
var cron = require("node-cron");
const taskList = {};
const createUser = async (req, res) => {
    try {
        const { email, userName} = req.body;
        if (!validateEmail(email)) {
            return res.status(200).json({
                message: `Invalid email`,
            });
        }
        const checkEmail = await User.findOne({ email: email });
        if (checkEmail) {
            return res.status(200).json({
                message: `User already exist`,
            });
        }
        const user = {
            userName: userName,
            email: email,
        };
        const savedUser = await new User(user).save();
        return res.status(200).json({
            message: `user created successfully for ${email}`,
            user: savedUser,
        });
    } catch (error) {
        return res.send(error.message);
    }
};

const activateUser = async (req, res) => {
    try {
        const { userName, email, date } = req.body;
        if (!validateEmail(email)) {
            return res.status(200).json({
                message: `Invalid email`,
            });
        }
        const checkEmail = await User.findOne({ email: email, alarm: false });
        if (!checkEmail) {
            return res.status(200).json({
                message: `User not exist or already alarm activated`,
            });
        }
        const localDate = new Date(date);
        const hours = localDate.getHours();
        const minutes = localDate.getMinutes();
        const name = "unique"+email;
        taskList[name] = cron.schedule(`0 ${minutes} ${hours} * * *`, () => {
            console.log("running a task every minute" + userName);
            sendEmail(req.body);
        });

        const id = checkEmail._id.toString();
        await User.findByIdAndUpdate(
            { _id: id },
            { $set: { alarm: true, cronTask: name } },
            { new: true }
        );
        return res.status(200).json("user is successfully activated");
    } catch (error) {
        return res.send(error.message);
    }
};
const deactivateUser = async (req, res) => {
    try {
        const {email} = req.body;
        if (!validateEmail(email)) {
            return res.status(200).json({
                message: `Invalid email`,
            });
        }
        const checkEmail = await User.findOne({ email: email, alarm: true });
        if (!checkEmail) {
            return res.status(200).json({
                message: `User not exist or already alarm Deactivated`,
            });
        }
        let my_job = taskList[checkEmail.cronTask];
        my_job.stop();
        const id = checkEmail._id.toString();
        await User.findByIdAndUpdate(
            { _id: id },
            { $set: { alarm: false, cronTask: null } },
            { new: true }
        );
        return res.status(200).json("user is successfully Deactivated");
    } catch (error) {
        return res.send(error.message);
    }
};
module.exports = { createUser, activateUser,deactivateUser };
