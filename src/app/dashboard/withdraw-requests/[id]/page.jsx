import {fetchRequest} from "@/app/lib/data";
import WithdrawRequestResponder from "@/components/WithdrawRequestResponder";

const SingleRequestPage = async ({ params }) => {
  const {id} = params;

  const request = await fetchRequest(id);
    console.log('at client request',request)


  return (
      <div className="w-full max-w-4xl border rounded-lg shadow-lg p-6">
          <div className="mb-4">
              <h2 className="text-xl font-semibold">Withdraw Request</h2>
              <p className="text-sm text-gray-500">Review and process the withdrawal request.</p>
          </div>
          <div className="mb-6">
              <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                      <label htmlFor="requestId" className="block text-sm font-medium text-gray-700">Request ID</label>
                      <input
                          id="requestId"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                          placeholder="123456"
                          disabled
                          value={request?.id}
                      />
                  </div>
                  <div className="space-y-2">
                      <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                      <input
                          id="amount"
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                          placeholder="100.00"
                          disabled
                          value={request?.amount}
                      />
                  </div>
                  <div className="space-y-2 col-span-2">
                      <label htmlFor="requestedBy" className="block text-sm font-medium text-gray-700">Requested By</label>
                      <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                              <input
                                  id="email"
                                  type="email"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                                  placeholder="user@example.com"
                                  disabled
                                  value={request?.requestedBy?.email}
                              />
                          </div>
                          <div className="space-y-2">
                              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                              <input
                                  id="phone"
                                  type="tel"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                                  placeholder="+1 (555) 555-5555"
                                  disabled
                                  value={request?.requestedBy?.phone??'---'}
                              />
                          </div>
                          <div className="space-y-2">
                              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                              <input
                                  id="role"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                                  placeholder="Manager"
                                  disabled
                                  value={request?.requestedBy?.role}
                              />
                          </div>
                      </div>
                  </div>
                  <div className="space-y-2 col-span-3 bg-white text-black rounded-2xl">
                      <h3 className="block p-4 text-xl font-bold text-gray-700">Account Attached</h3>

                      <div className={'grid grid-cols-2 gap-4 p-6'}>
                      <div>
                          <label htmlFor="account" className="block text-sm font-medium text-gray-700">Bank Name</label>
                          <input
                              id="account"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                              placeholder="Checking - 1234"
                              disabled
                              value={request?.requestedBy?.accounts[0].bank}
                          />

                      </div>
                      <div>
                          <label htmlFor="account" className="block text-sm font-medium text-gray-700">Account Holder</label>
                          <input
                              id="account"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                              placeholder="Checking - 1234"
                              disabled
                              value={request?.requestedBy?.accounts[0].name}
                          />

                      </div>
                      <div>
                          <label htmlFor="account" className="block text-sm font-medium text-gray-700">Account Number</label>
                          <input
                              id="account"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                              placeholder="Checking - 1234"
                              disabled
                              value={request?.requestedBy?.accounts[0].bankAccount}
                          />

                      </div>
                      <div>
                          <label htmlFor="account" className="block text-sm font-medium text-gray-700">IFSC</label>
                          <input
                              id="account"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                              placeholder="Checking - 1234"
                              disabled
                              value={request?.requestedBy?.accounts[0].ifsc}
                          />

                      </div>
                      </div>
                  </div>
                  <div className="space-y-2">
                      <label htmlFor="requestedAt" className="block text-sm font-medium text-gray-700">Requested At</label>
                      <input
                          id="requestedAt"
                          type="datetime-local"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                          disabled
                          value={new Date(request.createdAt).toISOString().slice(0, 16)}
                      />
                  </div>
                  <div className="space-y-2">
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>

                      <input
                          disabled
                          id="status"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                          value={request?.status}
                      />


                  </div>
              </form>
          </div>
          <div className="flex justify-end gap-2">
              <WithdrawRequestResponder id={id}/>

          </div>
      </div>
  );
};

export default SingleRequestPage;
