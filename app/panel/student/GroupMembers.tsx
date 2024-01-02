import Image from "next/image";
import React from "react";
import { TbArrowsCross } from "react-icons/tb";
import ModalEditGroupMembers from "./ModelEditGroupMembers";
import { IoEye } from "react-icons/io5";
import { useMediaQuery } from "usehooks-ts";
import { breakpoints } from "@/app/config/breakpoints";
const GroupMembers = () => {
  const isTablet = useMediaQuery(`(max-width: ${breakpoints.tablet})`);
  return (
    <div className="stats shadow w-full">
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Matric No</th>
              <th>Duty</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td><TbArrowsCross/></td>
              <td><TbArrowsCross/></td>
              <td><TbArrowsCross/></td>
              <td>
                <div className="flex flex-row-reverse ">
                  {!isTablet ? (
                    ""
                  ) : (
                    <div className="px-5">
                      <IoEye />
                    </div>
                  )}

                  <ModalEditGroupMembers />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupMembers;
