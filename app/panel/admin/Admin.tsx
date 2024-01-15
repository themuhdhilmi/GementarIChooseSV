import React from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { FiFolderPlus } from "react-icons/fi";
const Admin = () => {
  return (
    <div className="p-5">

<div className="flex flex-wrap justify-end gap-2 ">
<div className="tooltip tooltip-bottom" data-tip="add student"><FaRegPlusSquare /></div>
<div className="tooltip tooltip-bottom" data-tip="bulk add students"><FiFolderPlus /></div>
<label className="form-control w-full max-w-xs">
  <select className="select select-xs select-bordered">
    <option selected>SESI II 2024</option>
  </select>
</label>



</div>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Matric Number</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>
                <div>Muhammad Hilmi Bin Kamarul Azmi</div>
              </td>
              <td>01DDT20F1122</td>
              <td>REQUESTING</td>
              <td><IoEye/></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
