"use client"
import React from 'react'
import { Carousel } from 'flowbite-react';


const ComponentCarousel = () => {
  return (
   <>
   <div className="carousel w-full">
  <div id="slide1" className="carousel-item relative w-full">
    <img src="https://placehold.co/600x300/png" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide4" className="btn btn-circle">❮</a> 
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
    <div className="absolute top-2 right-2">
            <button className="btn btn-xs">Download</button>
          </div>
  </div> 
  <div id="slide2" className="carousel-item relative w-full">
    <img src="https://placehold.co/600x300/png" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" className="btn btn-circle">❮</a> 
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
    <div className="absolute top-2 right-2">
            <button className="btn btn-xs">Download</button>
          </div>
  </div> 
  <div id="slide3" className="carousel-item relative w-full">
    <img src="https://placehold.co/600x300/png" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle">❮</a> 
      <a href="#slide4" className="btn btn-circle">❯</a>
    </div>
    <div className="absolute top-2 right-2">
            <button className="btn btn-xs">Download</button>
          </div>
  </div> 
  <div id="slide4" className="carousel-item relative w-full">
    <img src="https://placehold.co/600x300/png" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide3" className="btn btn-circle">❮</a> 
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
    <div className="absolute top-2 right-2">
            <button className="btn btn-xs">Download</button>
          </div>
  </div>
</div>
   </>
  )
}

export default ComponentCarousel