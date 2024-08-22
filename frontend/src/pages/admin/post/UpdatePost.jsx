import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import { useFetchBlogByIdQuery, useUpdateBlogMutation } from '../../../redux/feature/blogs/blogsApi';
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePost = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: "",
        coverImg: "",
        metaDescription: "",
        category: "",
        rating: "",
    });
    const [message, setMessage] = useState("");

    const { data: blog = {}, isLoading, refetch } = useFetchBlogByIdQuery(id);
    const [updateBlog] = useUpdateBlogMutation();
    const { user } = useSelector((state) => state.auth);
    const editorRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (blog.post) {
            setFormData({
                title: blog.post.title,
                coverImg: blog.post.coverImg,
                metaDescription: blog.post.description,
                category: blog.post.category,
                rating: blog.post.rating,
            });

            const editor = new EditorJS({
                holder: 'editorjs',
                onReady: () => {
                    editorRef.current = editor;
                },
                autofocus: true,
                tools: {
                    header: { class: Header, inlineToolbar: true },
                    list: { class: List, inlineToolbar: true },
                },
                data: blog.post.content,
            });

            return () => {
                if (editorRef.current) {
                    editorRef.current.isReady.then(() => {
                        editorRef.current.destroy();
                        editorRef.current = null;
                    });
                }
            };
        }
    }, [blog]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const content = await editorRef.current.save();
            const updatePost = {
                title: formData.title || blog.post.title,
                coverImg: formData.coverImg || blog.post.coverImg,
                content,
                description: formData.metaDescription || blog.post.description,
                author: user?._id,
                rating: formData.rating || blog.post.rating,
                category: formData.category || blog.post.category,
            };

            await updateBlog({ id, ...updatePost }).unwrap();
            alert('Blog updated successfully!');
            refetch()
            navigate('/dashboard');
        } catch (error) {
            console.log('Failed to submit post', error);
            setMessage('Failed to submit post. Please try again.');
        }
    };

    return (
        <div className='bg-white md:p-8 p-2'>
            <h2 className='text-2xl font-semibold'>Update Blog Post</h2>
            <form onSubmit={handleSubmit} className='space-y-5 pt-8'>
                <div className='space-y-4'>
                    <label htmlFor="title" className='font-semibold text-xl'>Blog Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
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
                        <div id="editorjs" className="bg-white border rounded-md p-4"></div> {/* EditorJS will render here */}
                    </div>
                    {/* right side */}
                    <div className='md:w-1/3 w-full border p-5 space-y-5'>
                        <p className='text-xl font-semibold'>Choose Blog Format</p>
                        {/* Cover Image */}
                        <div className='space-y-4'>
                            <label htmlFor="coverImg" className='font-semibold text-xl'>Blog Cover:</label>
                            <input
                                type="text"
                                name="coverImg"
                                value={formData.coverImg}
                                onChange={handleChange}
                                className='w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3'
                                placeholder='https://unsplash.com/image/cover-photo-of-blog1.png...'
                                required
                            />
                        </div>
                        {/* Category */}
                        <div className='space-y-4'>
                            <label htmlFor="category" className='font-semibold text-xl'>Category:</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className='w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3'
                                placeholder='RoofTop/Travel/Nature'
                                required
                            />
                        </div>
                        {/* Meta Description */}
                        <div className='space-y-4'>
                            <label htmlFor="metaDescription" className='font-semibold text-xl'>Meta Description:</label>
                            <textarea
                                name="metaDescription"
                                cols={4}
                                rows={4}
                                value={formData.metaDescription}
                                onChange={handleChange}
                                className='w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3'
                                placeholder='Write your blog meta description'
                                required
                            />
                        </div>
                        {/* Rating */}
                        <div className='space-y-4'>
                            <label htmlFor="rating" className='font-semibold text-xl'>Rating:</label>
                            <input
                                type="number"
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                className='w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3'
                                placeholder='Give a rating between 1 and 5'
                                required
                            />
                        </div>
                        {/* Author */}
                        <div className='space-y-4'>
                            <label htmlFor="author" className='font-semibold text-xl'>Author:</label>
                            <input
                                type="text"
                                name="author"
                                value={user?.username}
                                className='w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3'
                                readOnly
                                required
                            />
                        </div>
                    </div>
                </div>
                {message && <p className='text-red-500'>{message}</p>}
                <button disabled={isLoading} type="submit" className="w-full bg-primary hover:bg-indigo-500 text-white font-medium py-3 rounded-md">
                    {isLoading ? "Updating..." : "Update Blog"}
                </button>
            </form>
        </div>
    );
}

export default UpdatePost;
