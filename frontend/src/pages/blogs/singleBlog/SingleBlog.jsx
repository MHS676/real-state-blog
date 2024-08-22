import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SingleBlogCard from './SingleBlogCard';
import CommentCard from '../comments/CommentCard';
import RelatedBlogs from './RealedBlogs';
import { useFetchBlogByIdQuery } from '../../../redux/feature/blogs/blogsApi';

const SingleBlog = () => {
    const { id } = useParams();
    console.log(id)
    const { data: blog, error, isLoading } = useFetchBlogByIdQuery(id);
    console.log(blog)


    return (
        <div className='text-primary container mx-auto mt-8'>
            {isLoading && <div>Loading....</div>}
            {error && <div>Something went wrong....</div>}
            {blog?.post && (
                <div className='flex flex-col lg:flex-row justify-between items-start md:gap-12 gap-8'>
                    <div className='lg:w-2/3 w-full'>
                        <SingleBlogCard blog={blog.post} />
                        <CommentCard comments={blog?.comments} />
                    </div>
                    <div className='bg-white lg:w-1/3 w-full'>
                    <RelatedBlogs/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleBlog;
