import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import { usePostBlogMutation } from '../../../redux/feature/blogs/blogsApi';
import { useNavigate } from 'react-router-dom'

const AddPost = () => {
  const [title, setTitle] = useState("")
  const [coverImg, setCoverImg] = useState("")
  const [metaDescription, setMetaDescription] = useState("")
  const [category, setCategory] = useState("")
  const [rating, setRating] = useState("")
  const [message, setMessage] = useState("")

  const { user } = useSelector((state) => state.auth)
  const editorRef = useRef(null);

  const [postBlog, { isLoading }] = usePostBlogMutation()
  const navigate = useNavigate(); // useNavigate should be called here

  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editorjs',
      onReady: () => {
        editorRef.current = editor;
      },
      autofocus: true,
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
        },
        list: {
          class: List,
          inlineToolbar: true,
        }
      }
    });

    return () => {
      editor.destroy();
      editorRef.current = null;
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const content = await editorRef.current.save();
      const newPost = {
        title,
        coverImg,
        content,
        description: metaDescription,
        author: user?._id,
        rating,
        category,
      }
      
      const response = await postBlog(newPost).unwrap();
      alert("Blog is posted successfully!");
      navigate('/blogs'); // Replace with the path you want to redirect to

    } catch (error) {
      console.log("Failed to submit post", error);
      setMessage("Failed to submit post. Please try again.");
    }
  }

  return (
    <div className='bg-white md:p-8 p-2'>
      <h2 className='text-2xl font-semibold'>Create A New Blog Post</h2>
      <form onSubmit={handleSubmit} className='space-y-5 pt-8'>
        <div className='space-y-4'>
          <label htmlFor="" className='font-semibold text-xl'>Blog Title:</label>
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3'
            placeholder='Ex: Marina del Rey Marriott...'
            required
          />
        </div>
        {/* blog details */}
        <div className='flex flex-col md:flex-row justify-between items-start gap-4'>
          {/* left side */}
          <div className='md:w-2/3 w-full'>
            <p className='font-semibold text-xl mb-5'>Content Section</p>
            <p className='text-xl italic'>Write your post below here....</p>
            <div id="editorjs" className="bg-white border rounded-md p-4"></div> {/* This is where EditorJS will render */}
          </div>
          {/* right side */}
          <div className='md:w-1/3 w-full border p-5 space-y-5'>
            <p className='text-xl font-semibold'>Choose Blog Format</p>
            {/* Cover Image */}
            <div className='space-y-4'>
              <label htmlFor="" className='font-semibold text-xl'>Blog Cover:</label>
              <input 
                type="text"
                value={coverImg}
                onChange={(e) => setCoverImg(e.target.value)}
                className='w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3'
                placeholder='https://unsplash.com/image/cover-photo-of-blog1.png...'
                required
              />
            </div>
            {/* Category */}
            <div className='space-y-4'>
              <label htmlFor="" className='font-semibold text-xl'>Category:</label>
              <input 
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className='w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3'
                placeholder='RoofTop/Travel/Nature'
                required
              />
            </div>
            {/* Meta Description */}
            <div className='space-y-4'>
              <label htmlFor="" className='font-semibold text-xl'>Meta Description:</label>
              <textarea 
                cols={4}
                rows={4}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className='w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3'
                placeholder='Write your blog meta description'
                required
              />
            </div>
            {/* Rating */}
            <div className='space-y-4'>
              <label htmlFor="" className='font-semibold text-xl'>Rating:</label>
              <input 
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className='w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3'
                placeholder='Give a rating between 1 and 5'
                required
              />
            </div>
            {/* Author */}
            <div className='space-y-4'>
              <label htmlFor="" className='font-semibold text-xl'>Author:</label>
              <input 
                type="text"
                value={user?.username}
                className='w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3'
                placeholder={`{user.username} (not editable)`}
                readOnly
                required
              />
            </div>
          </div>
        </div>
        {
          message && <p className='text-red-500'>{message}</p>
        }
        <button disabled={isLoading} type="submit" className="w-full bg-primary hover:bg-indigo-500 text-white font-medium py-3 rounded-md">
          {isLoading ? "Posting..." : "Add New Blog"}
        </button>
      </form>
    </div>
  )
}

export default AddPost;
