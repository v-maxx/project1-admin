import { deleteUser } from "@/app/lib/actions";
import {fetchApplications, fetchUsers, fetchWithdrawRequests} from "@/app/lib/data";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Image from "next/image";
import Link from "next/link";
import {MdSearch} from "react-icons/md";
import DateSelector from "@/app/ui/dashboard/date-selector/dateSelector";


const ApplicationsPage = async ({ searchParams }) => {
  // const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const specificDate = searchParams?.date || new Date().toISOString().split('T')[0];
  // const { count, pendingRequests } = await fetchWithdrawRequests( page);
  // or any date you want to search for

    const { count, pendingRequests } = await fetchApplications(page, specificDate);
    console.log('requests---', count, pendingRequests)
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleString()
    }
  return (
    <div className={'overflow-scroll'}>
        <div className={'py-8'}>
            <DateSelector/>
        </div>

        <table className={styles.table}>
            <thead className={'text-yellow-200'}>
            <tr>
                <td className={'whitespace-nowrap'}>SN.</td>
                <td className={'whitespace-nowrap'}>ID</td>
                <td className={'whitespace-nowrap'}>Name</td>
                <td className={'whitespace-nowrap'}>Father's Name</td>
                {/*<td className={'whitespace-nowrap'}>Document Type</td>*/}
                {/*<td className={'whitespace-nowrap'}>Document Number</td>*/}
                <td className={'whitespace-nowrap'}>Mobile</td>
                <td className={'whitespace-nowrap'}>Verification</td>
                {/*<td className={'whitespace-nowrap'}>Address</td>*/}
                {/*<td className={'whitespace-nowrap'}>Address1</td>*/}
                {/*<td className={'whitespace-nowrap'}>Residence Type</td>*/}
                {/*<td className={'whitespace-nowrap'}>Occupation</td>*/}
                {/*<td className={'whitespace-nowrap'}>Category</td>*/}
                {/*<td className={'whitespace-nowrap'}>Email</td>*/}
                {/*<td className={'whitespace-nowrap'}>Front Photo</td>*/}
                {/*<td className={'whitespace-nowrap'}>Back Photo</td>*/}
                {/*<td className={'whitespace-nowrap'}>Photo</td>*/}
                <td className={'whitespace-nowrap'}>Status</td>
                <td className={'whitespace-nowrap'}>Initiated By</td>
                <td className={'whitespace-nowrap'}>Created At</td>
                <td className={'whitespace-nowrap'}>Updated At</td>
            </tr>
            </thead>
            <tbody>
            {pendingRequests.map((request, index) => (
                <tr key={request._id}>
                    <td className={'whitespace-nowrap'}>{index + 1}</td>
                    <td className={'whitespace-nowrap'}>{request._id}</td>
                    <td className={'whitespace-nowrap'}>{request.name}</td>
                    <td className={'whitespace-nowrap'}>{request.fatherName}</td>
                    {/*<td className={'whitespace-nowrap'}>{request.documentType}</td>*/}
                    {/*<td className={'whitespace-nowrap'}>{request.documentNumber}</td>*/}
                    <td className={'whitespace-nowrap'}>{request.mobile}</td>
                    <td className={'whitespace-nowrap'}>{request.verification ? 'Verified' : 'Not Verified'}</td>
                    {/*<td className={'whitespace-nowrap'}>{request.address}</td>*/}
                    {/*<td className={'whitespace-nowrap'}>{request.address1}</td>*/}
                    {/*<td className={'whitespace-nowrap'}>{request.residenceType}</td>*/}
                    {/*<td className={'whitespace-nowrap'}>{request.occupation}</td>*/}
                    {/*<td className={'whitespace-nowrap'}>{request.category}</td>*/}
                    {/*<td className={'whitespace-nowrap'}>{request.email}</td>*/}
                    {/*<td className={'whitespace-nowrap'}>*/}
                    {/*    <a href={request.frontPhoto} target="_blank" rel="noopener noreferrer">*/}
                    {/*        View Front Photo*/}
                    {/*    </a>*/}
                    {/*</td>*/}
                    {/*<td className={'whitespace-nowrap'}>*/}
                    {/*    {request.backPhoto ? (*/}
                    {/*        <a className={'text-blue-600'} href={request.backPhoto} target="_blank" rel="noopener noreferrer">*/}
                    {/*            View Back Photo*/}
                    {/*        </a>*/}
                    {/*    ) : (*/}
                    {/*        'N/A'*/}
                    {/*    )}*/}
                    {/*</td>*/}
                    {/*<td className={'whitespace-nowrap'}>*/}
                    {/*    <a className={'text-blue-600'} href={request.photo} target="_blank" rel="noopener noreferrer">*/}
                    {/*        View Photo*/}
                    {/*    </a>*/}
                    {/*</td>*/}
                    <td className={'whitespace-nowrap'}>{request.status}</td>
                    <td className={'whitespace-nowrap'}>{request.initiatedBy.email}</td>
                    <td className={'whitespace-nowrap'}>{formatDate(request.createdAt)}</td>
                    <td className={'whitespace-nowrap'}>{formatDate(request.updatedAt)}</td>
                    <td>
                        <div className={styles.buttons}>
                            <Link href={`/dashboard/applications/${request._id}`}>
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
        <div className={'py-8'}>

        <Pagination count={count} />
        </div>
    </div>
  );
};

export default ApplicationsPage;
