
import { updateUser} from "@/app/lib/actions";
import { fetchUser } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";

const SingleUserPage = async ({ params }) => {
  const {id} = params;
    const user = await fetchUser(id);



  // const handleUpdateUser = async (event) => {
  //   event.preventDefault();
  //   setLoading(true);
  //   const formData = new FormData(event.target);
  //
  //   try {
  //     await updateUser(formData);
  //     toast.success("User updated successfully!");
  //     router.replace("/dashboard/users");
  //   } catch (err) {
  //     toast.error(err.message ?? "Something went wrong");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  //

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={user.img || "/noavatar.png"} alt="" fill />
        </div>
        {user.username}
      </div>
      <div className={styles.formContainer}>
        <form action={updateUser} className={styles.form}>
          <input type="hidden" name="id" value={user.id}/>
          <label>Username</label>
          <input type="text" name="username" disabled placeholder={user.username} />
          <label>Email</label>
          <input type="email" name="email" disabled placeholder={user.email} />
          <label>Password</label>
          <input type="password" name="password" placeholder={user.password} />
          <label>Phone</label>
          <input type="text" name="phone" placeholder={user.phone} />
          <label>Address</label>
          <textarea type="text" name="address" placeholder={user.address} />
          <label>Role</label>
          <select name="role" id="role" defaultValue={user.role}>
            <option value={'Volunteer'}>Volunteer</option>
            <option value={'Admin'}>Admin</option>
          </select>
          <label>Is Active?</label>
          <select name="isActive" id="isActive" defaultValue={user.isActive}>
            <option value={true} >Yes</option>
            <option value={false} >No</option>
          </select>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
