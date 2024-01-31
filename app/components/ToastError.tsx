"use client";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const ToastError = (props: any) => {
  useEffect(() => {
    if (props.errors?.length >= 1) {
      props.errors?.forEach((element: any) => {
        const path = element?.path[0];
        toast.error(element.message + " at field" + path, {
          position: "top-right",
          autoClose: 15000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
    }

    if (props.errors?.errors?.length >= 1) {
      props.errors?.errors?.forEach((element: any) => {
        const path = element?.path[0];
        toast.error(element.message, {
          position: "top-right",
          autoClose: 15000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
    }
  }, [props]);

  return (
    <div>
      {JSON.stringify(props.errors?.length)}
      <ToastContainer />
    </div>
  );
};

export default ToastError;
