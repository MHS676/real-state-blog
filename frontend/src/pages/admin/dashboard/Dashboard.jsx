import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FiUsers } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import { FaBlog } from "react-icons/fa";
import { useFetchBlogsQuery } from '../../../redux/feature/blogs/blogsApi';
import { useGetCommentsQuery } from '../../../redux/feature/comments/commentApi';
import { useGetUserQuery } from '../../../redux/feature/auth/authApi';
import BlogChart from './BlogChart';

const Dashboard = () => {
  const [query, setQuery] = useState({ search: '', category: '' });
  const { user } = useSelector((state) => state.auth);
  const { data: blogs = [], error, isLoading } = useFetchBlogsQuery(query);
  const { data: comments = [] } = useGetCommentsQuery();
  const { data: users = [] } = useGetUserQuery();
  const adminCounts = users.users?.filter(user => user.role === 'admin').length || 0;
  const userCounts = users.users?.length || 0;

  return (
    <>
      {isLoading && <div>Loading....</div>}
      <div className='space-y-6'>
        <div className='bg-gray-100 p-5 rounded-lg shadow-md'>
          <h1 className='text-2xl font-bold'>Hi, {user?.username}!</h1>
          <p className='text-lg'>Welcome to the admin dashboard</p>
          <p className='text-md text-gray-700'>Here you can manage hotel posts, rooms, and other administrative tasks.</p>
        </div>
        {/* Card Grid */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 pt-8'>
          <div className='bg-indigo-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center'>
            <FiUsers className='size-8 text-indigo-600' />
            <p className=''>{userCounts} Users</p>
          </div>

          <div className='bg-red-100 py-6 rounded-sm space-y-1 flex flex-col items-center shadow-sm'>
            <FaBlog className='size-8 text-red-600' />
            <p className=''>{blogs.length} Blogs</p>
          </div>

          <div className='bg-lime-100 py-6 rounded-sm space-y-1 flex flex-col items-center shadow-sm'>
            <RiAdminLine className='size-8 text-lime-600' />
            <p className=''>
              {adminCounts} Admin{adminCounts !== 1 ? 's' : ''}
            </p>
          </div>

          <div className='bg-orange-100 py-6 rounded-sm space-y-1 flex flex-col items-center shadow-sm'>
            <FiUsers className='size-8 text-orange-600' />
            <p className=''>{comments?.totalComments || 0} Comments</p>
          </div>
        </div>
        {/* graphs and chart */}
        <div className=' pt-5 pb-5'>
          <BlogChart blogs={blogs}/>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
