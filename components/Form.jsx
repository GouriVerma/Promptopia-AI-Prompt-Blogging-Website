import Link from 'next/link'
import React from 'react'

const Form = ({type,post,setPost,handleSubmit,submitting,setSubmitting}) => {
  return (
    <div className=''>
        <h1 className='blue_gradient head_text'>{type} Post</h1>
        <p className='desc'>Create and share amazing posts with the world, and let your imagination run wild with any AI-powered platform</p>
        <form className='glassmorphism mt-10 w-full max-w-2xl flex flex-col gap-7' onSubmit={handleSubmit}>
            <label className=''>
                <span className='font-santoshi font-semibold text-base text-gray-700'>Your AI Prompt</span>

                <textarea className='form_textarea'
                value={post.prompt}
                onChange={(e)=>setPost({...post,prompt:e.target.value})} 
                placeholder='Write your prompt here...'
                required
                />
            </label>
            <label className=''>
                <span className='font-santoshi font-semibold text-base text-gray-700'>#tag</span>

                <input className='form_input'
                value={post.tag}
                onChange={(e)=>setPost({...post,tag:e.target.value})} 
                placeholder='#tag'
                required
                />
            </label>

            <div className='flex flex-end gap-4 mb-5 mx-3'>
                <Link href="/" className='text-gray-500 text-sm'>Cancel</Link>
                <button type='submit' disabled={submitting} className='bg-orange-500 px-5 py-1.5 text-white rounded-full'>{submitting? `${type}...`:`${type}`}</button>
            </div>
        </form>
    
    </div>
  )
}

export default Form