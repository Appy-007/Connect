import { CiLogout } from "react-icons/ci";
import useLogOut from "../hooks/useLogOut";

function Logout(){
    const {logout}=useLogOut()
    return(
        <>
        <div className="flex  mt-auto">
            <CiLogout className="text-2xl cursor-pointer" onClick={logout}/>
        </div>
        </>
    )
}

export default Logout