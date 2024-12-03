import React, { useState } from "react";
import UserPage from "../Pages/User/UserPage";
import NotificationPage from "../Pages/User/Notification";
import Footer2 from "../Components/Footer2";
import Sidebar from "../Components/User/Sidebar";
import Navbar from "../Components/User/Navbar";
import JobList from "../Pages/User/JobList";
import AppliedJobs from "../Pages/User/AppliedJobs";
import SavedJobs from "../Pages/User/SavedJobs";
import UserEditProfile from "../Pages/User/UserEditProfile";

const UserLayout = () => {
  // State to track the current page
  const [currentPage, setCurrentPage] = useState("user");

  // Function to fetch user details (placeholder implementation)
  const fetchUserDetails = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`/api/auth/getUserDetails`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details.");
      }

      const data = await response.json();
      console.log("User details:", data);
      return data;
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Function to render the selected page
  const renderPage = () => {
    switch (currentPage) {
      case "user":
        return <UserPage />;
      case "notifications":
        return <NotificationPage />;
      case "joblist":
        return <JobList />;
      case "applied":
        return <AppliedJobs />;
      case "saved":
        return <SavedJobs />;
      case "profile":
        return <JobList />;
      case "editprofile":
        return <UserEditProfile fetchUserDetails={fetchUserDetails} />;
      default:
        return <UserPage />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white fixed h-full">
        <Sidebar setCurrentPage={setCurrentPage} />
      </aside>

      {/* Main Layout */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Navbar */}
        <header className="fixed top-0 left-64 right-0 bg-blue-600 text-white z-10">
          <Navbar setCurrentPage={setCurrentPage} />
        </header>

        {/* Main Content */}
        <main className="mt-16 p-4 flex-1 overflow-y-auto bg-gray-100">
          {renderPage()}
        </main>

        {/* Footer */}
        <footer className="bg-blue-600 text-white">
          <Footer2 />
        </footer>
      </div>
    </div>
  );
};

export default UserLayout;
