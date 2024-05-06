'use client'
import React, { useEffect, useRef, useState } from 'react'
// import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'
import { usePutSessions } from '@/app/utilities/storage/user/usePutSessions'
import { useGetsessions } from '@/app/utilities/storage/user/useGetSessions'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false
});


const Quill = (props : { initialValue : string, value : any, setValue : any, canEdit : boolean}) => {

  const modules = {
    toolbar: {
    container: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ]
  },
  }

  return (
    <div className="ql-editor">

      <ReactQuill modules={modules} theme="snow" value={props.value} onChange={props.setValue} />
    </div>
  )
}

export default Quill
