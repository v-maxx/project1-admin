"use server";
import {Link, User, Withdrawal} from "./models";
import {redirect} from "next/navigation";
import bcrypt from "bcrypt";
import {signIn} from "../auth";
import mongoose from "mongoose";
import {auth} from "../auth"
import {connectToDB} from "@/app/lib/utils";
import {revalidatePath} from "next/cache";


const secret = process.env.AUTH_SECRET;

export const addUser = async (formData) => {
    try {
        // Validate that formData is an instance of FormData
        if (!(formData instanceof FormData)) {
            throw new Error('Invalid form data');
        }

        // Convert formData to an object
        const formDataObject = Object.fromEntries(formData.entries());
        const {username, email, password, phone, role, isActive} = formDataObject;

        await connectToDB();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username, email, password: hashedPassword, phone, role, // Ensure isAdmin is boolean
            isActive: isActive === 'true', // Ensure isActive is boolean
        });

        await newUser.save();

        revalidatePath("/dashboard/users");

    } catch (err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            const duplicateValue = err.keyValue[field];
            throw new Error(`${field}: "${duplicateValue}" already exists.`);
        } else {
            console.error(err);
            throw new Error("Failed to create user!");
        }
    }


};
export const addAdmin = async (formData) => {
    try {
        // Validate that formData is an instance of FormData
        if (!(formData instanceof FormData)) {
            throw new Error('Invalid form data');
        }

        // Convert formData to an object
        const formDataObject = Object.fromEntries(formData.entries());
        const {username, email, password, phone, role, isActive} = formDataObject;

        await connectToDB();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username, email, password: hashedPassword, phone, role, // Ensure isAdmin is boolean
            isActive: isActive === 'true', // Ensure isActive is boolean
        });

        await newUser.save();

        revalidatePath("/dashboard/admins");

    } catch (err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            const duplicateValue = err.keyValue[field];
            throw new Error(`${field}: "${duplicateValue}" already exists.`);
        } else {
            console.error(err);
            throw new Error("Failed to create user!");
        }
    }


};
export const updateUser = async (formData) => {


    try {
        if (!(formData instanceof FormData)) {
            throw new Error('Invalid form data');
        }

        const formDataObject = Object.fromEntries(formData.entries());
        const {id, username, email, password, phone, address, isActive} = formDataObject


        connectToDB();
        //
        // const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        //
        // if (existingUser && existingUser.id !== id) {
        //   throw new Error(`${existingUser.username === username ? 'Email' : 'Username'} already exists.`);
        // }
        const updateFields = {
            username, email, password, phone, address, isActive,
        };

        Object.keys(updateFields).forEach((key) => (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]);

        // If password is not being updated, remove it from updateFields
        if (!password) {
            delete updateFields.password;
        } else {
            const salt = await bcrypt.genSalt(10);
            updateFields.password = await bcrypt.hash(password, salt);
        }

        await User.findOneAndUpdate({_id: id}, updateFields, {new: true});


    } catch (err) {
        console.log('err in update', err);
        // throw Error ("Failed to update user!");
        // if (err.code === 11000) {
        //   const field = Object.keys(err.keyPattern)[0];
        //   const duplicateValue = err.keyValue[field];
        //   throw new Error(`${field}: "${duplicateValue}" already exists.`);
        // } else {
        //   console.error(err);
        //   throw new Error("Failed to create user!");
        // }
        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            const duplicateValue = err.keyValue[field];
            throw new Error(`${field}: "${duplicateValue}" already exists.`);
        } else {
            console.error(err);
            throw new Error("Failed to Update user!");
        }
    }

    revalidatePath("/dashboard/users");
    redirect("/dashboard/users");
};
export const updateWithdrawRequest = async (action, withdrawalId) => {
    try {
        await connectToDB();

        // Find the withdrawal request
        const withdrawal = await Withdrawal.findById(withdrawalId);
        if (!withdrawal) {
            throw new Error('Withdrawal request not found!');
        }

        const userId = withdrawal.requestedBy;
        const amount = parseFloat(withdrawal.amount);

        // Initialize update fields
        const updateFields = {};

        if (action === 'approve') {
            updateFields.status = 'Completed';

            // Update the user's payout fields
            await User.findByIdAndUpdate(userId, {
                $inc: {
                    'payout.pending': -amount,
                    'payout.settled': amount,
                },
            });
        } else if (action === 'reject') {
            updateFields.status = 'Rejected';

            // Update the user's payout fields
            await User.findByIdAndUpdate(userId, {
                $inc: {
                    'payout.pending': -amount,
                    'payout.available': amount,
                },
            });
        }

        // Update the withdrawal request's status
        await Withdrawal.findByIdAndUpdate(withdrawalId, updateFields, { new: true });

        // Revalidate and redirect to the withdraw requests page

    } catch (err) {
        console.log('Error in update:', err);
        throw new Error('Failed to update withdrawal request!');
    }finally {
        revalidatePath('/dashboard/withdraw-requests');
        redirect('/dashboard/withdraw-requests');
    }
};


export const addLink = async (formData) => {
    // const cookieStore = cookies();
    // const tokenCookie = cookieStore.get('next-auth.session-token');
    // const token = await getToken({ req: { cookies: { 'next-auth.session-token': tokenCookie.value } }, secret });
    const session = await auth()
    console.log('this is the token---', session);
    // if (!token || !token.id) {
    //   throw new Error("Authentication required!");
    // }
    const {url, isActive,reward} = Object.fromEntries(formData);
    console.log('form data---', url, isActive)
    try {
        await connectToDB();


        const newLink = new Link({
            url,reward, uuid: new mongoose.Types.ObjectId().toString(), isActive, completedBy: [], user: session.user.id,  // Use the user ID from the token

        });

        console.log('link added--', newLink)
        //
        await newLink.save();
    } catch (err) {
        console.log(err);
        throw new Error("Failed to create Link!");
    }

    revalidatePath("/dashboard/links");
    redirect("/dashboard/links");
};

export const updateLink = async (formData) => {
    // const cookieStore = cookies();
    // const tokenCookie = cookieStore.get('next-auth.session-token');
    // const token = await getToken({ req: { cookies: { 'next-auth.session-token': tokenCookie.value } }, secret });
    const session = await auth()
    console.log('this is the token---', session);
    // if (!token || !token.id) {
    //   throw new Error("Authentication required!");
    // }
    const {isActive,id} = formData;
    // console.log('form data---', url, isActive)
    try {
        await connectToDB();
const foundLink=await Link.findByIdAndUpdate(id,{isActive},{new:true})

        console.log('found by id--',foundLink)
        // const updated =await Link.findOneAndUpdate({
        //     uuid:id,
        // }, {isActive},{
        //     new: true
        // });

        // console.log('link updated--', foundLink)
    } catch (err) {
        console.log(err);
        throw new Error("Failed to create Link!");
    }

    revalidatePath("/dashboard/links");
    redirect("/dashboard/links");
};


export const deleteUser = async (formData) => {
    const {id} = Object.fromEntries(formData);

    try {
        connectToDB();
        await User.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
        throw new Error("Failed to delete user!");
    }

    revalidatePath("/dashboard/products");
};

export const deleteLink = async (formData) => {
    const {id} = Object.fromEntries(formData);

    try {
        connectToDB();
        await Link.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
        throw new Error("Failed to delete Link!");
    }

    revalidatePath("/dashboard/links");
};

export const authenticate = async (prevState, formData) => {
    const {username, password} = Object.fromEntries(formData);

    try {
        await signIn("credentials", {username, password});
    } catch (err) {
        if (err.message.includes("CredentialsSignin")) {
            return "Wrong Credentials";
        }
        throw err;
    }
};
