import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import './comments.scss'
import { useQuery ,useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment"

const Comments = ({postId}) => {
    const [desc, setDesc] = useState("")
    const {currentUser} = useContext(AuthContext )
    

    const { isLoading, error, data } = useQuery(
        {
    
        queryKey: ['comments'],
        
        queryFn: () =>
          makeRequest.get('/comments?postId='+postId).then((res) => res.data),
        
        });

        const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newComment) => makeRequest.post("/comments", newComment),
        onSuccess: () => {
          queryClient.invalidateQueries(["comments"]);
        },
        onError: (error) => {
          console.error("Mutation error:", error);
          // Handle error states or feedback to the user
        },
      });
      
  
    const handleClick = async(e) =>{
      e.preventDefault()
     
      mutation.mutate({desc,postId})
      setDesc("")
      
    }
    
      
  return (
    <div className='comments'>
        <div className="write">
        <img src={"/upload/"+currentUser.profilePic} alt=""/>
    <input type='text' placeholder='write a comment' 
    value={desc}
    onChange={(e)=>setDesc(e.target.value)}/>
    <button onClick={handleClick}>Send</button>
        </div>
        {
            isLoading ? "loading" :
            data.map(comment=>(
                <div className="comment">
                    <img src={"/upload/"+comment.profilePic} alt=""/>
                    <div className="info">
                        <span>{comment.name}</span>
                        <p>{comment.desc}</p>
                    </div>
                    <span className='date'>{moment(comment.createdAt).fromNow()}</span>
                </div>
            ))
        }
    </div>
  )
}

export default Comments