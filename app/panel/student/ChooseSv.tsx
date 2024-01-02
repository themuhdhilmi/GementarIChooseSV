import Image from "next/image";
import React from "react";
import { FaLock } from "react-icons/fa";

const ChooseSv = () => {
  return (
    <div>
      <div className="stats align-middle shadow w-full justify-center flex h-10">
        <div className="flex p-2 space-x-2">
          <div>
            <FaLock />
          </div>
          <div>Complete all Steps</div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>
                <label>1</label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <Image
                        src="/tailwind-css-component-profile-2@56w.png"
                        alt="Avatar Tailwind CSS Component"
                        width={50}
                        height={50}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">
                      Muhammad Hilmi Bin Kamarul Azmi
                    </div>
                    <div className="text-sm opacity-50">JTMK</div>
                  </div>
                </div>
              </td>
              <td>
                Software And Application Development
                <br />
                <span className="badge badge-ghost badge-sm">
                  Desktop Support Technician
                </span>
              </td>
              <th>
                <div className="flex font-normal flex-row-reverse ">
                <input type="checkbox" className="toggle toggle-success"/>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChooseSv;
