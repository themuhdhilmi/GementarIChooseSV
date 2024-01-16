import { LoginForm } from "./form";

export default function LoginPage() {
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
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
