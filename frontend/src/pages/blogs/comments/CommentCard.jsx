import React from 'react';
import commentorIcon from '../../../assets/commentor.png';
import { formatDate } from '../../../utils/formateDate';
import PostAComment from './PostAComment';

const CommentCard = ({ comments = [] }) => {
    return (
        <div className="my-6 bg-white">
            <div>
                {comments.length > 0 ? (
                    <div>
                        <h3 className="text-lg font-medium">All Comments</h3>
                        {comments.map((comment, index) => (
                            <div key={index} className=" mt-4">
                                
                                <div className="flex gap-4 items-center">
                                <img src={commentorIcon} alt="Commentor" className="h-14" />
                                    <div>
                                        <p className="text-lg font-medium underline capitalize underline-offset-4 text-blue-400">
                                        {comment?.user.username}
                                    </p>
                                    <p className="text-[12px] italic">{formatDate(comment.createdAt)}</p>
                                    </div>
                                    {/* comment details */}
                                    <div className="text-gray-600 border p-8 mt-2">
                                        <p className="md:w-4/5">{comment?.comment}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-lg font-medium">No comments found!</div>
                )}
            </div>
            {/* comment input here */}
            <PostAComment/>
        </div>
    );
};

export default CommentCard;