import { Link, useNavigate, useParams } from 'react-router-dom'

function Account() {
    const navigate = useNavigate()
    const {tab} = useParams()
  return (
    <>
    <div>
       <div className='flex flex-row gap-1 justify-start items-center'>
            <button onClick={() => navigate(-1)}  className='m-4 rounded-full hover:bg-[#3A6AF1] hover:text-white'>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-arrow-left-circle"><circle cx="12" cy="12" r="10"></circle><polyline points="12 8 8 12 12 16"></polyline><line x1="16" y1="12" x2="8" y2="12"></line></svg>
            </button>
            <Link to="/"  className='m-4 rounded-full hover:text-[#3A6AF1] hover:scale-110'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            </Link>
       </div>

        <div className='w-full h-screen flex flex-col justify-start items-center gap-4'>
          {/* <h1 className='text-4xl font-sans font-extrabold text-[#3A6AF1] uppercase text-center'>My Account</h1> */}
          <div className='grid grid-cols-5 w-full gap-3 p-3'>
            <div className="bg-[#3A6AF1]/10 p-2 py-8 rounded-md flex flex-col justify-center gap-3">
                <div className="w-full flex flex-row justify-center">
                    <img src="https://randomuser.me/api/portraits/men/78.jpg" alt="profile photo" className='rounded-full w-[120px] aspect-square border-[#3A6AF1] border p-1' />
                </div>
                <h3 className='text-center font-bold text-xl'>Alif Sonderson</h3>
                <div className='flex flex-col gap-2 p-2'>
                    <Link to="/account/studio" className={`w-full text-center transition-all p-3 rounded-lg drop-shadow-md ${tab == 'studio' ? 'bg-[#3A6AF1] text-white' : 'bg-white text-[#3A6AF1]'}`}>Studio</Link>
                    <Link to="/account/likes" className={`w-full text-center transition-all p-3 rounded-lg drop-shadow-md ${tab == 'likes' ? 'bg-[#3A6AF1] text-white' : 'bg-white text-[#3A6AF1]'}`}>Likes</Link>
                    <Link to="/account/musics" className={`w-full text-center transition-all p-3 rounded-lg drop-shadow-md ${tab == 'musics' ? 'bg-[#3A6AF1] text-white' : 'bg-white text-[#3A6AF1]'}`}>Musics</Link>
                </div>
            </div>
            <div className="col-span-4 bg-[#3A6AF1]/10 p-2 rounded-md flex flex-col items-center">
                <h4 className='font-extrabold text-2xl uppercase text-[#3A6AF1]'>Listen online</h4>
                <div className='flex flex-row gap-3 self-start p-4'>
                    {[
                        "https://img.youtube.com/vi/-qa2I8UCIvk/mq3.jpg",
                    "https://img.youtube.com/vi/q_3bwwbMdh8/mqdefault.jpg"
                ].map(image => (
                    <div className='max-h-[180px] overflow-hidden relative'>
                        <img src={image} alt="" />
                        <p className='absolute bottom-0 bg-black text-white w-full pl-2'>House & dance (Royal Free Music)</p>
                    </div>
                ))
                }
                </div>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default Account