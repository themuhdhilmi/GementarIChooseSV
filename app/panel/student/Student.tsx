import React from "react";
import CompletionLine from "./CompletionLine";
import SesiTrack from "./SesiTrack";
import FypTitle from "./FypTitle";
import GroupMembers from "./GroupMembers";
import Complete from "./Complete";
import ChooseSv from "./ChooseSv";
import { FaLock } from "react-icons/fa";
import Decline from "./Decline";
import { useMediaQuery } from "usehooks-ts";
import { breakpoints } from "@/app/config/breakpoints";
const Student = () => {
  const isTablet = useMediaQuery(`(max-width: ${breakpoints.tablet})`);
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`);
  return (
    <div className={`py-5 ${isTablet ? 'p-5' : isDesktop ? 'p-24' : 'p-40'}`}>
      <Complete />
      <Decline/>

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

        <div className="lg:col-span-4 col-span-4 p-1">
          <div className="badge badge-neutral">STEP 4</div>
          <div className="badge">Review submission</div>
          <div>
            <div className="stats align-middle shadow w-full justify-center flex h-10">
              <div className="flex p-2 space-x-2">
                <div>
                  <FaLock />
                </div>
                <div>Complete all Steps</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-5">
        <div>developed by Gementar Team</div>
      </div>
    </div>
  );
};

export default Student;
