"use client"
import LoadingLeftBottom from "@/app/components/LoadingLeftBottom";
import { useDeleteStudent } from "@/app/utilities/storage/useDeleteStudent";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaArrowUpShortWide } from "react-icons/fa6";
import { useSetSessions } from "@/app/utilities/storage/useSetSessions";
import { useGetStudents } from "@/app/utilities/storage/useGetStudents";
import { useGetsessions } from "@/app/utilities/storage/useGetSessions";
const UseSetSession = (props: any) => {
  const [openModal, setOpenModal] = useState(false);
  const { setSessions, loading } = useSetSessions();
  const {fetchData} = useGetStudents();
  const {fetchData : fetchSessions} = useGetsessions();

  if(loading)
  {
    return <LoadingLeftBottom/>
  }

  const processDeleteStudent = () => {
    setSessions(props.sessionId);
    fetchSessions();
    fetchData(props.sessionId);
    setOpenModal(false);
  };
  return (
    <>
      <button onClick={() => setOpenModal(true)} className="btn rounded-lg bg-slate-600 hover:bg-slate-800 text-white btn-sm">
        <div>
        <FaArrowUpShortWide />
        </div>
      </button>

      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Set global session into {props.sessionLabel} {props.sessionId}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => processDeleteStudent()}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UseSetSession;
