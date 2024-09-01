import {User,Application} from "./models";
import { connectToDB } from "./utils";

export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 10;
  try {
    connectToDB();
    const count = await User.find({ username: { $regex: regex },role:'Volunteer' }).count();
    const users = await User.find({ username: { $regex: regex },role:'Volunteer' })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, users };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};
// export const fetchApplications = async (page) => {
//   const ITEM_PER_PAGE = 10;
//   try {
//     await connectToDB(); // Ensure the connection is awaited
//     const count = await Application.find().countDocuments();
//     const pendingRequests = await Application.find()
//         .populate('initiatedBy', 'email password isActive phone role') // Select specific fields
//         .limit(ITEM_PER_PAGE)
//         .skip(ITEM_PER_PAGE * (page - 1));
//
//     // Calculate the total amount
//
//
//     return { count, pendingRequests };
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch Requests!");
//   }
// };
export const fetchApplications = async (page, specificDate) => {
  const ITEM_PER_PAGE = 10;
  try {
    await connectToDB(); // Ensure the connection is awaited

    const countQuery = Application.find();

    // If a specific date is provided, filter by the 'createdAt' field
    if (specificDate) {
      const startOfDay = new Date(specificDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(specificDate);
      endOfDay.setHours(23, 59, 59, 999);

      countQuery.where('createdAt').gte(startOfDay).lte(endOfDay);
    }

    const count = await countQuery.countDocuments();

    const pendingRequestsQuery = Application.find()
        .populate('initiatedBy', 'email password isActive phone role'); // Select specific fields

    // Apply the same date filter to the results query
    if (specificDate) {
      const startOfDay = new Date(specificDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(specificDate);
      endOfDay.setHours(23, 59, 59, 999);

      pendingRequestsQuery.where('createdAt').gte(startOfDay).lte(endOfDay);
    }

    const pendingRequests = await pendingRequestsQuery
        .sort({ date: -1 }) // Sort by date in descending order
        .limit(ITEM_PER_PAGE)
        .skip(ITEM_PER_PAGE * (page - 1));

    return { count, pendingRequests };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch Requests!");
  }
};

export const fetchWithdrawalTotal = async (page) => {
  const ITEM_PER_PAGE = 10;
  try {
    await connectToDB(); // Ensure the connection is awaited
    const count = await Withdrawal.find({ status: 'Pending' }).countDocuments();
    const paidRequests = await Withdrawal.find({ status: 'Completed' })
        .populate('requestedBy', 'email isActive phone role accounts') // Populate the requestedBy field with user details
        .limit(ITEM_PER_PAGE)
        .skip(ITEM_PER_PAGE * (page - 1));

    const totalSettledAmount = paidRequests.reduce((total, request) => {
      return total + parseFloat(request.amount);
    }, 0);
    return { count, paidRequests,totalSettledAmount };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch Requests!");
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
export const fetchApplication = async (id) => {

  try {
    connectToDB();
    const request = await Application.findById(id)
        .populate('initiatedBy', 'email password isActive phone role');
    return request;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch Request!");
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

