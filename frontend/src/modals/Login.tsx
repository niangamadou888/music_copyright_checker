import { useMutation } from "react-query"
import { loginUser } from "../services/loginUser"
import { useState } from "react"
import { schema } from "../schema/loginSchema"
import { typeToFlattenedError } from "zod"
import { toast } from "react-toastify"
import { AxiosError } from "axios"

function LoginModal() {
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [error, setError] = useState<typeToFlattenedError<{ email: string; password: string; }, string>>()

    const mutation = useMutation(loginUser, {
        onSuccess: (data) => {
          toast('sign in successful')
          localStorage.setItem('user', JSON.stringify(data))
        //   @ts-ignore
          document.getElementById('login')?.close()
        },
        onError: (error: AxiosError) => {
            let message = 'sign in failed'
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
            password
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

      const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
      }
    
  return (
    <dialog id="login" className="modal">
        <form onSubmit={onSubmit} className="modal-box flex flex-col gap-5">
            <h3 className="font-bold text-2xl text-[#3A6AF1] ">Login!</h3>
            <div className='flex flex-col gap-3'>
                <label htmlFor="email" className='flex flex-col gap-2'>
                    <p>Email Address</p>
                    <input type="text" id="email" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={email} onChange={handleEmailChange} />
                    <span className="block text-red-500 text-sm">{error?.fieldErrors?.email?.[0]}</span>
                </label>
                <label htmlFor="password" className='flex flex-col gap-2'>
                    <p>Password</p>
                    <input type="password" id="password" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={password} onChange={handlePasswordChange} />
                    <span className="block text-red-500 text-sm">{error?.fieldErrors?.password?.[0]}</span>
                </label>

                <button className='btn bg-[#24C9EF] hover:bg-[#3484F0] text-black hover:text-white' disabled={mutation.isLoading}>
                    <p>login</p>
                    {
                        mutation.isLoading ?
                        <span className="loading loading-spinner text-accent"></span> :
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-arrow-right-circle"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
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

export default LoginModal