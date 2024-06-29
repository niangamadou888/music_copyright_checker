import React from 'react'

function Navigation() {
  return (
    <nav className='h-[70px] w-full bg-gradient-to-r from-[#24C9EF] via-[#3484F0] to-[#3A6AF1] flex flex-row justify-end items-center'>
        <button className='btn bg-[#24C9EF] hover:bg-[#3484F0] text-black hover:text-white'>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        <p>login</p>
        </button>
    </nav>
  )
}

export default Navigation