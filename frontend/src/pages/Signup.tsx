import { useState,ChangeEvent } from "react"
import { Link } from "react-router-dom"
import useSignUp from "../hooks/useSignUp"

function Signup(){
    const [signupform,setSignupform]=useState({
        fullname:"",
        username:"",
        password:"",
        confirmPassword:"",
        gender:"",
    })

    const {signup,loading}=useSignUp()

    const handlegenderchange=(e: ChangeEvent<HTMLInputElement>)=>{
        setSignupform({
            ...signupform,
            gender:e.target.value,
        })

    }

    const handleSubmit=(e:React.FormEvent)=>{
        e.preventDefault()
        signup(signupform)

    }
    return(
        <>
        <div className="flex flex-col justify-center items-center min-w-96 mx-auto ">
        <div className=" w-auto md:min-w-96 p-6 bg-opacity-25 backdrop-filter backdrop-blur-lg text-white">
            <h1 className="text-2xl text-center font-bold">Sign Up <span className="text-blue-600">Connect</span> </h1>
            <form action="" className="flex flex-col gap-2 justify-center" onSubmit={handleSubmit}>
            <div className="flex flex-col px-2 ">
                    <label htmlFor="fullname" className="">Full Name</label>
                    <input type="text" className="w-full py-2 px-4 rounded-md bg-gray-800 mt-1" placeholder="Enter fullname" value={signupform.fullname}
                    onChange={(e)=>setSignupform({...signupform,fullname:e.target.value})} />
                </div>
                <div className="flex flex-col px-2 ">
                    <label htmlFor="username" className="">Username</label>
                    <input type="text" className="w-full py-2 px-4 rounded-md bg-gray-800 mt-1" placeholder="Enter username" value={signupform.username}
                    onChange={(e)=>setSignupform({...signupform,username:e.target.value})} />
                </div>
                <div className="flex flex-col px-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="w-full py-2 px-4 rounded-md bg-gray-800 mt-1" placeholder="Enter password" value={signupform.password} 
                    onChange={(e)=>setSignupform({...signupform,password:e.target.value})}/>
                </div>
                <div className="flex flex-col px-2">
                    <label htmlFor="confirmpassword">Confirm Password</label>
                    <input type="password" className="w-full py-2 px-4 rounded-md bg-gray-800 mt-1" placeholder="Re-Enter password" value={signupform.confirmPassword} 
                    onChange={(e)=>setSignupform({...signupform,confirmPassword:e.target.value})}/>
                </div>

                <div className="flex gap-2 px-2">
                    <div className="">
                        <label htmlFor="" className=" pr-1">Male</label>
                        <input type="checkbox" className="border-slate-900 cursor-pointer" value="male"  checked={signupform.gender==='male'} onChange={handlegenderchange} />
                    </div>
                    <div className="">
                        <label htmlFor="" className=" pr-1">Female</label>
                        <input type="checkbox" className="border-slate-900 cursor-pointer" value="female" checked={signupform.gender==='female'} onChange={handlegenderchange}  />
                    </div>
                </div>

                
                <Link to={'/login'} className="cursor-pointer text-sm pl-1 hover:text-blue-600" >Already have an account?</Link>

                <div>
                    <button  className="w-full py-2 px-4 rounded-md bg-gray-800 cursor-pointer hover:text-blue-600" disabled={loading}>{loading?"Loading ..." :"Signup"}</button>
                </div>

            </form>
        </div>
        </div>
        </>
    )
}

export default Signup