import React from "react";
import CompletionLine from "./CompletionLine";
import SesiTrack from "./SesiTrack";
import FypTitle from "./FypTitle";
import GroupMembers from "./GroupMembers";
import Complete from "./Complete";
import ChooseSv from "./ChooseSv";

const Student = () => {
  return (
    <div className="p-5">
      {/* <Complete /> */}

      <div className="py-2 grid grid-cols-4 grid-rows-1 gap-4 w-full">
        <div className="lg:col-span-4 col-span-4  p-1">
          <div className="badge">Progress</div>
          <div>
            <CompletionLine />
          </div>
        </div>
        <div className="lg:col-span-4 col-span-4 p-1">
          <div className="badge">Student Information</div>
          <div>
            <SesiTrack />
          </div>
        </div>
      </div>

      <div className="py-2 grid grid-cols-4 grid-rows-1 gap-4 w-full">
        <div className="lg:col-span-4 col-span-4  p-1">
          <div className="badge badge-neutral">STEP 1</div>
          <div className="badge">Group Members</div>
          <div>
            <GroupMembers />
          </div>
        </div>
        <div className="lg:col-span-4 col-span-4 p-1">
        <div className="badge badge-neutral">STEP 2</div>
          <div className="badge">FYP Projects</div>
          <div>
            <FypTitle />
          </div>
        </div>

        <div className="lg:col-span-4 col-span-4 p-1">
        <div className="badge badge-neutral">STEP 3</div>
          <div className="badge">Choose Your SV</div>
          <div>
            <ChooseSv />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
