'use client'
import React from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { breakpoints } from '../config/breakpoints'

import ComponentCarousel from '../studentProfile/components/carousel'

const Page = () => {
  const isTablet = useMediaQuery(`(max-width: ${breakpoints.tablet})`);

  return (
    <div className="flex text-black  dark:bg-gray-800 min-h-screen dark:text-white">
      {isTablet ? "" : ""}
      <div className="flex-grow text-black dark:text-white">
        <main className="p-6 sm:p-10 space-y-6">
          <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
            <div className="mr-6">
              <h1 className="text-4xl font-semibold mb-2">Student Profile</h1>
              <h2 className="text-gray-300 ml-0.5">iChooseSV</h2>
            </div>
            <div className="flex flex-wrap items-start justify-end -mb-3">
              <button className="inline-flex px-5 py-3 text-purple-400 hover:text-purple-500 focus:text-purple-500 hover:bg-purple-900 focus:bg-purple-900 border border-purple-400 rounded-md mb-3">
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                Download
              </button>
              <button className="inline-flex px-5 py-3 text-white bg-purple-400 hover:bg-purple-500 focus:bg-purple-500 rounded-md ml-6 mb-3"
                
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Create new dashboard
              </button>
            </div>
          </div>
          <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="flex items-center p-8 bg-white dark:bg-gray-700 shadow rounded-lg">
              <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-800 rounded-full mr-6">
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                  />
                </svg>
              </div>
              <div>
                <span className="inline-block text-2xl font-bold text-gray-800 dark:text-white">
                  9
                </span>
                <span className="inline-block text-xl text-gray-500 font-semibold dark:text-gray-300">
                  (14%)
                </span>
                <span className="block text-gray-500 dark:text-gray-300">
                  Progress Completion
                </span>
              </div>
            </div>

            <div className="flex items-center p-8 bg-white dark:bg-gray-700 shadow rounded-lg">
              <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-800 rounded-full mr-6">
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <span className="block text-xl font-bold text-gray-800 dark:text-white">
                  SESI 2 2023/2024
                </span>
                <span className="block text-gray-500 dark:text-gray-300">
                  Session
                </span>
              </div>
            </div>

            <div className="flex items-center p-8 bg-white dark:bg-gray-700 shadow rounded-lg">
              <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-800 rounded-full mr-6">
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div>
                <span className="block text-xl font-bold text-gray-800 dark:text-white">
                  Software and Application Development
                </span>
                <span className="block text-gray-500 dark:text-gray-300">
                  Track
                </span>
              </div>
            </div>

            <div className="flex items-center p-8 bg-white dark:bg-gray-700 shadow rounded-lg">
              <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-800 rounded-full mr-6">
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div>
                <span className="block text-2xl font-bold text-gray-800 dark:text-white">
                  Puan/Sir Name
                </span>
                <span className="block text-gray-500 dark:text-gray-300">
                  Supervisor
                </span>
              </div>
            </div>
          </section>
          <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-1 xl:grid-flow-col gap-6">
            <div className="row-span-3 bg-white dark:bg-gray-700 shadow rounded-lg">
              <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
                <span>Team Members</span>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md px-1 -mr-1 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-400"
                  id="options-menu"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  Descending
                  <svg
                    className="-mr-1 ml-1 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="overflow-y-auto">
                <ul className="p-6 space-y-6">
                  <li className="flex items-center">
                    <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden"></div>
                    <span className="dark:text-white">Member 1</span>
                    <span className="ml-auto font-semibold text-xs">
                      01DDT21F9876
                    </span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden"></div>
                    <span className="dark:text-white">Member 2</span>
                    <span className="ml-auto font-semibold text-xs">
                      01DDT211234
                    </span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden"></div>
                    <span className="dark:text-white">Member 3</span>
                    <span className="ml-auto font-semibold text-xs">
                      01DDT21F1099
                    </span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden"></div>
                    <span className="dark:text-white">Bruce Wayne</span>
                    <span className="ml-auto font-semibold text-xs">
                      01DDT21F1071
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col row-span-3 bg-white dark:bg-gray-700 shadow rounded-lg">
              <div className="px-6 py-5 font-semibold border-b border-gray-100 dark:border-gray-800">
                Project Titles
              </div>

              <div className="w-full max-w-md bg-white border border-gray-200 px-4 dark:bg-gray-800 dark:border-gray-700">
                <div className="flow-root">
                  <ul
                    role="list"
                    className="divide-y divide-gray-200 dark:divide-gray-700"
                  >
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0"></div>
                        <div className="flex-1 min-w-0 ms-4">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Title 1
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            Description
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center ">
                        <div className="flex-shrink-0"></div>
                        <div className="flex-1 min-w-0 ms-4">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Title 2
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            Description
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0"></div>
                        <div className="flex-1 min-w-0 ms-4">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Title 3
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            Description
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white dark:bg-gray-700 shadow rounded-lg">
              <div className="px-6 py-5 font-semibold border-b border-gray-100 dark:border-gray-800">
                Downloadables(Poster, Abstract, Etc)
              </div>

              <div className="p-4">
                <div role="tablist" className="tabs tabs-boxed w-full md:w-1/3">
                  <a role="tab" className="tab">
                    Tab 1
                  </a>
                  <a role="tab" className="tab tab-active">
                    Tab 2
                  </a>
                  <a role="tab" className="tab">
                    Tab 3
                  </a>
                </div>
              </div>

              <ComponentCarousel />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Page;
