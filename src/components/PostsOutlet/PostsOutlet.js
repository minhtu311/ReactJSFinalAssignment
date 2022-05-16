import React from 'react'
import { Outlet } from "react-router-dom";

const PostsOutlet = () => {
  return (
    <div className='posts-outlet'>
         <Outlet />
    </div>
  )
}

export default PostsOutlet