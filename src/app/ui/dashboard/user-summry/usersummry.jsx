import Image from "next/image";
import styles from "./usersummry.module.css";
const Usersummry = ({users}) => {
  const filteredUsers= users?.filter((it)=> !it.isAdmin)

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Users</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Status</td>
            <td>Role</td>
            {/*<td>Amount</td>*/}
          </tr>
        </thead>
        <tbody>
        {filteredUsers?.map((user) => <tr key={user.id}>
          <td>
            <div className={styles.user}>
              <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
              />
              {user?.email}
            </div>
          </td>
          <td>
              <span className={`${styles.status} ${styles.pending}`}>
                {user.isActive ? "active" : "inactive"}
              </span>
          </td>

          <td>{user.isAdmin ? "Admin" : "User"}</td>
          {/*<td>$3.200</td>*/}
        </tr>)}

        </tbody>
      </table>
    </div>
  );
};

export default Usersummry;
