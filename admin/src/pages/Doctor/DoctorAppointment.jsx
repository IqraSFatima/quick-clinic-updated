import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointment = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='text-lg font-medium mb-3 text-emerald-500'>All Appointments</p>
      <div className='bg-white border border-gray-100 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_2fr_2fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-gray-200'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fee</p>
          <p>Action</p>
        </div>

        {
          appointments.reverse().map((item, index) => (
            <div key={index} className='flex flex-wrap justify-between max-sm:gap-2 max-sm:text-base sm:grid sm:grid-cols-[0.5fr_3fr_2fr_2fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b border-gray-200 hover:bg-gray-50 transition-all duration-300'>
              <p className='max-sm:hidden'>{index + 1}</p>
              <div className='flex items-center gap-2'>
                <img src={item.userData.image} className='w-8 rounded-full' />
                <p>{item.userData.name}</p>
              </div>
              <div>
                <p className='text-xs inline border border-emerald-400 px-2 rounded-full'>
                  {item.payment ? 'Online' : 'Cash'}
                </p>
              </div>
              <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <p>{currency} {item.amount}</p>
              {
                item.canceled
                  ? <p className='text-red-400 text-sm font-medium'>Cancelled</p>
                  : item.isCompleted ?
                    <p className='text-emerald-500 text-sm font-medium'>Completed</p>
                    : <div className='flex'>
                      <img onClick={() => cancelAppointment(item._id)} src={assets.cancel_icon} className='w-10 cursor-pointer' />
                      <img onClick={() => completeAppointment(item._id)} src={assets.tick_icon} className='w-10 cursor-pointer' />
                    </div>
              }
            </div>

          ))
        }

      </div>
    </div>
  )
}

export default DoctorAppointment