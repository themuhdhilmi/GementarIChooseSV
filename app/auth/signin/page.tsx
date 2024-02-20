'use client'
import { useMediaQuery } from 'usehooks-ts'
import { LoginForm } from './form'
import { breakpoints } from '@/app/config/breakpoints'
import Link from 'next/link'
import Image from 'next/image'

export default function LoginPage() {
  const isTablet = useMediaQuery(`(max-width: ${breakpoints.tablet})`)
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.mobile})`)
  return (
    <div className="flex-col">
      <div className={`flex  justify-center w-full ${isTablet ? '' : ''} `}>
        <div className={`bg-white rounded-lg py-2 ${isTablet ? '' : 'shadow-lg'} `}>
          <div className="flex-col lg:flex-row-reverse p-11">
            <div className="text-center">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <h1 className="text-5xl font-bold flex">
                  <p>iChoose</p>
                  <p className="text-red-600">SV</p>
                </h1>
              </div>
              <div className="py-6">
                <div className="tooltip tooltip-bottom" data-tip="Good luck on your Final Year Project, from Gementar Team.">
                  <h1>Crucial Step Toward Your Professional Development</h1>
                  <h1>Behind Every Successful Project Lies Hours of Hard Work and Dedication.</h1>
                </div>
              </div>
            </div>
            {/* <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Image
                alt=""
                src="/images/logo_puo.png"
                width={150}
                height={150}
              />
            </div> */}

            <div className="flex justify-center w-full">
              <div className="card shrink-0 w-full max-w-sm  bg-base-100">
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center pt-5 px-20">
        Developed by Gementar Team.{' '}
        <p>
          <Link href="https://gementar.com" className="text-red-800">
            Learn more about us.
          </Link>
        </p>
      </div>
    </div>
  )
}
