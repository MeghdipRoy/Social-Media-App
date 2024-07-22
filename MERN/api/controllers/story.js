// // Import necessary modules and setup db connection
// import { db } from "../connect.js";
// import jwt from "jsonwebtoken";

// // Controller to fetch stories
// export const getStories = (req, res) => {
//   const userId = req.query.userId;
//   const token = req.cookies.accessToken;

//   if (!token) return res.status(401).json("Not logged in");

//   // Verify token and fetch stories based on userId
//   jwt.verify(token, "secretkey", (err, userInfo) => {
//     if (err) return res.status(403).json("Token is not valid!");

//     // Construct SQL query based on userId
//     const q = userId !== "undefined"
//       ? `SELECT id, img, userId FROM stories WHERE userId = ? ORDER BY createdAt DESC`
//       : `SELECT id, img, userId FROM stories ORDER BY createdAt DESC`;

//     // Execute the query with userId as parameter if available, else fetch all stories
//     const values = userId !== "undefined" ? [userId] : [];

//     db.query(q, values, (err, data) => {
//       if (err) return res.status(500).json(err);
//       return res.status(200).json(data);
//     });
//   });
// };

// // Import necessary modules and setup db connection


// // Controller to add a new story
// export const addStory = (req, res) => {
//   const token = req.cookies.accessToken;

//   if (!token) return res.status(401).json("Not logged in");

//   // Verify token to get user information
//   jwt.verify(token, "secretkey", (err, userInfo) => {
//     if (err) return res.status(403).json("Token is not valid!");

//     // SQL query to insert a new story into the database
//     const q = "INSERT INTO stories (img, userId, createdAt) VALUES (?, ?, ?)";
    
//     // Values to be inserted into the stories table
//     const values = [
//       req.body.img,
//       userInfo.id, // Assumes userInfo contains the authenticated user's id
//       moment().format("YYYY-MM-DD HH:mm:ss") // Current timestamp
//     ];

//     // Execute the query with values array
//     db.query(q, values, (err, data) => {
//       if (err) return res.status(500).json(err);
//       return res.status(200).json("Story has been created");
//     });
//   });
// };
