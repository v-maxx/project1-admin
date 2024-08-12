import { deleteUser } from "@/app/lib/actions";
import {fetchUsers, fetchWithdrawRequests} from "@/app/lib/data";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Image from "next/image";
import Link from "next/link";

const WithdrawRequestsPage = async ({ searchParams }) => {
  // const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, pendingRequests } = await fetchWithdrawRequests( page);
    console.log('requests---', count, pendingRequests)
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {/*<Search placeholder="Search for a user..." />*/}
        {/*<Link href="/dashboard/users/add">*/}
        {/*  <button className={styles.addButton}>Add New</button>*/}
        {/*</Link>*/}
      </div>
      <table className={styles.table}>
        <thead>
          <tr>

            <td>SN.</td>
            <td>ID</td>
            <td>Amount</td>
            <td>Requested At</td>
            <td>Requested By</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {pendingRequests.map((request,index) => (
            <tr key={request.id}>
              <td>
                  {index+1}
              </td>
                <td>
                  {request.id}
              </td>
              <td>{request.amount}</td>
              <td>{request.createdAt?.toString().slice(4, 16)}</td>
              <td>{request.requestedBy.email}</td>
              <td>{request.requestedBy.role}</td>
              <td>{request.status}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/withdraw-requests/${request.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  {/*<form action={deleteUser}>*/}
                  {/*  <input type="hidden" name="id" value={(request.id)} />*/}
                  {/*  <button className={`${styles.button} ${styles.delete}`}>*/}
                  {/*    Delete*/}
                  {/*  </button>*/}
                  {/*</form>*/}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default WithdrawRequestsPage;
