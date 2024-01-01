import React from "react";

const SesiTrack = () => {
  return (
    <div className="stats stats-vertical md:stats-horizontal shadow w-full">
      <div className="stat place-items-center w-full">
        <div className="stat-title">Session</div>
        <div className=" text-pretty">SESI 2 2023/2024</div>
        {/* <div className="stat-desc">From January 1st to February 1st</div> */}
      </div>

      <div className="stat place-items-center w-full">
        <div className="stat-title">Track</div>
        <div className=" text-pretty">
          Software And Application Development
        </div>
        {/* <div className="stat-desc">From January 1st to February 1st</div> */}
      </div>
    </div>
  );
};

export default SesiTrack;
