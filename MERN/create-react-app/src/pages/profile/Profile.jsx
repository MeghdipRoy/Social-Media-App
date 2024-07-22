import "./profile.scss";
import { FaFacebook, FaInstagram, FaLinkedin, FaPinterest, FaTwitter } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { CiGlobe, CiMail } from "react-icons/ci";
import { SlOptionsVertical } from "react-icons/sl";
import Posts from "../../components/posts/Posts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";


const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery({
    queryKey: ['user', userId], // Adjusted to an array
    queryFn: async () => {
      const response = await makeRequest.get("/users/find/" + userId);
      return response.data;
    }
  });
  
  const { isLoading: rIsLoading, error: rError, data: relationshipData } = useQuery({
    queryKey: ['relationship', userId], // Adjusted to an array
    queryFn: async () => {
      const response = await makeRequest.get("/relationships?followedUserId=" + userId);
      return response.data;
    }
  });
  

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (following) => {
      if (following) {
        return makeRequest.delete("/relationships?userId=" + userId);
      }
      return makeRequest.post("/relationships", { userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["relationship"]); 
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    }
  });
  

  const handleFollow = () => {
    if (relationshipData) {
      mutation.mutate(relationshipData.includes(currentUser.id));
    }
  };

  // Handle loading states
  // if (isLoading || rIsLoading) return <div>Loading...</div>;

  // Handle error states
  if (error || rError) return <div>Error loading profile</div>;

  // Ensure data is defined before accessing its properties
  if (!data) return null; // or return a loading state

  return (
    <div className='profile'>
      {isLoading ? (
        "loading"
      ) : (
        <>
      <div className="images">
        {data.coverPic && <img src={"/upload/"+data.coverPic} alt="" className="cover" />}
        {data.profilePic && <img src={"/upload/"+data.profilePic} alt="" className="profilePic" />}
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FaFacebook fontSize="large" />
            </a>
            <a href="http://instagram.com">
              <FaInstagram fontSize="large" />
            </a>
            <a href="http://twitter.com">
              <FaTwitter fontSize="large" />
            </a>
            <a href="http://linkedin.com">
              <FaLinkedin fontSize="large" />
            </a>
            <a href="http://pinterest.com">
              <FaPinterest fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{data.name}</span>
            <div className="info">
              <div className="item">
                <IoLocationOutline />
                <span>{data.city}</span>
              </div>
              <div className="item">
                <CiGlobe />
                <span>{data.website}</span>
              </div>
            </div>
            <div>
            {rIsLoading ? (
  "Loading..."
) : (
  <>
    {userId === currentUser.id ? (
      <button onClick={()=>setOpenUpdate(true)}>Update</button>
    ) : (
      <button onClick={handleFollow}>
        {relationshipData && relationshipData.includes(currentUser.id)
          ? "Following"
          : "Follow"}
      </button>
    )}
  </>
)}

            </div>
          </div>
          <div className="right">
            <CiMail />
            <SlOptionsVertical />
          </div>
        </div>
        <Posts userId={userId}  />
      </div>
      </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data}/>}
    </div>
  );
}

export default Profile;
