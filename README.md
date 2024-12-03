# JobLadder

JobLadder is a job management platform that facilitates seamless interactions between Users, Employers, and Admins. Users can search for jobs, apply, and track their application statuses, while Employers can manage job postings and applications.

---

## Features

### Core Functionalities:
1. **CRUD Operations:**
   - Add, update, view, and delete jobs.
   - Add and manage users, employers, and admins.

2. **Job Management:**
   - Employers can add job postings with details like title, description, and salary.
   - Users can search for jobs by title, category, or location.
   - Users can apply for jobs.

3. **Application Workflow:**
   - Users submit job applications, which are sent to Employers.
   - Employers can view, approve, or reject applications.
   - Users can track the status of their applications (Applied, Not-Applied,Approved, or Rejected,).

4. **Role-Specific Dashboards:**
   - **Admin:** Admin profile update,Add and manage Employers,Manage Employers.
   - **Employer:** Employer profile update,Manage users, anage job listings and view/approve/reject job applications, oversee job postings. 
   - **User:** User profile update, Search and apply for jobs, track application statuses, oversee job postings. 
5. **Authentication:**
   - Secure JWT-based authentication for Admins, Employers, and Users.
   - Role-based access control.

---

## Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **File Uploads:** Multer for image uploads

---
