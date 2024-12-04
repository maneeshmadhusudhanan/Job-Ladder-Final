import React, { useState, useEffect } from "react";

const EmployerJobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleStatusChange = async (jobId, applicationId, status) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/job/application/${jobId}/${applicationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update application status");
      }

      const data = await response.json();
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId
            ? {
                ...job,
                applications: job.applications.map((application) =>
                  application._id === applicationId
                    ? { ...application, status }
                    : application
                ),
              }
            : job
        )
      );

      alert(`Application status updated to ${status}`);
    } catch (error) {
      alert("An error occurred while updating the application status.");
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/job/employer/jobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await response.json();
        setJobs(data);
        setLoading(false);
        console.log(data);
        
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-xl font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 font-semibold">{error}</div>;
  }

  return (
    <div className="flex justify-center items-center w-[1460px] bg-gradient-to-r from-blue-100 to-blue-300 mt-[15%] ml-[-4%]">
    <div className="bg-gradient-to-r from-blue-400 to-blue-600 shadow-xl rounded-xl p-8 w-full h-[670px] animate-fadeIn">
    <h2 className="text-center text-3xl font-bold text-white mb-8">Job Applications</h2>
    {jobs.length === 0 ? (
      <div className="text-center text-white">No jobs found.</div>
    ) : (
      <div className="overflow-y-auto max-h-[560px]"> {/* Add overflow and max-height */}
        <table className="table-fixed min-w-full border-collapse border border-blue-300 rounded-lg">
          <thead>
            <tr className="bg-blue-500 sticky top-0 z-10">
              <th className="px-6 py-3 border border-blue-300 text-left font-semibold text-white">Job Title</th>
              <th className="px-6 py-3 border border-blue-300 text-left font-semibold text-white">Description</th>
              <th className="px-6 py-3 border border-blue-300 text-left font-semibold text-white">Vacancy</th>
              <th className="px-6 py-3 border border-blue-300 text-left font-semibold text-white">Status</th>
              <th className="px-6 py-3 border border-blue-300 text-left font-semibold text-white">Applications</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id} className="even:bg-blue-100 odd:bg-white hover:bg-blue-200 transition">
                <td className="px-6 py-4 border border-blue-300">{job.title}</td>
                <td className="px-6 py-4 border border-blue-300">{job.description}</td>
                <td className="px-6 py-4 border border-blue-300">{job.vacancy}</td>
                <td className="px-6 py-4 border border-blue-300">
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      job.jobstatus === "Active"
                        ? "bg-green-100 text-green-600"
                        : job.jobstatus === "Closed"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {job.jobstatus}
                  </span>
                </td>
                <td className="px-6 py-4 border border-blue-300">
                  {job.applications.map((application) => (
                    <div
                      key={application._id}
                      className="bg-gray-50 p-4 rounded shadow mb-4 border border-gray-200"
                    >
                      {/* Username */}
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          Username: {application.userId.username}
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                          Email:{application.userId.email}
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                          Applied At: {new Date(application.appliedAt).toLocaleDateString()}
                        </p>
                        <div className="mt-3">
                          <a
                            href={`/api/uploads/${application.resume}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className=" px-3 py-1 text-sm font-semibold rounded-full bg-green-400"
                          >
                            View Resume
                          </a>
                        </div>
                      </div>

                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Status:{" "}
                          <span
                            className={`font-semibold ${
                              application.status === "Accepted"
                                ? "text-green-600"
                                : application.status === "Rejected"
                                ? "text-red-600"
                                : "text-blue-600"
                            }`}
                          >
                            {application.status}
                          </span>
                        </p>
                      </div>

                      <div className="flex justify-start space-x-2 mt-4">
                        <button
                          onClick={() =>
                            handleStatusChange(job._id, application._id, "Accepted")
                          }
                          className={`px-3 py-1 rounded shadow text-sm ${
                            application.status === "Accepted" || application.status === "Rejected"
                              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                              : "bg-green-500 text-white hover:bg-green-600"
                          }`}
                          disabled={application.status === "Accepted" || application.status === "Rejected"}
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(job._id, application._id, "Rejected")
                          }
                          className={`px-3 py-1 rounded shadow text-sm ${
                            application.status === "Accepted" || application.status === "Rejected"
                              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                              : "bg-red-500 text-white hover:bg-red-600"
                          }`}
                          disabled={application.status === "Accepted" || application.status === "Rejected"}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
</div>

  );
};

export default EmployerJobList;
