import mongoose, {Document, Schema} from "mongoose";


const UserSchema= new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
            minlength: [3, 'Username must be at least 3 characters long'],
            maxlength: [20, 'Username cannot be more than 20 characters long'],
            trim: true, // Ensures no leading or trailing spaces
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Please fill a valid email address',
            ],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters long'],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        address: {
            type: String,
            trim: true, // Ensures no leading or trailing spaces
        },
        phone: {
            type: String,
            match: [
                /^[0-9]{10}$/,
                'Please fill a valid phone number with 10 digits',
            ],
        },
        role: {
            type: String,
            enum: ['Super admin', 'Admin', 'Volunteer'],
            default: 'Volunteer',
        },
        applicationsCompleted: {
            type: Number,
            default: 0,
        },
    },
        { timestamps: true } // Adds createdAt and updatedAt timestamps
);


const ApplicationSchema= new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        fatherName: {
            type: String,
            required: [true, "Father's name is required"],
            trim: true,
        },
        documentType: {
            type: String,
            required: [true, 'Document type is required'],
        },
        documentNumber: {
            type: String,
            required: [true, 'Document number is required'],
        },
        mobile: {
            type: String,
            required: [true, 'Mobile number is required'],
        },
        verification: {
            type: Boolean,
            default: false,
        },
        address: {
            type: String,
            required: [true, 'Address is required'],
        },
        address1: {
            type: String,
            required: [false],
        },
        residenceType: {
            type: String,
            enum: ['Temporary', 'Permanent'],
            required: [true, 'Residence type is required'],
        },
        occupation: {
            type: String,
            required: [true, 'Occupation is required'],
        },
        category: {
            type: String,
            enum: ['GEN', 'OBC', 'STSC'],
            required: [true, 'Category is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Please fill a valid email address',
            ],
        },
        frontPhoto: {
            type: String,
            required: [true, 'Front photo is required'],
        },
        backPhoto: {
            type: String,
            required: [false, 'Back photo is required'],
        },
        photo: {
            type: String,
            required: [true, 'Photo is required'],
        },
        status: {
            type: String,
            enum: ['Pending', 'Pending Payment', 'Completed'],
            required: [true, 'Status is required'],
        },
        initiatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
)

// Export the model with TypeScript support
export const Application= mongoose.models.Application || mongoose.model('Application', ApplicationSchema);





export const User = mongoose.models.User || mongoose.model("User", UserSchema);

