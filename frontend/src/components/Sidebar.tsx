
import Conversations from "./Conversations"
import Logout from "./Logout"
import Searchbar from "./Searchbar"

function Sidebar(){
    return(
        <>
        <div className="border-r border-slate-500 p-1 md:p-4 flex flex-col w-44 md:w-1/2">
            <Searchbar/>
            <Conversations/>
            <Logout/>
            
        </div>
        </>
    )
}

export default Sidebar