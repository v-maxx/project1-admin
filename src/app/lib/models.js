import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
      address:{
        type: String,
      },
    phone: {
      type: String,
    },
      role: { type: String, enum: ['Super admin', 'Admin', 'User'], default: 'User' }
  },
  { timestamps: true }
);


const linksSchema = new mongoose.Schema(
    {
        url: {
            type: String,
        },
        uuid: {
            type: String,
            required: true,
            unique: true,
            default: () => new mongoose.Types.ObjectId().toString(), // Generate a unique key
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true, autoIndex: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);

export const Link =
  mongoose.models.Link || mongoose.model("Link", linksSchema);
