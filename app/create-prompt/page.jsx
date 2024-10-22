'use client'
import Form from '@components/Form'
import { getSession, useSession } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const CreatePrompt = () => {
  const [post,setPost]=useState({prompt:"",tag:""}); 
  const [submitting,setSubmitting]=useState(false);
  const router=useRouter();
  const session=useSession();
  // console.log("session2 ",session2);
  

  const handleSubmit=async(e)=>{
    e.preventDefault();
    // const {data:session}=await getSession();
    
    
    console.log("session ",session);
    
    setSubmitting(true);
    //create prompt

    try {
      if(session?.data?.user?.id){
        const response=await fetch('/api/prompt/new',{
          method:'POST',
          body:JSON.stringify({
            prompt:post.prompt,
            tag:post.tag,
            userId:session?.data?.user?.id
          })
        });
        console.log(response);
        if(response.ok){
          router.replace("/");
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
        type="Create"
        post={post}
        setPost={setPost}
        handleSubmit={handleSubmit}
        submitting={submitting}
        setSubmitting={setSubmitting}
        />
    </div>
  )
}

export default CreatePrompt