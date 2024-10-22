"use client"
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

const PromptCard = ({post,handleTagClick,handleDelete,handleEdit}) => {
  const pathName=usePathname();
  const [copied,setCopied]=useState("");
  const {data:session}=useSession();
  const handleCopy=()=>{
    console.log("copied");
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    
    setTimeout(()=>setCopied(""),3000);
  }
  return (
    <div className='prompt_card'>
        <div className='flex-1 flex justify-between items-center cursor-pointer'>
          <Link href={`/profile/${post?.userId?._id}?name=${post?.userId?.userName}`} className='flex gap-4'>
            <Image src={post?.userId?.image} alt="user_image" width={44} height={44} className='rounded-full object-cover'/>
            <div className='flex flex-col'>
              <h3 className='font-satoshi font-semibold text-gray-900'>{post?.userId?.userName}</h3>
              <h3 className='font-inter text-sm text-gray-500'>{post?.userId?.email}</h3>
            </div>
          </Link>

          <div className='copy_btn' onClick={()=>{}}>
            <Image src={copied==post.prompt ? '/assets/icons/tick.svg':'/assets/icons/copy.svg'} width={12} height={12} alt="copy"
            onClick={handleCopy}/>
          </div>
        </div>

        <p className='my-4 font-satoshi text-sm text-gray-700' onClick={handleCopy}>{post.prompt}</p>
        <p className='font-inter text-sm blue_gradient cursor-pointer' onClick={handleTagClick}>#{post.tag}</p>

        {session?.user?.id==post?.userId?._id && pathName=="/profile" &&
          <div className='mt-5 flex justify-center gap-8 border border-gray-100 pt-3'>
            <p className='text-sm font-inter cursor-pointer text-green-500' onClick={handleEdit}>Edit</p>
            <p className='text-sm font-inter cursor-pointer text-red-500' onClick={handleDelete}>Delete</p>
          </div>
        
        }
        
    </div>
  )
}

export default PromptCard