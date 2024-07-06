'use client'
import { addUser } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import {useRouter} from "next/navigation";

const AddUserPage = () => {
  const  router =useRouter()
  const [loading, setLoading] = useState(false);

  const handleAddUser = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);

    try {
      await addUser(formData);
      toast.success("User added successfully!");
      router.replace("/dashboard/users");
    } catch (err) {
      toast.error(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className={styles.container}>
        <ToastContainer />
        <form onSubmit={handleAddUser} className={`${styles.form} grid grid-cols-2 gap-6`}>
          <div className={'flex justify-start items-center gap-2 py-2'}>
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="username" name="username" id="username" required />
          </div>

          <div className={'flex justify-start items-center gap-2 py-2'}>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="email" name="email" id="email" required />
          </div>

          <div className={'flex justify-start items-center gap-2 py-2'}>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="password" name="password" id="password" required />
          </div>

          <div className={'flex justify-start items-center gap-2 py-2'}>
            <label htmlFor="phone">Phone</label>
            <input type="phone" placeholder="phone" name="phone" id="phone" />
          </div>

          <div className={'flex justify-start items-center gap-2 py-2'}>
            <label htmlFor="isAdmin">Is Admin?</label>
            <select defaultValue="false" name="isAdmin" id="isAdmin">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className={'flex justify-start items-center gap-2 py-2'}>
            <label htmlFor="isActive">Is Active?</label>
            <select defaultValue="true" name="isActive" id="isActive">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>


  );
};

export default AddUserPage;
