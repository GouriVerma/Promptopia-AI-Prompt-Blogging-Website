"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Logo from "../public/assets/images/logo.svg"
import Profile from "@public/assets/images/Profile.png"
import {getProviders, getSession, signIn, signOut, useSession} from "next-auth/react"

const sessionGet=async()=>{
    const session=await getSession();
    console.log("get ",session);
}

const Nav = () => {
  const isUserLoggedIn=false;  
  
  const {data:session}=useSession();
  console.log("nav ",session);

  const [providers,setProviders]=useState(null);
  const [toggleDropdown,setToggleDropdown]=useState(false);

  useEffect(()=>{
    const setProvidersHere=async()=>{
        const response=await getProviders(); //get all the providers configured
        setProviders(response);
        console.log(response);
    }
    setProvidersHere();
  },[])  

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link href="/" className='flex-center gap-1'>
            <Image alt='logo' src={Logo} width={30}/>
            <p className='logo_text'>Promptopia</p>
        </Link>

        {/* Desktop Navigation */}
        <div className='sm:flex hidden'>
            {session?.user ? (
                <div className='flex gap-3 md:gap-5'>
                    <Link href="/create-prompt" className='black_btn'>Create Post</Link>
                    <button className='outline_btn' onClick={()=>{signOut()}}>Sign Out</button> 
                    <Link href="/profile">
                        <Image alt='profile' src= {session?.user?.image} width={30} height={30} className='rounded-full'/>
                    </Link>

                </div>
            ): (
                // sign in button for each provider, signIn(provider.id) directly takes to login page of provider
                <div> 
                    {providers && Object.values(providers).map(provider=>(
                        <button type='button' key={provider.name} className='black_btn' onClick={()=>{signIn(provider.id)}}>Sign in</button>  
                    ))}
                   
                </div>
            )}
        </div>

        {/* Mobile Navigation */}
        <div className='flex sm:hidden'>
            {session?.user ? (
                <div className='relative'>
                    <Image alt='profile' src= {session?.user?.image} width={30} height={30} onClick={()=>setToggleDropdown(prev=>!prev)} className='cursor-pointer rounded-full'/>
                    {toggleDropdown && 
                    <div className='dropdown'>
                        <Link href="/profile" className='dropdown_link w-full' onClick={()=>setToggleDropdown(false)}>My Profile</Link>
                        <Link href="/create-prompt" className='dropdown_link w-full' onClick={()=>setToggleDropdown(false)}>Create Prompt</Link>
                        <button className='black_btn w-full' onClick={()=>signOut()}>Sign Out</button>

                    </div>   
                    }
                </div>
            ):(
                <div> 
                    {providers && Object.values(providers).map(provider=>(
                        <button type='button' key={provider.name} className='black_btn' onClick={()=>{signIn(provider.id)}}>Sign in</button>  
                    ))}
                   
                </div>
            )}

        </div>

    </nav>
  )
}

export default Nav