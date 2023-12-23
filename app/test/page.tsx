'use client'
import React from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { breakpoints } from '../config/breakpoints'

const page = () => {

    const isMobile = useMediaQuery(`(max-width: ${breakpoints.mobile})`)

    return (
        <div>You are on mobile? = {isMobile ? 'yes' : 'no'}</div>
    )
}

export default page