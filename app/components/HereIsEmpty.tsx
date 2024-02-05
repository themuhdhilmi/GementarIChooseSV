import React from "react";
import { VscEmptyWindow } from "react-icons/vsc";

const HereIsEmpty = () => {
  return (
    <div className="flex justify-center justify-items-center text-center min-h-0.5 w-full ">
      <div>
        <div className="flex justify-center justify-items-center w-full">
          <p className="text-9xl text-slate-400">
            <VscEmptyWindow />
          </p>
        </div>
        <div>
          <p className="pt-12">Empty section, please add some data.</p>
        </div>
      </div>
    </div>
  );
};

export default HereIsEmpty;
