"use client"
import { signOut, useSession } from "next-auth/react";
import Link from "next/link"
import { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import Router from "next/router";
import { useRouter } from "next/navigation";

const  Navbar = () =>{
    const { data: session } = useSession();
    const router = useRouter();

    const [isOpen,setIsOpen] = useState(false);
    const handleClick = () => setIsOpen((prev) => !prev);

    

     const handleAuthToggle = async () => {
    if (session) {
      await signOut({ redirect: false });
      router.push("/"); 
    } else {
      router.push("/login");
    }
    };
    console.log(session);
    
    return (
        <div className=" w-full bg-black text-white flex items-center justify-between z-30 left-0 right-0">
            
            <div className="py-2 p-3 text-3xl">
                <Link href="/">
                Movement</Link>
            </div>

            <div className="">
            <div  className=" items-center gap-4  hidden md:block ">
                 <Link href="/about" className="px-3 py-2 hover:bg-red-600 transition-all">
                About
                </Link>  
                
                <Link href="/test" className="px-3 py-2 hover:bg-red-600 transition-all">
                Testimonials
                </Link>
                
                <Link href="/price" className="px-3 py-2 hover:bg-red-600 transition-all">
                Prices
                </Link>

                <Link href="/contacts" className="px-3 py-2 hover:bg-red-600 transition-all">
                Contacts
                </Link>
             {session?.user ? (
                <button onClick={handleAuthToggle} className="cursor-pointer ">LogOut</button> ) : ( 
                <>
                   <Link href="/login" className="px-3 py-2 hover:bg-red-600 transition-all">
                Log In
                </Link>
                <Link href="/register" className="px-3 py-2 hover:bg-red-600 transition-all">
                Register
                </Link>
             </>
             )}
            </div>

       {/* Mobile menu */}

      <div>
        <button onClick={handleClick} className="md:hidden p-3">
          {isOpen? (<MdOutlineCancel size={25} />) : (<CiMenuFries size={25} />) }
            </button>
        </div>
       {isOpen&&
            <div  className=" flex items-center gap-4 absolute z-10 right-0 w-full justify-center flex-col bg-black/35 text-white top-14">
                <Link href="/schedule" className="px-3 py-2">
                Schedule
                </Link>    
                <Link href="/test" className="px-3 py-2">
                Testimonials
                </Link>
                <Link href="/price" className="px-3 py-2">
                Pricing
                </Link>
                <Link href="/login" className="px-3 py-2">
                Log In
                </Link>
                {session?.user &&
                <button onClick={handleAuthToggle} className="cursor-pointer ">LogOut</button>}
            </div>
            }
             </div>
        </div>
    )
}
export default Navbar