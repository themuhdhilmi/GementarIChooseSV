"use client";
import React, { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { breakpoints } from "../config/breakpoints";
import { SiHtmlacademy } from "react-icons/si";
import Image from "next/image";
import Countdown from "react-countdown";
import { signOut, useSession } from "next-auth/react";
import { useUserInformation } from "../utilities/storage/useUserInformation";
import AdminMenu from "./HeaderComponents/AdminMenu";
import Link from "next/link";
import Loading from "./LoadingFullScreen";
const Header = () => {
  const session = useSession();

  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`);
  const isTablet = useMediaQuery(`(max-width: ${breakpoints.tablet})`);
  const isMobileLandscape = useMediaQuery(
    `(max-width: ${breakpoints.mobileLandscape})`
  );

  const { fetchData, name, email, role } = useUserInformation();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (session.status === "authenticated") {
  //     if (role === "GUEST") {
  //       signOut();
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [role]);

  function checkIfUserLoggedIn() {
    if (session.status === "unauthenticated") {
      return false;
    } else {
      if (role === "GUEST") {
        //signOut();
      }
    }
    return true;
  }

  if (session.status === "loading") {
    return <Loading />; // You can also render a loading indicator here if needed
  }

  const renderer = ({ days }: any) => {
    // Render a countdown
    return <span>{days}</span>;
  };

  return (
    <div className="static">
      {checkIfUserLoggedIn() ? (
        <div
          className={`-z-50 absolute bg-gradient-to-r from-red-600 to-red-800 ${
            isDesktop ? "min-h-screen" : "min-h-96"
          } min-w-full px-5 py-2`}
        />
      ) : (
        <div
          className={`-z-50 absolute bg-gradient-to-r from-red-600 to-red-800 ${
            isTablet ? "min-h-20" : isDesktop ? "min-h-screen" : "min-h-96"
          } min-w-full px-5 py-2`}
        />
      )}

      <div className={`bg-none ${isDesktop ? "px-6" : "px-24"}  py-2`}>
        {!isDesktop ? (
          <div className="navbar rounded-lg p-0 ">
            <div className="navbar-start text-white ">
              <Link
                href={"/"}
                className="btn btn-ghost text-white text-xl rounded-lg"
              >
                <SiHtmlacademy />
                iChooseSV [{role}]
              </Link>
            </div>
            <div className="navbar-center">
              <div className="badge badge-neutral">Final presentation</div>
              <div className="badge ">
                <Countdown date={"2025-02-01T01:02:03"} renderer={renderer} />
              </div>
              <div className="ml-2 badge badge-neutral">Session</div>
              <div className="badge ">1 2022/2023</div>
            </div>

            {checkIfUserLoggedIn() ? (
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
                  <Link
                    href={`/dashboard/view/profileSettings`}
                    className="text-ellipsis"
                  >
                    {name}
                  </Link>
                </button>
              </div>
            ) : (
              <div className="navbar-end">
                <Link
                  href={"/auth/signin"}
                  className="btn rounded-lg min-h-fit border-red-700 bg-red-700 text-white hover:bg-red-900 hover:border-red-700"
                >
                  <p className="text-ellipsis">Login</p>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="navbar rounded-lg p-0 ">
            <div className="navbar-start text-white ">
              <Link
                href={"/"}
                className="btn btn-ghost text-white text-xl rounded-lg"
              >
                <SiHtmlacademy />
                iChooseSV
              </Link>
            </div>

            {checkIfUserLoggedIn() ? (
              ""
            ) : (
              <Link href={"/auth/signin"} className="navbar-end text-white">
                Login
              </Link>
            )}
            <div className="navbar-center"></div>
          </div>
        )}
        {role === "ADMIN" ? <AdminMenu renderer={renderer} /> : ""}
      </div>
    </div>
  );
};

export default Header;
