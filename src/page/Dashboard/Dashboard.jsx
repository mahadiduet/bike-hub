import { useState } from "react";
import Leftnavbar from "../../component/dashboard/Leftnavbar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
    const [open, isOpen] = useState(false);
    return (
        <div>
            <div className="">
                
                <div
                    className="z-10 w-full p-3 block fixed left-0 top-0 lg:hidden bg-[#18181F] border-b border-blue-950"
                    onClick={() => isOpen(!open)}
                >
                    {!open ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className={`size-6 text-white cursor-pointer`}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 text-white cursor-pointer hover:text-red-700 transition-colors"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </svg>
                    )}
                </div>

                <div
                    className={`block overflow-y-auto h-0 mt-10 lg:fixed w-full lg:w-64 lg:left-0 lg:top-0  z-20 lg:mt-0 top-12 lg:h-screen  p-0  ${open ? "h-52" : "h-0"
                        } `}
                >
                    <Leftnavbar />
                </div>

                <div className={`ml-0 lg:ml-64`}>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;