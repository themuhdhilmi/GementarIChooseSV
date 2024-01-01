import Image from "next/image";
import React from "react";
import { TbArrowsCross } from "react-icons/tb";
import ModalEditFyp from "./ModalEditFyp";
import { useMediaQuery } from "usehooks-ts";
import { breakpoints } from "@/app/config/breakpoints";
import { IoEye } from "react-icons/io5";

const FypTitle = () => {
  const isTablet = useMediaQuery(`(max-width: ${breakpoints.tablet})`);
  return (
    <div className="stats shadow w-full">
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              {isTablet ? "" : <th></th>}
              {isTablet ? <th>Final Year Project</th> : <th>title</th>}

              {isTablet ? "" : <th>category</th>}
              {isTablet ? "" : <th>poster</th>}
            </tr>
          </thead>
          <tbody>
            <tr>
              {isTablet ? "" : <th>1</th>}
              <td>
                <p className=" break-all">
                  Tour Puo V2 Virtual Tour In Politeknik Ungku Omar
                </p>
              </td>
              {isTablet ? (
                ""
              ) : (
                <td>
                  <TbArrowsCross />
                </td>
              )}
              {isTablet ? (
                ""
              ) : (
                <td>
                  <TbArrowsCross />
                </td>
              )}
              <td>
                <div className="flex flex-row-reverse ">
                  {!isTablet ? (
                    ""
                  ) : (
                    <div className="px-5">
                      <IoEye />
                    </div>
                  )}

                  <ModalEditFyp />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FypTitle;
