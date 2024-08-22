import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetchBlogsQuery } from '../../../redux/feature/blogs/blogsApi';

const RelatedBlogs = () => {
    const { id } = useParams();
    const { data: blogs = [], error, isLoading } = useFetchBlogsQuery(id);

    return (
        <div>
            <h3 className="text-2xl font-medium pt-8 pb-5">Related Blogs</h3>
            <hr />
            {blogs.length > 0 ? (
                <div className="space-y-4 mt-5">
                    {blogs.map((blog) => (
                        <Link
                            to={`/blogs/${blog?._id}`} // Assuming you navigate to a blog detail page
                            key={blog._id}
                            className="flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm px-8 py-4"
                        >
                            <div className="size-14">
                                <img
                                    src={blog.coverImg}
                                    alt={blog.title}
                                    className="h-full w-full rounded-full ring-2 ring-blue-700"
                                />
                            </div>
                            <div>
                                <h4 className="text-lg font-medium">{blog.title.substring(0, 50)}</h4>
                                <p className="text-sm text-gray-600">{blog?.description.substring(0, 50)}...</p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="p-8">No related blogs found!</div>
            )}
        </div>
    );
};

export default RelatedBlogs;
