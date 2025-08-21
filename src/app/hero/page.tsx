"use client"
import HeroSlider from "@/component/HeroSlider"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

const  Hero = () =>{
// const {data: session} = useSession()
// if( !session?.user ) {
//     redirect("/login");
//  }

    return (
    <div className="">
      <div className="">
        <HeroSlider/>
      </div>
    </div>
    )
}
export default Hero