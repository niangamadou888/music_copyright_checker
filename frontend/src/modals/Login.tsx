function LoginModal() {
  return (
    <dialog id="login" className="modal">
        <div className="modal-box flex flex-col gap-5">
            <h3 className="font-bold text-2xl text-[#3A6AF1] ">Login!</h3>
            <div className='flex flex-col gap-3'>
                <label htmlFor="email" className='flex flex-col gap-2'>
                    <p>Email Address</p>
                    <input type="text" id="email" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </label>
                <label htmlFor="password" className='flex flex-col gap-2'>
                    <p>Password</p>
                    <input type="password" id="password" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </label>

                <button className='btn bg-[#24C9EF] hover:bg-[#3484F0] text-black hover:text-white'>
                    <p>login</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-arrow-right-circle"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                </button>
            </div>
        </div>
        <form method="dialog" className="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
  )
}

export default LoginModal