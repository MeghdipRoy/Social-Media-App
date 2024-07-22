// import { useContext } from "react";
// import "./stories.scss"
// import { AuthContext } from "../../context/authContext"

// const Stories = () => {

//   const {currentUser} = useContext(AuthContext)

//   //TEMPORARY
//   const stories = [
//     {
//       id: 1,
//       name: "John Doe",
//       img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
//     },
//     {
//       id: 2,
//       name: "John Doe",
//       img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
//     },
//     {
//       id: 3,
//       name: "John Doe",
//       img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
//     },
//     {
//       id: 4,
//       name: "John Doe",
//       img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
//     },
//   ];

//   return (
//     <div className="stories">
//       <div className="story">
//           <img src={currentUser.profilePic} alt="" />
//           <span>{currentUser.name}</span>
//           <button>+</button>
//         </div>
//       {stories.map(story=>(
//         <div className="story" key={story.id}>
//           <img src={story.img} alt="" />
//           <span>{story.name}</span>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default Stories
import { useContext } from "react";
import "./stories.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";


const Stories = () => {
  const { currentUser } = useContext(AuthContext);
  const { isLoading, error, data } = useQuery({
    queryKey: ["stories"],
    queryFn: () => makeRequest.get("/stories").then((res) => res.data),
  });
  const stories = [
        {
          id: 1,
          name: "John Doe",
          img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
          id: 2,
          name: "John Doe",
          img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
          id: 3,
          name: "John Doe",
          img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
          id: 4,
          name: "John Doe",
          img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
      ];
  return (
    <div className="stories">
      <div className="story">
      <img src={"/upload/" + currentUser.profilePic} alt="" />
      <span>{currentUser.name}</span>
          <button>+</button>
        </div>
      {stories.map(story=>(
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  )
};

export default Stories;


// import { useContext, useState } from "react";
// import "./stories.scss";
// import { AuthContext } from "../../context/authContext";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { makeRequest } from "../../axios";

// const Stories = () => {
//   const { currentUser } = useContext(AuthContext);
//   const queryClient = useQueryClient();

//   // Example stories for demo
//   const [stories, setStories] = useState([
//     {
//                 id: 1,
//                 name: "John Doe",
//                 img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
//               },
//               {
//                 id: 2,
//                 name: "John Doe",
//                 img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
//               },
//               {
//                 id: 3,
//                 name: "John Doe",
//                 img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
//               },
//               {
//                 id: 4,
//                 name: "John Doe",
//                 img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
//               },
//     // Add more stories as needed
//   ]);

//   // Upload function
//   // const upload = async () => {
//   //   try {
//   //     const formData = new FormData();
//   //     formData.append("file", file); // Assuming 'file' is defined somewhere
//   //     const res = await makeRequest.post("/upload", formData);
//   //     return res.data;
//   //   } catch (err) {
//   //     console.error("Upload error:", err);
//   //     throw err; // Propagate the error for handling
//   //   }
//   // };

//   // Mutation setup for adding new story
//   // const mutation = useMutation({
//   //   mutationFn: (newStory) => makeRequest.post("/stories", newStory),
//   //   onSuccess: () => {
//   //     queryClient.invalidateQueries(["stories"]);
//   //   },
//   //   onError: (error) => {
//   //     console.error("Mutation error:", error);
//   //     // Handle error states or feedback to the user
//   //   },
//   // });


//   // const handleFileChange = (e) => {
//   //   setFile(e.target.files[0]);
//   // };

//   // // Handle click to add new story
//   // const handleClick = async () => {
//   //   let imgUrl = "";
//   //   try {
//   //     if (file) {
//   //       imgUrl = await upload();
//   //     }
//   //     const newStory = {
//   //       name: currentUser.name,
//   //       img: imgUrl,
//   //     };
//   //     await mutation.mutateAsync(newStory);
//   //     // Optionally, update local state or refetch data
//   //     setStories([...stories, newStory]);
//   //   } catch (error) {
//   //     console.error("Error adding story:", error);
//   //     // Handle error states or feedback to the user
//   //   }
//   };

//   return (
//     <div className="stories">
//       <div className="story">
//         <img src={"/upload/" + currentUser.profilePic} alt="" />
//         <span>{currentUser.name}</span>
//         {/* <input type="file" onChange={handleFileChange} /> */}

//         <button onClick={handleClick}>+</button>
//       </div>
//       {stories.map((story) => (
//         <div className="story" key={story.id}>
//           <img src={story.img} alt="" />
//           <span>{story.name}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Stories;
