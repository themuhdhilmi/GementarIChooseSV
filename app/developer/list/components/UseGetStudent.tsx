import Link from "next/link";
import React from "react";

const UseGetStudent = (props: any) => {
  return (
    <div className="mb-5">
      <div className="stats shadow"></div>
      <div className="justify-center px-4  border rounded-lg  bg-white shadow-lg">
        <div className="overflow-x-auto">
          <div className="flex flex-row py-5">
            <div className="w-1/2 font-medium ">
              <p className="underline decoration-1">Students Info</p>
            </div>
            <div className="flex gap-2 py-1 flex-row-reverse w-1/2">
              <button
                onClick={props.funcCloseAll}
                className="btn btn-sm bg-red-600 rounded-lg hover:bg-red-800 text-white"
              >
                CLOSE
              </button>
            </div>
          </div>

          <div className="card min-w-full bg-slate-300 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Leader</h2>
              <p>MUHAMMAD HILMI BIN KAMARUL AZMI BIN AZMAN AL-HUSSEIN</p>
              <p>01DDT20F1122</p>
            </div>
          </div>

          <div className="card min-w-full bg-slate-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Status</h2>
              <p>INCOMPLETE</p>
            </div>
          </div>

          <div className="card min-w-full bg-slate-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Team Member Quota</h2>
              <p>Global Value</p>
            </div>
          </div>

          <div className="card min-w-full bg-slate-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Team Members</h2>
              <p>MUHAMMAD HILMI BIN KAMARUL AZMI BIN AZMAN AL-HUSSEIN</p>
              <p>01DDT20F1122</p>
              <p>MUHAMMAD HILMI BIN KAMARUL AZMI BIN AZMAN AL-HUSSEIN</p>
              <p>01DDT20F1122</p>
              <p>MUHAMMAD HILMI BIN KAMARUL AZMI BIN AZMAN AL-HUSSEIN</p>
              <p>01DDT20F1122</p>
              <p>MUHAMMAD HILMI BIN KAMARUL AZMI BIN AZMAN AL-HUSSEIN</p>
              <p>01DDT20F1122</p>
            </div>
          </div>

          <div className="card min-w-full bg-slate-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Poster</h2>
              <Link href={'/test'} className="text-blue-600">Poster 1</Link>
              <Link href={'/test'} className="text-blue-600">Poster 2</Link>
              <Link href={'/test'} className="text-blue-600">Poster 3</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UseGetStudent;
