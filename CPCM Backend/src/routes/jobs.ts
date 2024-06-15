import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { deleteJob, getAdminJobs, getAllJobs, getLatestJobs, getSingleJob, newJob, updateJob } from "../controllers/jobs.js";
import { singleImageUpload } from "../middlewares/multer.js";

const app = express.Router();

//Create new job - /api/v1/job/new
app.post('/new', adminOnly, singleImageUpload, newJob);

// To get 10 latest jobs - /api/v1//job/latest
app.get('/latest', getLatestJobs);

// Search jobs with filters - /api/v1/job/all
app.get('/all', getAllJobs );

// To get all jobs - /api/v1/job/admin-jobs
app.get('/admin-jobs', adminOnly, getAdminJobs);

// To get, update and delete jobs
app.route('/:id')
    .get(getSingleJob)
    .put(adminOnly, singleImageUpload, updateJob)
    .delete(adminOnly, deleteJob);


export default app;