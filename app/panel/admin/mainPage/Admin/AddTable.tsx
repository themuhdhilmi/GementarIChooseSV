'use client'

import { breakpoints } from '@/app/config/breakpoints';
import React from 'react'
import { useMediaQuery } from 'usehooks-ts';

const AddTable = (props: any) => {
    const isTablet = useMediaQuery(`(max-width: ${breakpoints.tablet})`);

    return (
        <>
        </>
    )
}

export default AddTable