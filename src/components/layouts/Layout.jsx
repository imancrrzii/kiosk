import { Outlet } from "react-router-dom";
import Header from "./Header"


const Layout = () => {
  return (
    <div className="relative flex min-h-screen max-w-screen bg-gray-50">
      
    
      <div
        className="flex flex-col flex-1 min-h-screen bg-gray-50 transition-[margin] duration-300 overflow-x-hidden"
      >
        <Header />
        <main className="flex-1 bg-gray-50 pb-12">
          <div className="h-full w-full p-3 lg:pb-4 lg:pt-0 lg:px-4">
            <div className="w-full">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
      
    </div>
  );
};

export default Layout;