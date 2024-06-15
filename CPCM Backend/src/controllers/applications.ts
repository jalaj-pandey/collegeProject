import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { newApplicationRequestBody } from "../types/types.js";
import { Apply } from "../models/application.js";
import ErrorHandler from "../types/utility-class.js";
import { myCache } from "../app.js";
import { invalidateCache } from "../utils/features.js";
import { sendEmail } from "../utils/emailService.js";



export const newApplication = TryCatch(
  async (req: Request<{}, {}, newApplicationRequestBody>, res, next) => {
    const { user, jobInfo, userInfo } = req.body;

    if (!user || !jobInfo || !userInfo) {
      return next(new ErrorHandler("Please enter required fields", 400));
    }

    await Apply.create({
      user,
      jobInfo,
      userInfo,
      
    });
    invalidateCache({
      jobs: true,
      apply: true,
      admin: true,
      userId: user,
    });
    return res.status(201).json({
      success: true,
      message: "Applied successfully",
    });
  }
);

export const myApplications = TryCatch(async (req, res, next) => {
  const { id: user } = req.query;
  const key = `applies-${user}`;
  let applies = [];
  if (myCache.has(key)) applies = JSON.parse(myCache.get(key) as string);
  else {
    applies = await Apply.find({ user });
    myCache.set(key, JSON.stringify(applies));
  }

  return res.status(200).json({
    success: true,
    applies,
  });
});

export const allApplications = TryCatch(async (req, res, next) => {
  const key = `all`;
  let applies = [];
  if (myCache.has(key)) applies = JSON.parse(myCache.get(key) as string);
  else {
    applies = await Apply.find().sort({ createdAt: -1 });
    myCache.set(key, JSON.stringify(applies));
  }

  return res.status(200).json({
    success: true,
    applies,
  });
});

export const getSingleJob = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const key = `apply-${id}`;

  let apply;

  if (myCache.has(key)) apply = JSON.parse(myCache.get(key) as string);
  else {
    apply = await Apply.findById(id);
    if (!apply) return next(new ErrorHandler("Application Not Found", 404));
    myCache.set(key, JSON.stringify(apply));
  }

  return res.status(200).json({
    success: true,
    apply,
  });
});

//org start
// export const processApplication = TryCatch(async (req, res, next) => {
//   const { id } = req.params;

//   const application = await Apply.findById(id);

//   if (!application) return next(new ErrorHandler("Application Not Found", 404));

//   switch (application.status) {
//     case "Applied":
//       application.status = "Shortlisted";
//       break;
//     case "Shortlisted":
//       application.status = "Interview Call";
//       break;
//     default:
//       application.status = "Interview Call";
//       break;
//   }

//   await application.save();

//   invalidateCache({
//     jobs: false,
//     apply: true,
//     admin: true,
//     userId: application.user,
//     applyId: String(application._id),
//   });

//   return res.status(200).json({
//     success: true,
//     message: "Application Processed successfully",
//   });
// });

//org end



//Process wala

export const processApplication = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const application = await Apply.findById(id);

  if (!application) return next(new ErrorHandler("Application Not Found", 404));

  const previousStatus = application.status; // Store the previous status

  switch (application.status) {
    case "Applied":
      application.status = "Shortlisted";
      break;
    case "Shortlisted":
      application.status = "Interview Call";
      break;
    case "Interview Call":
      application.status = "Placed";
      break;
    default:
      application.status = "Placed";
      break;
  }

  await application.save();

  // Send email notification only if the status is updated
  if (application.status !== previousStatus) {
    try {
      // Assuming application.user contains the user's email address
      const userEmail = application.userInfo[0].email; // Adjust this based on your schema
      console.log("useremail: "+userEmail);
      if (userEmail) {
        const htmlContent: string = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #333;
              line-height: 1.6;
            }
            h2 {
              color: #2E86C1;
            }
            .status {
              text-align: center;
              font-size: 1.2em;
              color: #27AE60;
            }
            .footer {
              font-size: 0.8em;
              color: #777;
            }
          </style>
        </head>
        <body>
          <h2>Application Status Update</h2>
          <p>Dear ${application.userInfo[0].name},</p>
          <p>We are excited to inform you that the status of your application has been updated 🎉 for ${application.jobInfo[0].name}'s ${application.jobInfo[0].title} position.</p>
          <p class="status">
            <strong>New Status: <span>${application.status}</span></strong>
          </p>
          <p>Thank you for your patience and understanding throughout this process. If you have any questions or need further assistance, please don't hesitate to reach out to our support team. We're here to help! 😊</p>
          <p>Best regards,</p>
          <p><strong>The Recruitedia Team</strong></p>
          
          <hr style="border: 0; border-top: 1px solid #ccc;" />
          <p class="footer">Please do not reply to this email. If you need to contact us, visit our <a href="https://recruitedia.netlify.app/support" style="color: #2E86C1;">support page</a>.</p>
        </body>
        </html>
      `;

        await sendEmail(userEmail, 'Application Status Update - Recruitedia', htmlContent);
        console.log('Email sent successfully');
      } else {
        console.log('No valid email address found for sending notification');
      }
    } catch (error) {
      console.error('Error sending email notification:', error);
      // Handle email sending error if needed
    }
  }

  invalidateCache({
    jobs: false,
    apply: true,
    admin: true,
    userId: application.user,
    applyId: String(application._id),
  });

  return res.status(200).json({
    success: true,
    message: "Application Processed successfully",
  });
});







