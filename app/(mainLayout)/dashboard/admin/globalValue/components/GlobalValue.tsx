import React from 'react'

const GlobalValue = () => {
  return (
    <div className="justify-center px-4  border rounded-lg  bg-white shadow-lg">
      <div className="overflow-x-auto">
        <div className="flex flex-row py-5">
          <div className="w-1/2 font-medium ">
            <p className="underline decoration-1">Manage Sessions</p>
          </div>
        </div>

        <div>
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            required
            type="text"
            placeholder="Hilmi Azmi"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full rounded-lg"
            pattern=".{4,}$"
          />
          <div className="label">
            <span className="label-text-alt"></span>
            <span className="label-text-alt">Minimum 4 characters</span>
          </div>
        </div>

        <div>
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            required
            type="text"
            placeholder="Hilmi Azmi"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full rounded-lg"
            pattern=".{4,}$"
          />
          <div className="label">
            <span className="label-text-alt"></span>
            <span className="label-text-alt">Minimum 4 characters</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GlobalValue
