import { AxiosError } from "axios";
import { useState, useContext } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { typeToFlattenedError } from "zod";
import AuthContext from "../context/AuthContext";
import { schema } from "../schema/registerSchema";
import { registerUser } from "../services/registerUser";

function RegisterModal() {
    const [email, setEmail] = useState<string>()
    const [username, setUsername] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [confPassword, setConfPassword] = useState<string>()
    const [error, setError] = useState<typeToFlattenedError<{ email: string; password: string; username: string; confirm_password: string; }, string>>()

    const mutation = useMutation(registerUser, {
        onSuccess: (_data) => {
          toast('registration successful')
        //   @ts-ignore
          document.getElementById('register')?.close()
        //   @ts-ignore
        document.getElementById('login')?.showModal()
        },
        onError: (error: AxiosError) => {
            let message = 'registration failed'
            if (
                error?.response?.data && 
                typeof error?.response?.data == 'object' && 
                'message' in error?.response?.data && 
                typeof error?.response?.data?.message == 'string'
            ) {
                message = error?.response?.data?.message
            }
            toast(message)
        }
      })

      const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const parsedData = schema.safeParse({
            email,
            password,
            username,
            confirm_password: confPassword
        })
        if (!parsedData.success) {
            setError(parsedData.error?.flatten())
        } else {
            setError(undefined)
            mutation.mutate(parsedData.data)
        }
      }

      const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
      }

      const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
      }

      const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
      }

      const handleConfPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfPassword(e.target.value)
      }
      
  return (
    <dialog id="register" className="modal">
        <form onSubmit={onSubmit} className="modal-box flex flex-col gap-5">
            <h3 className="font-bold text-2xl text-[#3A6AF1] ">Register!</h3>
            <div className='flex flex-col gap-3'>
                <label htmlFor="email" className='flex flex-col gap-2'>
                    <p>Email Address</p>
                    <input type="text" id="email" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={email} onChange={handleEmailChange} />
                    <span className="block text-red-500 text-sm">{error?.fieldErrors?.email?.[0]}</span>
                </label>
                <label htmlFor="email" className='flex flex-col gap-2'>
                    <p>Username</p>
                    <input type="text" id="username" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={username} onChange={handleUsernameChange} />
                    <span className="block text-red-500 text-sm">{error?.fieldErrors?.username?.[0]}</span>
                </label>
                <label htmlFor="password" className='flex flex-col gap-2'>
                    <p>Password</p>
                    <input type="password" id="password" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={password} onChange={handlePasswordChange}/>
                    <span className="block text-red-500 text-sm">{error?.fieldErrors?.password?.[0]}</span>
                </label>
                <label htmlFor="confirm_password" className='flex flex-col gap-2'>
                    <p>Confirm Password</p>
                    <input type="password" id="confirm_password" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={confPassword} onChange={handleConfPasswordChange} />
                    <span className="block text-red-500 text-sm">{error?.fieldErrors?.confirm_password?.[0]}</span>
                </label>

                <button className='btn bg-[#24C9EF] hover:bg-[#3484F0] text-black hover:text-white' disabled={mutation.isLoading}>
                    <p>register</p>
                    {
                        mutation.isLoading ?
                        <span className="loading loading-spinner text-accent"></span> :
                         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    }
                </button>
            </div>
        </form>
        <form method="dialog" className="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
  )
}

export default RegisterModal