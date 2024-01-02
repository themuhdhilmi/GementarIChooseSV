"use client";

import { useSession } from "next-auth/react";
import Loading from "./components/Loading";
import { useRouter } from "next/navigation";

export default function Page() {
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") {
    return <Loading />; // You can also render a loading indicator here if needed
  } else {
    if (session.status === "authenticated") {
      router.push("/panel");
    }

    if (session.status === "unauthenticated") {
      return (
        <div className="">
          <div className="hero min-h-screen ">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold">iChooseSV</h1>
                <div className="py-6">
                  <div
                    className="tooltip tooltip-bottom"
                    data-tip="Good luck on your Final Year Project, from Gementar Team."
                  >
                    <h1 className="text-center lg:text-left">
                      Crucial Step Toward Your Professional Development
                    </h1>
                    <h1 className="text-center lg:text-left">
                      Behind Every Successful Project Lies Hours of Hard Work
                      and Dedication.
                    </h1>
                  </div>
                </div>
              </div>
              <div className="card shrink-0 w-full max-w-sm  bg-base-100">
                <form className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="email"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="password"
                      className="input input-bordered"
                      required
                    />
                    <label className="label">
                      <a href="#" className="label-text-alt link link-hover">
                        Forgot password?
                      </a>
                    </label>
                  </div>
                  <div className="form-control mt-6">
                    <button className="btn btn-primary">Login</button>
                  </div>
                  <div className="text-center">Develop by GementarTeam</div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}



// 'use client'
// import { signIn, useSession } from 'next-auth/react';
// import { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Link from 'next/link';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// export default function SignIn() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const searchParams = useSearchParams();
//   const { data: session } = useSession();
//   const router = useRouter();

//   const error = searchParams.get('error') ?? "";

//   useEffect(() => {
//     if (session) {
//       router.push('/');
//     }
//   }, [session]);

//   const handleSignIn = async (e: any) => {
//     e.preventDefault();
//     try {
//       await signIn('credentials', { email, password });
//     } catch (error) {
//       console.error('Sign-in error:', error);
//       router.push('/LOL');
//     }
//   };

//   useEffect(() => {

//     if (error === "CredentialsSignin") {
//       toast.error(' Wrong Credientals!', {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         });
//     }

//   }, []);

//   return (
//     <div className="hero min-h-screen bg-gray-100">
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//       {/* Same as */}
//       <ToastContainer />
//       <div className="hero-content flex-col lg:flex-row-reverse">
//         <div className="text-center lg:text-left">
//           <h1 className="text-5xl font-bold debug_placeholder">TestMatrix | Cloud Testing</h1>
//           <p className="py-6 debug_placeholder">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
//         </div>
//         <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
//           <form className="card-body" onSubmit={handleSignIn}>
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Email</span>
//               </label>
//               <input
//                 type="email"
//                 placeholder="email"
//                 className="input input-bordered"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Password</span>
//               </label>
//               <input
//                 type="password"
//                 placeholder="password"
//                 className="input input-bordered"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <label className="label">
//                 <Link href="#" className="label-text-alt link link-hover">
//                   Forgot password?
//                 </Link>
//               </label>
//             </div>
//             <div className="form-control mt-6">
//               <button type="submit" className="btn btn-primary">
//                 Login
//               </button>
//             </div>
//             <div className='text-center text-xs text-blue-800'>
//               <Link href='/api/auth/register'>Register now</Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }