'use client'
import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";

const EditTable = (props : any) => {
  return (
    <div className='  bg-white bg-opacity-70 shadow-lg rounded-lg p-5 m-5'>
    <div className='flex '>
        <div className='flex-auto w-fit '>
            Edit Details
        </div>
        <div className="tooltip" data-tip="cancel">
            <button onClick={() => props.setIsEditing(false)} className="btn btn-circle btn-outline">
                <RxCross2 />
            </button>
        </div>
    </div>
    <div className='flex flex-wrap'>
        <div className='flex-auto w-fit px-2 '>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Name</span>
                    {/* <span className="label-text-alt">User Name</span> */}
                </div>
                <div className='flex'>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                    <button className="btn btn-square mx-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
            </label>
        </div>
        <div className='flex-auto w-fit  px-2'>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Email</span>
                    {/* <span className="label-text-alt">User Password</span> */}
                </div>
                <div className='flex'>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                    <button className="btn btn-square mx-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
            </label>
        </div>
        <div className='flex-auto w-fit  px-2'>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Password</span>
                    {/* <span className="label-text-alt">User Name</span> */}
                </div>
                <div className='flex'>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full" disabled />
                    <button className="btn btn-square mx-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
            </label>
        </div>
        <div className='flex-auto w-fit  px-2'>
            <div className="label">
                <span className="label-text"><br></br></span>
                {/* <span className="label-text-alt">User Name</span> */}
            </div>
            <button className="btn btn-wide w-full">Apply</button>
        </div>
    </div>

    <table className="table">
        {/* head */}
        <thead>
            <tr>
                <th>
                    <label>

                    </label>
                </th>
                <th>Name</th>
                <th>Role</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>
                    <label>
                        SELECTED
                    </label>
                </th>
                <td>
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <img src="https://picsum.photos/200" alt="Avatar Tailwind CSS Component" />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">Main Admin</div>
                            <div className="text-sm opacity-50">admin@gementar.com

                            </div>
                        </div>
                    </div>
                </td>
                <td>ADMIN</td>
            </tr>
        </tbody>
        {/* foot */}
        <tfoot>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Role</th>
                <th></th>
            </tr>
        </tfoot>

    </table>

</div>
  )
}

export default EditTable