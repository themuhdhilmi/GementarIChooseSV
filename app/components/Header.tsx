"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { Interface } from "readline";
import { useMediaQuery } from "usehooks-ts";
import { breakpoints } from "../config/breakpoints";
import { FaGear } from "react-icons/fa6";

const Header = () => {
  const session = useSession();
  const isTablet = useMediaQuery(`(max-width: ${breakpoints.tablet})`);

  function checkIfAvailable() {
    // if (session.status === "unauthenticated") {
    //   router.push("/api/auth/signin");
    // }

    if (session.status === "unauthenticated") {
      return false;
    }
    return true;
  }

  if (session.status === "loading") {
    return null; // You can also render a loading indicator here if needed
  }

  return (
    <>
      <div
        // className={`navbar bg-base-100 ${
        //   checkIfAvailable() ? "block" : "hidden"
        // } shadow-md`}

        className={`navbar bg-base-100 ${
          checkIfAvailable() ? "" : "hidden"
        } shadow-md`}
      >
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">iChooseSV</a>
        </div>
        <div className="flex-none z-50">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>Menu List</summary>
                <ul className="p-2 bg-base-100 rounded-t-none">
                  <li>
                    <a>Supervisor</a>
                  </li>
                  <li>
                    <a>Link 2</a>
                  </li>
                </ul>
              </details>
            </li>

            {isTablet ? null : (
              <li>
                <a>
                  <FaGear /> Settings
                </a>
              </li>
            )}
          </ul>

          {isTablet ? (
            ""
          ) : (
            <button className="btn btn-neutral hover:btn-error">
              GEMENTAR ACADEMY
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
