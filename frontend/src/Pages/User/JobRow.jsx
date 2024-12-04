import React from "react";

const JobRow = ({ job, onApply }) => {
  return (
    <tr className="even:bg-blue-100 odd:bg-white hover:bg-blue-200 transition">
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
              <p>{app.status}</p>
            </div>
          ))
        ) : (
          <span>Not Applied</span>
        )}
      </td>
      <td className="px-6 py-4 border border-blue-300 text-center space-x-4">
        {job.applications &&
        job.applications.some(
          (app) =>
            app.status === "Applied" ||
            app.status === "Rejected" ||
            app.status === "Accepted"
        ) ? (
          <button disabled className="px-4 py-2 bg-gray-600 text-white rounded">
            Already Applied
          </button>
        ) : (
          <button
            onClick={() => onApply(job._id)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-400 transition"
          >
            Apply
          </button>
        )}
      </td>
    </tr>
  );
};

export default JobRow;
