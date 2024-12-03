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

  const handleApply = async (jobId) => {
    const token = localStorage.getItem("token");

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
        } else {
          throw new Error("Failed to apply for the job");
        }
      } else {
        // Update job status in the local state
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job._id === jobId ? {
              ...job,
              applicationStatus: "Applied", // Change status to "Applied"
              applications: job.applications.map((app) =>
                app.userId === jobId ? { ...app, status: "Applied" } : app // Update the application status
              ),
            } : job
          )
        );
      }
    } catch (error) {
      console.error("Error applying for job:", error);
      setError(error.message);
    }
  };

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
                <th className="w-1/6 px-6 py-3 border border-blue-300 text-center font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id} className="even:bg-blue-100 odd:bg-white hover:bg-blue-200 transition">
                  <td className="px-6 py-4 border border-blue-300">{job.title}</td>
                  <td className="px-6 py-4 border border-blue-300">{job.description}</td>
                  <td className="px-6 py-4 border border-blue-300">{job.jobtype}</td>
                  <td className="px-6 py-4 border border-blue-300">{job.salary} INR</td>
                  <td className="px-6 py-4 border border-blue-300">{job.vacancy}</td>
                  <td className="px-6 py-4 border border-blue-300">{job.jobstatus}</td>
                  <td className="px-6 py-4 border border-blue-300">
                  {job.applications && job.applications.length > 0 ? (
                    job.applications.map((app, index) => (
                      <div key={index} className="mb-2">
                        <p>
                          {app.status}
                        </p>
                      </div>
                    ))
                  ) : (
                    <span>Not Applied</span>
                  )}
                  </td>
                  <td className="px-6 py-4 border border-blue-300 text-center space-x-4">
                    {job.applications && job.applications.some((app) => app.status === "Applied" || app.status === "Rejected") ? (
                      <button disabled className="px-4 py-2 bg-gray-600 text-white rounded">
                        Already Applied
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApply(job._id)}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-400 transition"
                      >
                        Apply
                      </button>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default JobList;
