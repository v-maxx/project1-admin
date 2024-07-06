"use server";

import {Link, Product, User} from "./models";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "../auth";
import {cookies} from "next/headers";
import mongoose from "mongoose";
import {authConfig} from "@/app/authconfig";
import { auth } from "../auth"
import {toast} from "react-toastify";
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
    const { username, email, password, phone, isAdmin, isActive } = formDataObject;

    await connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      isAdmin: isAdmin === 'true', // Ensure isAdmin is boolean
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
export const updateUser = async (formData) => {
  const { id, username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      username,
      email,
      password,
      phone,
      address,
      isAdmin,
      isActive,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw Error ("Failed to update user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const addProduct = async (formData) => {
  const { title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const newProduct = new Product({
      title,
      desc,
      price,
      stock,
      color,
      size,
    });

    await newProduct.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create product!");
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
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

  const { url } = Object.fromEntries(formData);

  try {
    await connectToDB();

    const newLink = new Link({
      url,
      user: session.user.id,  // Use the user ID from the token
      uuid: new mongoose.Types.ObjectId().toString(),
    });
    //
    await newLink.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create Link!");
  }

  revalidatePath("/dashboard/links");
  redirect("/dashboard/links");
};
export const updateProduct = async (formData) => {
  const { id, title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      title,
      desc,
      price,
      stock,
      color,
      size,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Product.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update product!");
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }

  revalidatePath("/dashboard/products");
};

export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Product.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete product!");
  }

  revalidatePath("/dashboard/products");
};
export const deleteLink = async (formData) => {
  const { id } = Object.fromEntries(formData);

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
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    if (err.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";
    }
    throw err;
  }
};
