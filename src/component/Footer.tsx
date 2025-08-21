import Link from "next/link"

const  Footer = () =>{
    return (
      <div className=" bg-black/60 text-white flex items-center justify-between h-12">
             <Link href="/" className="font-bold text-xl"> STUDIO BOUTIQUE</Link>
             <p> ALL RIGHTS @RESERVED </p>
      </div>
    )
}
export default Footer