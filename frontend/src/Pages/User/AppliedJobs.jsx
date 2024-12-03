import React, { useEffect, useState } from "react";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      try {
        const response = await fetch("/api/job/jobs-with-employers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the token in the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await response.json();
        setJobs(data);
        console.log("data",data)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []); // Empty dependency array to run the effect only once


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-8 mt-[-5%]">
      <div className="bg-gradient-to-r from-blue-400 to-blue-600 shadow-xl rounded-xl p-8 w-full animate-fadeIn">
        <h2 className="text-center text-3xl font-bold text-white mb-8">Job List</h2>
        {loading ? (
          <div className="text-center text-white">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <table className="table-fixed min-w-full border-collapse border border-blue-300 rounded-lg">
            <thead>
              <tr className="bg-blue-500 sticky top-0 z-10">
                <th className="w-1/4 px-6 py-3 border border-blue-300 text-left font-semibold text-white">Job Title</th>
                <th className="w-1/4 px-6 py-3 border border-blue-300 text-left font-semibold text-white">Description</th>
                <th className="w-1/6 px-6 py-3 border border-blue-300 text-left font-semibold text-white">Job Type</th>
                <th className="w-1/6 px-6 py-3 border border-blue-300 text-left font-semibold text-white">Salary</th>
                <th className="w-1/6 px-6 py-3 border border-blue-300 text-left font-semibold text-white">Vacancy</th>
                <th className="w-1/6 px-6 py-3 border border-blue-300 text-left font-semibold text-white">Job Status</th>
                <th className="w-1/6 px-6 py-3 border border-blue-300 text-left font-semibold text-white">Application Status</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => {
                // Filter applications that have the status "Applied"
                const appliedApps = job.applications.filter((app) => app.status === "Applied");
  
                return (
                  <tr key={job._id} className="even:bg-blue-100 odd:bg-white hover:bg-blue-200 transition">
                    <td className="px-6 py-4 border border-blue-300">{job.title}</td>
                    <td className="px-6 py-4 border border-blue-300">{job.description}</td>
                    <td className="px-6 py-4 border border-blue-300">{job.jobtype}</td>
                    <td className="px-6 py-4 border border-blue-300">{job.salary} INR</td>
                    <td className="px-6 py-4 border border-blue-300">9</td>
                    <td className="px-6 py-4 border border-blue-300">{job.jobstatus}</td>
                    <td className="px-6 py-4 border border-blue-300">
                      {appliedApps.length > 0 ? (
                        appliedApps.map((app, index) => (
                          <div key={index} className="mb-2">
                            <p>{app.applicationStatus}</p>
                          </div>
                        ))
                      ) : (
                        <p>Accepted</p>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
  
  
  
};

export default JobList;
