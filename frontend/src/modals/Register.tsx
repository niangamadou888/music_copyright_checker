import React from 'react'

function RegisterModal() {
  return (
    <dialog id="register" className="modal">
        <div className="modal-box flex flex-col gap-5">
            <h3 className="font-bold text-2xl text-[#3A6AF1] ">Register!</h3>
            <div className='flex flex-col gap-3'>
                <label htmlFor="email" className='flex flex-col gap-2'>
                    <p>Email Address</p>
                    <input type="text" id="email" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </label>
                <label htmlFor="password" className='flex flex-col gap-2'>
                    <p>Password</p>
                    <input type="password" id="password" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </label>
                <label htmlFor="confirm_password" className='flex flex-col gap-2'>
                    <p>Confirm Password</p>
                    <input type="password" id="confirm_password" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </label>

                <button className='btn bg-[#24C9EF] hover:bg-[#3484F0] text-black hover:text-white'>
                    <p>register</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </button>
            </div>
        </div>
        <form method="dialog" className="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
  )
}

export default RegisterModal