"use client"
import React, { useEffect, useState } from 'react'
import Profile from '@components/Profile'
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

const OtherProfilePage = ({params}) => {
    const [posts,setPosts]=useState([]);
    const searchParams=useSearchParams();
    const name=searchParams.get("name");
    const router=useRouter();
    

    useEffect(()=>{
        // console.log("inside effect");
        // console.log("session ",session);
        const fetchPosts=async()=>{
            // console.log("fetching");
            const response=await fetch(`/api/users/${params?.profileId}/posts`);
            const data=await response.json();
            console.log("data ",data);
            setPosts(data);
        }
        params?.profileId && fetchPosts();
    },[params])

    
  return (
    <div>
        <Profile
        name={name}
        desc={`Welcome to the personalised profile of ${name}. Explore and Share exceptional AI prompts to revolutionarise prompting created by ${name}.`}
        data={posts} />
    </div>
  )
}

export default OtherProfilePage