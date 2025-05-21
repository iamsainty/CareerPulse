import JobListing from "./JobListing";
import UserProfile from "./UserProfile";
export default function Jobs() {
  return (
    <div className="flex flex-col md:flex-row justify-center w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-center">
        <div className="w-full md:w-1/3">
          <UserProfile />
        </div>
        <div className="w-full md:w-2/3">
          <JobListing />
        </div>
      </div>
    </div>
  );
}
