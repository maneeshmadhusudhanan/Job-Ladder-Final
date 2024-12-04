import React, { useEffect, useState } from "react";
import JobRow from "./JobRow"; // Import the new component

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("/api/job/jobs-with-employers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await response.json();
        setJobs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    const token = localStorage.getItem("token");
    const confirmApply = window.confirm("Do you want to apply for this job?");
    if (!confirmApply) return;

    try {
      const response = await fetch(`/api/job/apply/${jobId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message === "You have already applied for this job") {
          alert("You have already applied for this job.");
          return;
        } else {
          throw new Error("Failed to apply for the job");
        }
      }

      alert("Your application has been submitted!");

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId
            ? {
                ...job,
                applicationStatus: "Applied",
                applications: [
                  ...(job.applications || []),
                  { userId: "currentUserId", status: "Applied" },
                ],
              }
            : job
        )
      );
    } catch (error) {
      console.error("Error applying for job:", error);
      setError(error.message);
      alert("An error occurred while applying. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-8">
      <div className="bg-gradient-to-r from-blue-400 to-blue-600 shadow-xl rounded-xl p-8 w-full animate-fadeIn">
        <h2 className="text-center text-3xl font-bold text-white mb-8">
          Job List
        </h2>
        {loading ? (
          <div className="text-center text-white">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <table className="table-fixed min-w-full border-collapse border border-blue-300 rounded-lg">
            <thead>
              <tr className="bg-blue-500 sticky top-0 z-10">
                <th className="px-6 py-3 border border-blue-300 text-left font-semibold text-white">
                  Job Title
                </th>
                <th className="px-6 py-3 border border-blue-300 text-left font-semibold text-white">
                  Description
                </th>
                <th className="px-6 py-3 border border-blue-300 text-left font-semibold text-white">
                  Job Type
                </th>
                <th className="px-6 py-3 border border-blue-300 text-left font-semibold text-white">
                  Salary
                </th>
                <th className="px-6 py-3 border border-blue-300 text-left font-semibold text-white">
                  Vacancy
                </th>
                <th className="px-6 py-3 border border-blue-300 text-left font-semibold text-white">
                  Job Status
                </th>
                <th className="px-6 py-3 border border-blue-300 text-left font-semibold text-white">
                  Application Status
                </th>
                <th className="px-6 py-3 border border-blue-300 text-center font-semibold text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <JobRow key={job._id} job={job} onApply={handleApply} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default JobList;
