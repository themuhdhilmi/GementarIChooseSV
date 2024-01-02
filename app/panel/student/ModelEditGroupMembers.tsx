"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function ModalEditGroupMembers() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function applyAndCloseModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button type="button" onClick={openModal} className="">
        Edit
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden  bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Group Member 1
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="py-2">
                      <input
                        type="text"
                        placeholder="Name"
                        className="input input-bordered w-full"
                      />
                    </div>

                    <div className="py-2">
                      <input
                        type="text"
                        placeholder="Matric No"
                        className="input input-bordered w-full"
                      />
                    </div>

                    <div className="py-2">
                      <input
                        type="text"
                        placeholder="Duty"
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={applyAndCloseModal}
                      className="btn btn-accent"
                    >
                      Apply
                    </button>

                    <button
                      type="button"
                      onClick={closeModal}
                      className="btn btn-error"
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
