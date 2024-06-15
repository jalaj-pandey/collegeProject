import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import {
  allApplications,
  getSingleJob,
  myApplications,
  newApplication,
  processApplication,
} from "../controllers/applications.js";
const app = express.Router();

// new Application route /api/v1/apply/new

app.post("/new", newApplication);

// my applications route /api/v1/apply/applies

app.get("/applies", myApplications);

// all applications route /api/v1/all

app.get("/all", adminOnly, allApplications);

app.route("/:id").get(getSingleJob).put(adminOnly, processApplication);

export default app;
