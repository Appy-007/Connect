import { Link } from "react-router-dom"
import { useState } from "react"
import useLogin from "../hooks/useLogin"

function Login(){
    const [loginform,setLoginform]=useState({
        username:"",
        password:"",
    })

    const {login,loading}=useLogin()

    const handleSubmit=(e:React.FormEvent)=>{
        e.preventDefault()
        login(loginform)

    }
    return(
        <>
        <div className="flex flex-col justify-center items-center min-w-96 mx-auto ">
        <div className=" w-auto md:min-w-96 p-6 bg-opacity-25 backdrop-filter backdrop-blur-lg text-white">
            <h1 className="text-2xl text-center font-bold">Login <span className="text-blue-600">Connect</span> </h1>
            <form action="" className="flex flex-col gap-2 justify-center" onSubmit={handleSubmit}>
                <div className="flex flex-col px-2 ">
                    <label htmlFor="" className="">Username</label>
                    <input type="text" className="w-full py-2 px-4 rounded-md bg-gray-800 mt-1" placeholder="Enter username" value={loginform.username} onChange={(e)=>setLoginform({...loginform,username:e.target.value})} />
                </div>
                <div className="flex flex-col px-2">
                    <label htmlFor="">Password</label>
                    <input type="password" className="w-full py-2 px-4 rounded-md bg-gray-800 mt-1" placeholder="Enter password" value={loginform.password}  onChange={(e)=>setLoginform({...loginform,password:e.target.value})} />
                </div>

                <Link to={'/signup'} className="cursor-pointer text-sm pl-1 hover:text-blue-600" >{"Don't"} have an account?</Link>

                <div>
                    <button  className="w-full py-2 px-4 rounded-md bg-gray-800 cursor-pointer hover:text-blue-600" disabled={loading}>{loading ? "login in...." :"Login"}</button>
                </div>

            </form>
        </div>
        </div>
        
        </>
    )
}

export default Login