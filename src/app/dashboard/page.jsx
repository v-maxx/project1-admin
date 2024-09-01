import { cards } from "../lib/data";
import Card from "../ui/dashboard/card/card";
import Chart from "../ui/dashboard/chart/chart";
import styles from "../ui/dashboard/dashboard.module.css";
import Rightbar from "../ui/dashboard/rightbar/rightbar";
import Transactions from "../ui/dashboard/transactions/transactions";
import { fetchUsers } from "@/app/lib/data";
import {fetchLinks} from "@/app/lib/data";
import Usersummry from "@/app/ui/dashboard/user-summry/usersummry";
const Dashboard = async () => {
    // const q = searchParams?.q || "";
    // const page = searchParams?.page || 1;
    // const { count:linkCount, links } = await fetchLinks('', 1);
    const { count:userCount, users } = await fetchUsers('', 1);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>

            <Card count={userCount} type={'Volunteer'} />
            {/*<Card count={linkCount} type={'Link'} />*/}

        </div>
        {/*<Transactions />*/}
        <Usersummry users={users} />
        {/*<Chart />*/}
      </div>
      {/*<div className={styles.side}>*/}
      {/*  <Rightbar />*/}
      {/*</div>*/}
    </div>
  );
};

export default Dashboard;
