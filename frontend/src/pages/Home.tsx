import MessageContainer from "../components/MessageContainer"
import Sidebar from "../components/Sidebar"


function Home(){
    return(
        <>  <div className=" flex flex-col relative">
            <div className="flex h-[80vh] w-full md:max-w-screen-md md:h-[550px] rounded-lg overflow-hidden  bg-opacity-25 backdrop-filter backdrop-blur-lg text-white ">
                <Sidebar/>
                <MessageContainer/>


            </div>
           
            </div>

        
        </>
    )
}

export default Home