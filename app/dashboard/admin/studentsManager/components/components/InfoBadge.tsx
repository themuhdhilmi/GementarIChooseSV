import React from 'react'

const InfoBadge = (props : any) => {
  return (
    <div>
    <div className="badge badge-neutral">[{props.path}] {props.title}</div>
    <div className="badge badge-outline">{props.value}</div>
  </div>
  )
}

export default InfoBadge