import { useContext } from "react";
import { UserContext } from "../../App";

const Profile = () => {
  const { user } = useContext(UserContext);
  const date = new Date(user.app_metadata.created_at);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const extractedDate = `${year}-${month}-${day}`;
  const dateTrial = new Date(extractedDate);
  dateTrial.setDate(dateTrial.getDate() + 7); // Adding 7 days to the date

  const yearTrial = dateTrial.getFullYear();
  const monthTrial = String(dateTrial.getMonth() + 1).padStart(2, "0");
  const dayTrial = String(dateTrial.getDate()).padStart(2, "0");

  const expireTrial = `${yearTrial}-${monthTrial}-${dayTrial}`;

  const currentDate = new Date(); // Get the current date

  // Convert the expiration date to a Date object
  const trialExpirationDate = new Date(expireTrial);

  // Check if the trial has expired or not
  const trialExpired = currentDate.getTime() > trialExpirationDate.getTime();
  return (
    <div className="min-h-screen">
      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
          <div className="w-full md:w-3/12 md:mx-2">
            <div className="bg-white p-3 border-t-4 border-green-400">
              <div className="flex items-start">
                <img
                  className="h-auto w-50% rounded-full"
                  src={user.picture}
                  alt="user image"
                  loading="lazy"
                />
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1 ml-2">
                {user.name}
              </h1>
              <h3 className="text-gray-600 font-lg text-semibold leading-6">
                Some generic title 
              </h3>
              <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur
                non deserunt
              </p>
              <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>Email</span>
                  <span className="ml-auto">
                    {user.email_verified ? (
                      <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                        Verified
                      </span>
                    ) : (
                      <span className="bg-red-500 py-1 px-2 rounded text-white text-sm">
                        Not Verified
                      </span>
                    )}
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span>Member since</span>
                  <span className="ml-auto p-2">{extractedDate}</span>
                </li>
                <li className="flex items-center py-3 ">
                  <span>{trialExpired ? 'Trial Expired on ' : 'Trial will expire on '}</span>
                  <span className={`ml-auto p-2 ${trialExpired ? 'bg-red-400' : 'bg-green-400'} rounded-full p-2 text-white`}>
                    {expireTrial}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full md:w-9/12 mx-2 h-64">
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span className="text-green-500">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">About</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Full Name</div>
                    <div className="px-4 py-2">{user.name}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Gender</div>
                    <div className="px-4 py-2">N/A</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Contact No.</div>
                    <div className="px-4 py-2">N/A</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Email.</div>
                    <div className="px-4 py-2 text-blue-800">{user.email}</div>
                  </div>
                </div>
              </div>
              <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                Edit profile comming soon...
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;