import React from 'react'
import {useNavigate} from 'react-router-dom';

const Sidebar = ({selectedUser, setSelectedUser}) => {
  const navigate= useNavigate();
  return (
    <div className={`bg-{#8185B2}/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selectedUser ? "max-md:hidden" : ''}`}>
      <div className='pb-5'>
        <div classname= 'flex justify-between items-center'>
          <img src={assets.logo} alt="logo" classsName='max-w-40'/>
          <div classname="relative py-2 group">
            <img src={assets.menu_icon} alt="Menu" classsName='max-h-5 cursor-pointer'/>
            <div classname= 'absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600
             text-gray-100 hidden group-hover:block'>
              <p onClick={()=>navigate('/profile')} classname='cursor-pointer text-sm'>Edit Profile</p>
              <hr className="my-2 border-t border-gray-500" />
              <p classname='cursor-pointer text-sm'>Logout</p>
            </div>
          </div>

          

        </div>
      </div>
     
    </div>
  )
}

export default Sidebar
