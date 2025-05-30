import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-emerald-500 font-semibold'>
        <p>CONTACT <span className='text-gray-700'>US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-12 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="About Image" />
        <div className='flex flex-col justify-center items-start gap-6 text-gray-600'>
          <p className='font-semibold text-lg text-emerald-500'>OUR OFFICE</p>
          <p>Willms Station <br /> Suite 000, Washington, USA</p>
          <p className='text-gray-900'>Tel: +1-(123) 456-789 <br /> Email: quickclinic@care.com</p>
          <p className='font-semibold text-lg text-emerald-500'>CAREERS AT QUICKCLINIC</p>
          <p>Learn more about our teams and job openings.</p>
          <button className='border border-emerald-400 px-8 py-4 text-sm hover:bg-emerald-500 hover:text-white transition-all duration-300 cursor-pointer'>
            Explore Us
          </button>
        </div>
      </div>
    </div>
  )
}

export default Contact