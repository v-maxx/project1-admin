import { User,Link } from "./models";
import { connectToDB } from "./utils";

export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 10;
  try {
    connectToDB();
    const count = await User.find({ username: { $regex: regex },role:'User' }).count();
    const users = await User.find({ username: { $regex: regex },role:'User' })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, users };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};
export const fetchAdmins = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 10;
  try {
    connectToDB();
    const count = await User.find({ username: { $regex: regex },role:'Admin' }).count();
    const admins = await User.find({ username: { $regex: regex },role:'Admin' })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, admins };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch Admins!");
  }
};

export const fetchUser = async (id) => {

  try {
    connectToDB();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

export const fetchLinks = async (q, page) => {
  console.log(q);
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 10;

  try {
    // Ensure the database connection
    await connectToDB();

    // Count total number of matching documents
    const count = await Link.find({ url: { $regex: regex } }).count();

    // Fetch matching documents with pagination and populate user details
    const links = await Link.find({ url: { $regex: regex } })
        .populate('user', 'name email') // Assuming you want to include 'name' and 'email' fields from the User model
        .limit(ITEM_PER_PAGE)
        .skip(ITEM_PER_PAGE * (page - 1));

    console.log('links found',links)
    return { count, links};
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch links!");
  }
};

export const fetchProduct = async (id) => {
  try {
    connectToDB();
    const product = await Product.findById(id);
    return product;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch product!");
  }
};

// DUMMY DATA

export const cards = [
  {
    id: 1,
    title: "Total Users",
    number: 10.928,
    change: 12,
  },
  {
    id: 2,
    title: "Active Links",
    number: 8.236,
    change: -2,
  },
  {
    id: 3,
    title: "Revenue",
    number: 6.642,
    change: 18,
  },
];
