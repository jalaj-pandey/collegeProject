import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    
    user:{
      type: String,
      ref: "User",
      required: true, 
    },
    status: {
      type: String,
      enum: ["Applied", "Shortlisted", "Interview Call", "Placed"],
      default: "Applied",
    },
    userEmail:{
      type: String,
    },
    

    jobInfo: [{
      name: String,
      title: String,
      salary: Number,
      location: String,
      jobId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Jobs",
      }
    }],
    userInfo: [
      {
        name: String,
        email: String,
        branch: String,
        photo: String,
        gender: String,
        dob: Date,
       
      }
    ],
    appliedDate: Date,
    shortlistedDate: Date,
    interviewDate: Date
  },
  {
    timestamps: true,
  }
);
// instead of Product I used Jobs
export const Apply = mongoose.model("Apply", schema);
