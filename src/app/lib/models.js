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
      role: { type: String, enum: ['Super admin', 'Admin', 'User'], default: 'User' },
      accounts: [
          {
              bank: { type: String, required: true },
              name: { type: String, required: true },
              bankAccount: { type: String, required: true },
              ifsc:{type: String, required: true}
          }
      ],
      payout: {
          pending: { type: Number, default: 0 },
          available: { type: Number, default: 0 },
          settled: { type: Number, default: 0 }
      },
      tasksCompleted: {
          type: [
              {
                  taskId: {type: mongoose.Schema.Types.ObjectId, ref: 'Link'}, // Reference to a task
                  amount: {type: Number, default: 0}, // Ensure amount is a number
              }
          ],
          default: [],
      }

  },
  { timestamps: true }
);


const linksSchema = new mongoose.Schema(
    {
        url: {
            type: String,
        },
        reward: {
            type: Number,
            required: true,

        },
        uuid: {
            type: String,
            required: true,
            unique: true,
            default: () => new mongoose.Types.ObjectId().toString(), // Generate a unique key
        },
        isActive:{
            type: Boolean,
            required: true,
            default:true
        },
        completedBy:{
            type: Array,
            required: false,
            default:[]
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },


    },
    { timestamps: true, autoIndex: true}
);
const withdrawalSchema = new mongoose.Schema(
    {
        amount: {
            type: String,
        },
        uuid: {
            type: String,
            required: true,
            unique: true,
            default: () => new mongoose.Types.ObjectId().toString(), // Generate a unique key
        },
        status:{ type: String, enum: ['Pending', 'Rejected', 'Completed'], default: 'Pending' },
        requestedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },


    },
    { timestamps: true, autoIndex: true}
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);

export const Link =
  mongoose.models.Link || mongoose.model("Link", linksSchema);

export const Withdrawal =
  mongoose.models.Withdrawal || mongoose.model("Withdrawal", withdrawalSchema);
