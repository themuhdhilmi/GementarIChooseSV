import { toast } from 'react-toastify'
import { create } from 'zustand'

type StudentStore = {
  data: any
  loading: boolean
  deleteStudent: (id: string) => Promise<void>
}

export const useDeleteStudent = create<StudentStore>((set) => ({
  data: {},
  loading: false,
  deleteStudent: async (studentId) => {
    try {
      set({
        loading: true,
      })

      const response = await fetch('/api/v1/AUTH/manageUser/student', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: studentId,
        }),
      })

      if (response.ok) {
        toast.success('Sucessfully deleted student', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })

        set((state) => ({
          loading: false,
        }))
      } else {
        toast.error('Failed delete student', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        set((state) => ({
          loading: false,
        }))
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      set({
        loading: false,
      })
    }
  },
}))
