import React from 'react';
import { formatDate } from '../../../utils/formateDate';
import EditorJSHTML from 'editorjs-html';

const SingleBlogCard = ({ blog }) => {
    const editorJSHTML = EditorJSHTML(); 
    const { title, description, content, coverImg, category, rating, author, createdAt } = blog || {};

    // Log the blog object to the console for debugging
    console.log('SingleBlogCard blog data:', blog);

    // Ensure content is an array before attempting to parse it
    const htmlContent = Array.isArray(content)
        ? editorJSHTML.parse(content).join('')
        : '<p>No content available.</p>';

    return (
        <div className="bg-white p-8">
            {/* Blog Header */}
            <div>
                <h1 className="md:text-4xl text-3xl font-medium mb-4">
                    {title || 'Untitled Blog'}
                </h1>
                <p>
                    {formatDate(createdAt)} by{' '}
                    <span className="text-blue-400 cursor-pointer">
                        {author?.name || 'Admin'}
                    </span>
                </p>
            </div>
            {/* Blog Image */}
            {coverImg && (
                <div>
                    <img
                        src={coverImg}
                        alt="Cover"
                        className="w-full md:h-[520px] bg-cover object-cover"
                    />
                </div>
            )}
            {/* Blog Details */}
            <div className="mt-8 space-y-4">
                <div
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                    className="space-y-3 editorjsdiv"
                />
                {rating && (
                    <div>
                        <span className="text-lg font-medium">Rating: </span>
                        <span>{rating} (based on 2,370 reviews)</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SingleBlogCard;
