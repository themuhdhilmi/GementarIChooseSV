"use client";
import { breakpoints } from "@/app/config/breakpoints";
import React from "react";
import { useMediaQuery } from "usehooks-ts";

const Page = () => {
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`);

  return (
    <div className={`${isDesktop ? "px-6" : "px-24"}`}>
      <div className="stats shadow"></div>
      <div className="justify-center px-4  border rounded-lg  bg-white shadow-lg">
        <div className="overflow-x-auto">
          <div className="flex flex-row py-5">
            <div className="w-1/2 font-medium ">
              <p className="underline decoration-1">Profile Settings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
