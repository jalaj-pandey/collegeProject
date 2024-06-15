import mongoose from "mongoose";


const branchList = ['CSE', 'EE', 'ME', 'CE', 'EL','IT','MCA'];


const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter Company Name"],
    },
    photo: {
      type: String,
      required: [true, "Please upload Photo"],
    },
    title: {
        type: String,
        required: [true, "Please enter Job Title"],
      },
    description: {
        type: String,
        required: [true, "Please enter Job description"],
      },
    requirements: {
        type: String,
        required: [true, "Please enter Job Requirements"],
      },
      branches: {
        type: String,
        required: [true, "Please enter branch"],
        enum : branchList,
      },
    salary: {
      type: Number,
      required: [true, "Please enter salary"],
    },
    location: {
        type: String,
        required: [true, "Please enter location"],
      },
  },
  {
    timestamps: true,
  }
);

// instead of Product I used Jobs
export const Jobs = mongoose.model("Jobs", schema);