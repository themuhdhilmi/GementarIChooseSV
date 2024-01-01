"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { Interface } from "readline";

const Header = () => {
  const session = useSession();

  function checkIfAvailable() {
    //   if (session.status === "unauthenticated") {
    //     router.push("/api/auth/signin");
    //   }

    if (session.status === "unauthenticated") {
      return false;
    }
    return true;
  }

  if (session.status === "loading") {
    return null; // You can also render a loading indicator here if needed
  }

  return (
    <div
      // className={`navbar bg-base-100 ${
      //   checkIfAvailable() ? "block" : "hidden"
      // } shadow-md`}

      className={`navbar bg-base-100 ${true ? "" : "hidden"} shadow-md`}
    >
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">iChooseSV</a>
      </div>
      <div className="flex-none">
        {/* <ul className="menu menu-horizontal px-1">
          <li>
            <a>Link</a>
          </li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2 bg-base-100 rounded-t-none">
                <li>
                  <a>Link 1</a>
                </li>
                <li>
                  <a>Link 2</a>
                </li>
              </ul>
            </details>
          </li>
        </ul> */}

        <button className="btn btn-neutral hover:btn-error">GEMENTAR TEAM ACADEMY</button>
      </div>
    </div>
  );
};

export default Header;
