import Image from "next/image";
import React from "react";
import { TbArrowsCross } from "react-icons/tb";
const GroupMembers = () => {
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
              <td>Muhammad Hilmi Bin Kamarul Azmi</td>
              <td>01DDT20F1122</td>
              <td>Front-End Development</td>
              <td>
                <div className="flex flex-row-reverse ">Edit</div>
              </td>
            </tr>
            <tr>
              <th>2</th>
              <td><TbArrowsCross/></td>
              <td><TbArrowsCross/></td>
              <td><TbArrowsCross/></td>
              <td>
                <div className="flex flex-row-reverse ">Edit</div>
              </td>
            </tr>
            <tr>
              <th>3</th>
              <td><TbArrowsCross/></td>
              <td><TbArrowsCross/></td>
              <td><TbArrowsCross/></td>
              <td>
                <div className="flex flex-row-reverse ">Edit</div>
              </td>
            </tr>
            <tr>
              <th>4</th>
              <td><TbArrowsCross/></td>
              <td><TbArrowsCross/></td>
              <td><TbArrowsCross/></td>
              <td>
                <div className="flex flex-row-reverse ">Edit</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupMembers;
