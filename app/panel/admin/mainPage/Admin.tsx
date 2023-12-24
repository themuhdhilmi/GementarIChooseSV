'use client'
import { breakpoints } from '@/app/config/breakpoints'
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { RxCross2 } from "react-icons/rx";
import EditTable from './Admin/EditTable';
import MainTable from './Admin/MainTable';

const Admin = () => {

    const isTablet = useMediaQuery(`(max-width: ${breakpoints.tablet})`);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetch('/api/v1/AUTH/manageUser/admin')
            .then((res) => res.json())
            .then((data) => {
                setAdminData(data)
                setLoading(false)
            })
    }, [])

    const [adminData, setAdminData] = useState(null)
    const [isLoading, setLoading] = useState(true)

    if (isLoading) {
        return (
            <div className='p-5'>
            <div>
                <div className="flex flex-col gap-4 w-full">
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-32 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                </div>
            </div>
        </div>
        )
    }


    if (!adminData) return <p>No profile data</p>

    return (
        <>
            {isEditing ?
                <EditTable setIsEditing={setIsEditing}/>
                :
                <MainTable setIsEditing={setIsEditing}/>
            }</>
    )
}

export default Admin