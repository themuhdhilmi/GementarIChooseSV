import React from "react";

const page = () => {
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
                  Behind Every Successful Project Lies Hours of Hard Work and
                  Dedication.
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
};

export default page;
