import "./post.scss";

import React, { useContext, useState } from 'react';
import { GiLoveHowl } from "react-icons/gi";
import { FcLike } from "react-icons/fc";
import { FaRegCommentDots } from "react-icons/fa6";
import { MdOutlineShare } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
    const [menuOpen , setMenuOpen] = useState(false)
    const [commentOpen, setCommentOpen] = useState(false);
    const { currentUser } = useContext(AuthContext);

    const { isLoading, error, data } = useQuery({
        queryKey: ['likes', post.id],
        queryFn: async () => {
            const response = await makeRequest.get(`/likes?postId=${post.id}`);
            return response.data;
        }
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (liked) => {
            if (liked) return makeRequest.delete(`/likes?postId=${post.id}`);
            return makeRequest.post("/likes", { postId: post.id });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["likes"]);
        },
        onError: (error) => {
            console.error("Mutation error:", error);
            // Handle error states or feedback to the user
        },
    });

    const deletemutation = useMutation({
        mutationFn: (postId) => {
            return makeRequest.delete("/posts/"+postId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["posts"]);
        },
        onError: (error) => {
            console.error("Mutation error:", error);
            // Handle error states or feedback to the user
        },
    });

    const handleLike = () => {
        if (data) {
            mutation.mutate(data.includes(currentUser.id));
        }
    };

    const handleDelete= ()=>{
        deletemutation.mutate(post.id)
    }   

    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={"/upload/"+post.profilePic} alt="" />
                        <div className="details">
                            <Link to={`/profile/${post.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <span className="name">{post.name}</span>
                            </Link>
                            <span className="date">{moment(post.createdAt).fromNow()}</span>
                        </div>
                    </div>
                    <SlOptions onClick={()=>setMenuOpen(!menuOpen)}/>
                    {menuOpen && post.userId === currentUser.id && 
                    (<button onClick={handleDelete}>delete</button>)}
                </div>
                <div className="content">
                    <p>{post.desc}</p>
                    <img src={"./upload/" + post.img} alt="" />
                </div>
                <div className="info">
                    <div className="item">
                        {isLoading ? (
                            "Loading..."
                        ) : error ? (
                            "Error loading likes"
                        ) : data.includes(currentUser.id) ? (
                            <FcLike onClick={handleLike} />
                        ) : (
                            <GiLoveHowl onClick={handleLike} />
                        )}
                        {data && data.length} Likes
                    </div>
                    <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                        <FaRegCommentDots />
                       comment 
                    </div>
                    <div className="item">
                        <MdOutlineShare />
                        Share
                    </div>
                </div>
                {commentOpen && <Comments postId={post.id} />}
            </div>
        </div>
    );
};

export default Post;

