"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { useMediaQuery } from "usehooks-ts";
import { breakpoints } from "../config/breakpoints";
import { SiHtmlacademy } from "react-icons/si";
import { AiOutlineGlobal } from "react-icons/ai";
import { IoIosConstruct } from "react-icons/io";
import Image from "next/image";
import Countdown from "react-countdown";
const Header = () => {
  const session = useSession();
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`);
  const isMobileLandscape = useMediaQuery(
    `(max-width: ${breakpoints.mobileLandscape})`
  );

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

  const renderer = ({ days, hours, minutes, seconds }: any) => {
    // Render a countdown
    return <span>{days}</span>;
  };

  return (
    <div className="static">
      <div
        className={`-z-50 absolute bg-gradient-to-r from-red-600 to-red-800 ${
          isDesktop ? "min-h-screen" : "min-h-96"
        } min-w-full px-5 py-2`}
      ></div>
      <div className={`bg-none ${isDesktop ? "px-6" : "px-24"}  py-2`}>
        {!isDesktop ? (
          <div className="navbar rounded-lg p-0 ">
            <div className="navbar-start text-white">
              <a className="btn btn-ghost text-white text-xl">
                <SiHtmlacademy />
                iChooseSV [STUDENT]
              </a>
            </div>
            <div className="navbar-center">
              <div className="badge badge-neutral">Final presentation</div>
              <div className="badge ">
                <Countdown date={"2025-02-01T01:02:03"} renderer={renderer} />
              </div>
              <div className="ml-2 badge badge-neutral">Session</div>
              <div className="badge ">1 2022/2023</div>
            </div>
            <div className="navbar-end">
              <button className="btn rounded-lg min-h-fit border-red-700 bg-red-700 text-white hover:bg-red-900 hover:border-red-700">
                <div className="avatar">
                  <div className="w-10 mask mask-hexagon">
                    <Image
                      alt=""
                      width={500}
                      height={500}
                      src="/images/profile.jpg"
                    />
                  </div>
                </div>
                <p className="text-ellipsis">MUHAMMAD HILMI BIN KAMARUL AZMI</p>
              </button>
            </div>
          </div>
        ) : (
          <div className="navbar rounded-lg p-0 ">
            <div className="navbar-start text-white">
              <a className="btn btn-ghost text-white text-xl">
                <SiHtmlacademy />
                iChooseSV
              </a>
            </div>
            <div className="navbar-center"></div>
            <div className="navbar-end"></div>
          </div>
        )}

        {!isDesktop ? (
          <div className="flex flex-row gap-3 py-5">
            <button className="btn btn-sm rounded-lg border-0  bg-red-700 text-white hover:bg-red-900 ">
              <AiOutlineGlobal />
              Global Value
            </button>

            <button className="btn btn-sm rounded-lg border-0 bg-red-700 text-white hover:bg-red-900  bg-opacity-0">
              <IoIosConstruct />
              Students Manager
            </button>

            <button className="btn btn-sm rounded-lg border-0 bg-red-700 text-white hover:bg-red-900  bg-opacity-0">
              <IoIosConstruct />
              Lecturer Manager
            </button>

            <button className="btn btn-sm rounded-lg border-0 bg-red-700 text-white hover:bg-red-900  bg-opacity-0">
              <IoIosConstruct />
              Profile Settings
            </button>

            <div className="w-full flex flex-row-reverse">
              <button className="btn btn-sm rounded-lg border-0 text-red-600 bg-white hover:bg-opacity-0 hover:text-white">
                <IoIosConstruct />
                GementarTeam Mentorship Programme
              </button>
            </div>
          </div>
        ) : (
          <div>
            {isMobileLandscape ? (
              ""
            ) : (
              <div className="flex flex-col w-full">
                <div className="flex flex-row">
                  <div className="badge badge-neutral  w-1/2">
                    Final presentation
                  </div>
                  <div className="badge  w-1/2">
                    <Countdown
                      date={"2025-02-01T01:02:03"}
                      renderer={renderer}
                    />
                  </div>
                </div>

                <div className="flex flex-row">
                  <div className=" badge badge-neutral  w-1/2">Session</div>
                  <div className="badge w-1/2">1 2022/2023</div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap py-5 w-full">
              <button
                className={`${
                  isMobileLandscape ? "text-xs" : ""
                } btn rounded-lg border-0 border-red-700 bg-red-700 text-white hover:bg-red-900 hover:border-red-700 w-full`}
              >
                {isMobileLandscape ? (
                  ""
                ) : (
                  <div className="avatar">
                    <div className="w-10 mask mask-hexagon">
                      <Image
                        alt=""
                        width={500}
                        height={500}
                        src="/images/profile.jpg"
                      />
                    </div>
                  </div>
                )}
                MUHAMMAD HILMI BIN KAMARUL AZMI
              </button>
            </div>
            <div className="flex flex-wrap"></div>
            <div className="flex flex-wrap bg-red-500 rounded-lg">
              <button className="btn btn-sm rounded-lg border-0  bg-red-700 text-white hover:bg-red-900 w-full">
                <AiOutlineGlobal />
                Global Value
              </button>

              <button className="btn btn-sm rounded-lg border-0 bg-red-700 text-white hover:bg-red-900  bg-opacity-0  w-full">
                <IoIosConstruct />
                Students Manager
              </button>

              <button className="btn btn-sm rounded-lg border-0 bg-red-700 text-white hover:bg-red-900  bg-opacity-0  w-full">
                <IoIosConstruct />
                Lecturer Manager
              </button>

              <button className="btn btn-sm rounded-lg border-0 bg-red-700 text-white hover:bg-red-900  bg-opacity-0  w-full">
                <IoIosConstruct />
                Profile Settings
              </button>
            </div>

            <div className="w-full flex">
              <button
                className={`${
                  isMobileLandscape ? "text-xs" : ""
                } btn rounded-lg border-0 text-red-600 bg-white hover:bg-opacity-0 hover:text-white w-full my-5`}
              >
                {isMobileLandscape ? "" : <IoIosConstruct />}
                GementarTeam Mentorship Programme
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
