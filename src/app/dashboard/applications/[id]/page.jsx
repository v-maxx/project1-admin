import {fetchApplication, fetchRequest} from "@/app/lib/data";
import WithdrawRequestResponder from "@/components/WithdrawRequestResponder";
import UserApplication from "@/app/ui/dashboard/user-application/userApplication";

const SingleRequestPage = async ({ params }) => {
  const {id} = params;

   const request = await fetchApplication(id);
     console.log('at client request',request)


  return (
      <div className="w-full border rounded-lg shadow-lg p-12">
         <UserApplication data={request}/>
      </div>
  );
};

export default SingleRequestPage;
