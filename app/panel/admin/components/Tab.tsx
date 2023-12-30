'use client'
import React from 'react'
import { PageAdmin } from '../page'

const Tab = (props : any) => {
  return (
    <div role="tablist" className="tabs tabs-bordered">
    <a onClick={() => props.setPageAdmin(PageAdmin.Admin)} role='tab' className={`tab ${props.PageAdmin === PageAdmin.Admin ? "tab-active" : ""}`}>Admin</a>
    <a onClick={() => props.setPageAdmin(PageAdmin.Student)} role='tab' className={`tab ${props.PageAdmin === PageAdmin.Student ? "tab-active" : ""}`}>Student</a>
    <a onClick={() => props.setPageAdmin(PageAdmin.Lecturer)} role='tab' className={`tab ${props.PageAdmin === PageAdmin.Lecturer ? "tab-active" : ""}`}>Lecturer</a>
    <a onClick={() => props.setPageAdmin(PageAdmin.Global)} role='tab' className={`tab ${props.PageAdmin === PageAdmin.Global ? "tab-active" : ""}`}>Global</a>
</div>
  )
}

export default Tab