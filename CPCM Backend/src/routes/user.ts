import express from "express";
import { deleteUser, getAllUsers, getUser, newUser } from "../controllers/user.js";
import { adminOnly } from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
const app = express.Router();


// Routes.... /api/v1/user/new
// app.post('/new', singleImageUpload, newUser);
app.post('/new', upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
  ]), newUser);

// Route.... /api/v1/user/all
app.get('/all',adminOnly, getAllUsers);

// Route.... /api/v1/user/dynamicID
app.route("/:id")
    .get( getUser)
    .delete(adminOnly,deleteUser);


export default app;