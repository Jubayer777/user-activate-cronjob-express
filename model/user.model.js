var mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    alarm: {
      type: Boolean,
      required: true,
      default:false
    },
    cronTask: {
      type: Object,
      default:null
    }, 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
