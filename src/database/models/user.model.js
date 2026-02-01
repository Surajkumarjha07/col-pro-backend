import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
    },

    role: {
      type: String,
      enum: ["user", "seller"],
      required: false,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", UserSchema);

export default User;
