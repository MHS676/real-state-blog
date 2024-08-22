import React, { useState } from 'react';
import SearchBlog from './SearchBlog';
import { useFetchBlogsQuery } from '../../redux/feature/blogs/blogsApi';
import { Link } from 'react-router-dom';

const Blogs = () => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [query, setQuery] = useState({ search: '', category: '' });

    // get data using redux
    const { data: blogs = [], error, isLoading } = useFetchBlogsQuery(query);
    // console.log(blogs)
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleSearch = () => setQuery({ search, category });

    return (
        <div className="mt-16 container mx-auto">
            <SearchBlog
                search={search}
                handleSearchChange={handleSearchChange}
                handleCategoryChange={handleCategoryChange}
                handleSearch={handleSearch}
                category={category}
            />

            {isLoading && <div>Loading...</div>}
            {error && (
                <div className="text-red-500">
                    <p>Something went wrong: {error.toString()}</p>
                    <button onClick={handleSearch} className="text-blue-500 underline">Retry</button>
                </div>
            )}
            {!isLoading && blogs.length === 0 && (
                <div>No blogs found for your search.</div>
            )}
            <div className='mt-8 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-8'>
                {blogs.map(blog => (
                    <Link className='shadow-md hover:shadow-lg transition duration-200' key={blog._id} to={`/blogs/${blog._id}`}>
                        <img className='h-80 w-full object-cover' src={blog?.coverImg} alt={`Cover image for ${blog.title}`} />
                        <h2 className='text-xl p-4'>{blog.title}</h2>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Blogs;
