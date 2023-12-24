import React from 'react'

const MainTable = (props: any) => {
    return (
        <>
            <div className='flex pb-2'>
                <div className='flex-auto w-fit pt-2 '>
                    Admin List
                </div>
                <button onClick={() => props.setIsEditing(true)} className=" btn  btn-sm btn-neutral m-1">
                    ADD
                </button>
            </div>

            <div className='bg-white bg-opacity-70 shadow-lg rounded-lg'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    <label>

                                    </label>
                                </th>
                                <th>Name</th>
                                <th>Role</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>
                                    <label>
                                        1
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src="https://picsum.photos/200" alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">Main Admin</div>
                                            <div className="text-sm opacity-50">admin@gementar.com
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>ADMIN</td>
                                <th>
                                    <button onClick={() => props.setIsEditing(true)} className="btn btn-ghost btn-xs">EDIT</button>
                                </th>
                            </tr>
                        </tbody>
                        {/* foot */}
                        <tfoot>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Role</th>
                                <th></th>
                            </tr>
                        </tfoot>

                    </table>
                </div>
            </div></>
    )
}

export default MainTable