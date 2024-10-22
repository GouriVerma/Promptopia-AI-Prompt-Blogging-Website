"use client"
import React, { useEffect, useState } from 'react'
import Profile from '@components/Profile'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
    const [posts,setPosts]=useState([]);
    const {data:session}=useSession();
    const router=useRouter();

    useEffect(()=>{
        // console.log("inside effect");
        // console.log("session ",session);
        const fetchPosts=async()=>{
            // console.log("fetching");
            const response=await fetch(`/api/users/${session?.user?.id}/posts`);
            const data=await response.json();
            console.log("data ",data);
            setPosts(data);
        }
        session?.user?.id && fetchPosts();
    },[session])

    const handleEdit=(post)=>{
      // console.log("post ",post);
      router.push(`/update-prompt?id=${post?._id}`);
    }

    const handleDelete=async(post)=>{
      const hasConfirm=confirm("Are you sure you want to delete?");
      
      if(hasConfirm){
        try {
          if(session?.user?.id){
            const response=await fetch(`/api/prompt/${post._id}`,{
              method:'DELETE',
            });
            console.log(response);
            if(response.ok){
              setPosts((prev)=>prev.filter((postHere)=>postHere._id!=post._id));
            }
          }
            
        } catch (error) {
          console.log(error);
        }
      }
    }

  return (
    <div>
        <Profile
        name="My"
        desc="Welcome to your personalised profile"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete} />
    </div>
  )
}

export default ProfilePage