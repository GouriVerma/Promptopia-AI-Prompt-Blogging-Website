'use client'
import React, { useEffect, useReducer, useState } from 'react'
import PromptCard from './PromptCard'
import { useRouter, useSearchParams } from 'next/navigation'

const PromptCardList=({data,handleTagClick})=>{
  return <div className='mt-16 prompt_layout'>
    {data.map((post,index)=><PromptCard key={post._id} post={post} handleTagClick={()=>handleTagClick(post.tag)} />)}
  </div>
}

const Feed = () => {
  const [searchText,setSearchText]=useState("");
  const [posts,setPosts]=useState([]);
  const [filteredPosts,setFilteredPosts]=useState([]);
  const router=useRouter();
  const searchParams=useSearchParams();
  const tag=searchParams.get("tag");
  

  useEffect(()=>{
    const fetchPosts=async()=>{
      const response=await fetch(`/api/prompt`);
      const data=await response.json();
      console.log("data ",data);
      setPosts(data);
      setFilteredPosts(data);
    }
    const fetchPostsByTag=async()=>{
      console.log("fetching from tag");
      const response=await fetch(`/api/prompt/?tag=${tag}`);
      const data=await response.json();
      console.log("data ",data);
      setPosts(data);
      setFilteredPosts(data);
    }

    if(tag){
      fetchPostsByTag();
    } else{
      fetchPosts();
    }

  },[tag])

  useEffect(()=>{
    if(searchText){
      const filteredPosts=posts.filter((post)=>{
        return post.prompt.toLowerCase().includes(searchText.toLowerCase()) || post.tag.toLowerCase().includes(searchText.toLowerCase()) || post.prompt.toLowerCase().includes(searchText.toLowerCase()) || post?.userId?.userName.toLowerCase().includes(searchText.toLowerCase())
      });
      setFilteredPosts(filteredPosts);
    }
    else{
      setFilteredPosts(posts);
    }
  },[searchText])

  const handleTagClick=(tag)=>{
    router.push(`?tag=${tag}`);
  }

  return (
    <div className='feed'>
      {/* Search Bar */}
      <form action="" className='w-full relative flex-center' >
        <input className='search_input focus:outline-none'
         type='text' placeholder='Search for a tag or username' value={searchText} onChange={(e)=>setSearchText(e.target.value)} />
      </form>



      {/* Feeds */}
      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />

    </div>
  )
}

export default Feed