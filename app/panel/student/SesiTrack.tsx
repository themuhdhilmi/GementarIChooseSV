import React from "react";

const SesiTrack = () => {
  return (
    <div className="stats stats-vertical md:stats-horizontal shadow w-full">
      <div className="stat place-items-center w-ful bg-slate-700">
        <div className="stat-title text-center text-white">Group Leader</div>
        <div className=" text-pretty text-center text-white">Muhammad Hilmi Bin Kamarul Azmi</div>
        <div className=" text-pretty text-center text-white">01DDT20F1122</div>
        {/* <div className="stat-desc">From January 1st to February 1st</div> */}
      </div>

      <div className="stat place-items-center w-full">
        <div className="stat-title text-center">Session</div>
        <div className=" text-pretty text-center">SESI 2 2023/2024</div>
        {/* <div className="stat-desc">From January 1st to February 1st</div> */}
      </div>

      <div className="stat place-items-center w-full">
        <div className="stat-title text-center">Track</div>
        <div className=" text-pretty text-center">
          Software And Application Development
        </div>
        {/* <div className="stat-desc">From January 1st to February 1st</div> */}
      </div>
    </div>
  );
};

export default SesiTrack;
