import Image from "next/image"
import Link from "next/link"

const  Homepage = () =>{
    return (
        <div>
              <div className="relative h-screen w-full flex items-center justify-center ">
                <Image 
                src="/fitness.jpg" 
                alt="Background"
                fill
                style={{objectFit: "cover"}}
                />

              <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative items-center justify-center text-amber-50">
            <h1 className="text-amber-50 font-semibold text-sm mb-4">FITNESS</h1>
            <h2 className="text-5xl font-bold mb-8">STUDIO BOUTIQUE</h2>

           <Link href="/login"> <button className="text-white bg-teal-500 font-bold hover:bg-teal-200 rounded-full px-6 py-2 items-center justify-center">
            GetStarted</button></Link>
            </div>

        </div>
        </div>
    )
}
export default Homepage