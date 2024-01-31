"use client";
import { useMediaQuery } from "usehooks-ts";
import { LoginForm } from "./form";
import { breakpoints } from "@/app/config/breakpoints";
import Link from "next/link";

export default function LoginPage() {
  const isTablet = useMediaQuery(`(max-width: ${breakpoints.tablet})`);
  return (
    <div className="flex-col">
      <div
        className={`flex  justify-center w-full ${isTablet ? "" : "pt-40"} `}
      >
        <div
          className={`bg-white rounded-lg py-2 ${isTablet ? "" : "shadow-lg"} `}
        >
          <div className="flex-col lg:flex-row-reverse p-11">
            <div className="text-center">
              <h1 className="text-5xl font-bold">iChooseSV</h1>
              <div className="py-6">
                <div
                  className="tooltip tooltip-bottom"
                  data-tip="Good luck on your Final Year Project, from Gementar Team."
                >
                  <h1>Crucial Step Toward Your Professional Development</h1>
                  <h1>
                    Behind Every Successful Project Lies Hours of Hard Work and
                    Dedication.
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full">
              <div className="card shrink-0 w-full max-w-sm  bg-base-100">
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center pt-5 px-20">
        Developed by Gementar Team.{" "}
        <p>
          <Link href="https://gementar.com" className="text-red-800">
            Learn more about us.
          </Link>
        </p>
      </div>
    </div>
  );
}
