import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fee: profileData.fee,
        available: profileData.available,
      }

      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } });
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken])

  return profileData && (
    <div className='flex flex-col gap-4 m-5'>
      <div>
        <div>
          <img src={profileData.image} className='bg-emerald-500 w-40 sm:max-w-64 rounded-lg' />
        </div>

        <div className='flex-1 border border-gray-100 rounded-lg p-8 py-7 mt-4 bg-white'>
          {/* Doctor's Information */}
          <p className='flex items-center gap-2 text-2xl md:text-3xl font-medium text-emerald-500'>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-1 text-center'>
            <p className='text-xs md:text-sm'>{profileData.degree} - {profileData.speciality}</p>
            <button className='py-0.5 px-2 border border-emerald-400 text-xs rounded-full'>{profileData.experience}</button>
          </div>

          {/* Doctor's About */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About:</p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{profileData.about}</p>
          </div>

          <p className='text-gray-600 font-medium mt-4'>Appointment Fee: <span className='text-gray-800'>{currency} {isEdit ? <input className='bg-gray-200' type="number" onChange={(e) => setProfileData(prev => ({ ...prev, fee: e.target.value }))} value={profileData.fee} /> : profileData.fee}</span></p>

          <div className='flex items-start gap-2 py-2'>
            <p>Address:</p>
            <p className='text-sm'>
              {isEdit ? <input className='bg-gray-200' type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} /> : profileData.address.line1}
              <br />
              {isEdit ? <input className='bg-gray-200' type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} /> : profileData.address.line2}
            </p>
          </div>

          <div className='flex gap-2 pt-2'>
            <input onChange={(e) => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} type="checkbox" id='available' />
            <label htmlFor="available">Available</label>
          </div>

          {
            isEdit ? <button onClick={updateProfile} className='px-4 py-2 border border-emerald-400 text-sm font-medium rounded-full mt-5 cursor-pointer hover:bg-emerald-500 hover:text-white transition-all duration-300'>Save Details</button>
              : <button onClick={() => setIsEdit(true)} className='px-4 py-2 border border-emerald-400 text-sm font-medium rounded-full mt-5 cursor-pointer hover:bg-emerald-500 hover:text-white transition-all duration-300'>Edit Details</button>
          }
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile