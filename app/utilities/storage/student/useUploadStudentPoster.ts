import { toast } from 'react-toastify'
import { create } from 'zustand'

type StudentStore = {
  students: any
  loading: boolean
  sendData: (file: any) => Promise<void>
}

export const useUploadStudentPoster = create<StudentStore>((set) => ({
  students: {},
  loading: false,
  sendData: async (file) => {
    try {
      set({
        loading: true,
      })

      const data = new FormData()
      data.set('fileName', 'lol2')
      data.set('file', file)

      const response = await fetch('https://storage.ichoosesv.gementar.com/gementar/storage/upload', {
        method: 'POST',
        body: data
      })

      if (response.ok) {
        toast.success('Sucessfully upload poster', {
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
        toast.error('Failed upload poster', {
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
      toast.error('Failed upload poster ' + error, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      set({
        loading: false,
      })
    }
  },
}))
