import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchBlogByIdQuery } from '../../../redux/feature/blogs/blogsApi';
import { usePostCommentMutation } from '../../../redux/feature/comments/commentApi'

const PostAComment = () => {
    const { id } = useParams();
    const [comment, setComment] = useState('');
    const { user } = useSelector((state) => state.auth);
    // console.log(user)
    const navigate = useNavigate();

    const [postComment] = usePostCommentMutation();
    const {refetch} = useFetchBlogByIdQuery(id, {skip: !id});

    // Make handleSubmit an async function
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            alert('Please login to comment on this post.');
            navigate("/login");
            return;
        }

        const newComment = {
            comment: comment,
            user: user?._id,
            postId: id
        };



        try {
            // Wait for the postComment mutation to complete
            const response = await postComment(newComment).unwrap();
            console.log(response);
            alert('Comment posted successfully')
            setComment('')
            refetch()
        } catch (error) {
            alert('An error occurred while posting the comment');
            console.error('Error:', error);
        }
    };

    return (
        <div className='mt-8'>
            <h3 className='text-lg font-medium mb-8'>Leave a Comment</h3>
            <form onSubmit={handleSubmit} action="">
                <textarea
                    name="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    cols="30"
                    rows="10"
                    placeholder='Share your opinion about this post.....'
                    className='w-full bg-bgPrimary'
                />
                <button
                    type='submit'
                    className='w-full bg-primary hover:bg-indigo-500 text-white font-medium py-3 rounded-md'
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default PostAComment;
