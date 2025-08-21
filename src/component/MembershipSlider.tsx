"use client"

import { title } from 'process';
import { FaCheck } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import 'swiper/css'
import { Pagination } from 'swiper/modules'; 
import { Swiper, SwiperSlide } from 'swiper/react';

const MembershipData = [ {
    title: 'Standard',
    price: '20$',
    benefits: [
        {
            icon: FaCheck,
            text: 'include membership',
        },
         {
            icon: FaCheck,
            text: 'Access to all facilities',
        },
         {
            icon: MdClose,
            text: 'Diet plan included',
        },
         {
            icon: FaCheck,
            text: 'Health and fitness tips',
        },
         {
            icon: FaCheck,
            text: 'Monday-friday gym access',
        },
         {
            icon: FaCheck,
            text: 'Full access to everyThing',
        },
         {
            icon: FaCheck,
            text: 'No additional amenities',
        },
    ]
 },
   {
    title: 'Ulitimate',
    price: '45$',
    benefits: [
        {
            icon: FaCheck,
            text: 'include membership',
        },
         {
            icon: FaCheck,
            text: 'Access to all facilities',
        },
         {
            icon: FaCheck,
            text: 'Diet plan included',
        },
         {
            icon: FaCheck,
            text: 'Health and fitness tips',
        },
         {
            icon: FaCheck,
            text: 'Monday-friday gym access',
        },
         {
            icon: FaCheck,
            text: 'Full access to everyThing',
        },
         {
            icon: FaCheck,
            text: 'No additional amenities',
        },
    ]
 },
     {
    title: 'Professional',
    price: '60$',
    benefits: [
        {
            icon: FaCheck,
            text: 'include membership',
        },
         {
            icon: FaCheck,
            text: 'Access to all facilities',
        },
         {
            icon: FaCheck,
            text: 'Diet plan included',
        },
         {
            icon: FaCheck,
            text: 'Health and fitness tips',
        },
         {
            icon: FaCheck,
            text: 'Monday-friday gym access',
        },
         {
            icon: FaCheck,
            text: 'Full access to everyThing',
        },
         {
            icon: FaCheck,
            text: 'No additional amenities',
        },
    ]
 },
];

const  MembershipSlider = () =>{
    return (
        <Swiper 
        slidesPerView={1} 
        modules={[Pagination]} 
        pagination {...{ 
            clickable: true}}
            breakpoints={{
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
            }}
            className='min-h-[680px]'
        >
            {MembershipData.map((item, index) =>{
               return <SwiperSlide key={index}>
                <div className='border border-red-600 hover:bg-black/30 transition duration-300 w-full mx-3 my-3 max-w-sm
                xl:max-w-none  '>
                    <div className='py-5 px-3 border-b border-red-500'>
                        <h3 className='text-4xl'>{item.title}</h3>
                    </div>
                   <div className=' py-8 px-5'>
                    <ul>
                    {item.benefits.map((item, index) =>{
                        return <li key={index} >
                            <item.icon className='text-red-500 text-lg'/>
                            (item.text)</li>
                    })}
                    </ul>
                    </div>  
                </div>
               </SwiperSlide>
            })}
        </Swiper>
    )
}
export default MembershipSlider