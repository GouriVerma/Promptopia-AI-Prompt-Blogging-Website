'use client'
import Form from '@components/Form'
import { getSession, useSession } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const UpdatePrompt = () => {
  const [post,setPost]=useState({prompt:"",tag:""}); 
  const [submitting,setSubmitting]=useState(false);
  const router=useRouter();
  const session=useSession();
  const searchParams=useSearchParams();
  const id=searchParams.get("id");
  // console.log("session2 ",session2);

  useEffect(()=>{
    
    const fetchPost=async()=>{
        
        try {
            const res=await fetch(`/api/prompt/${id}`);
            const data=await res.json();
            console.log("fetched for update",data);
            setPost({prompt:data.prompt,tag:data.tag});
        } catch (error) {
            
        }
        
    }
    id && fetchPost();
  },[id])
  

  const handleSubmit=async(e)=>{
    e.preventDefault();
    // const {data:session}=await getSession();
    
    
    console.log("session ",session);
    
    setSubmitting(true);
    //create prompt

    try {
      if(session?.data?.user?.id && id){
        const response=await fetch(`/api/prompt/${id}`,{
          method:'PATCH',
          body:JSON.stringify({
            prompt:post.prompt,
            tag:post.tag,
          })
        });
        console.log(response);
        if(response.ok){
          router.replace("/profile");
        }
      }
        
    } catch (error) {
      console.log(error);
    }
    finally{
      setSubmitting(false);
    }


    

  }
  return (
    <div>
        <Form
        type="Update"
        post={post}
        setPost={setPost}
        handleSubmit={handleSubmit}
        submitting={submitting}
        setSubmitting={setSubmitting}
        />
    </div>
  )
}

export default UpdatePrompt