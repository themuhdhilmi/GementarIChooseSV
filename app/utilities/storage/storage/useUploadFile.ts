import { toast } from 'react-toastify'
import { create } from 'zustand'

type StudentStore = {
  data: any
  loading: boolean
  sendData: (file: any) => Promise<void>
}

export const useUploadFile = create<StudentStore>((set) => ({
  data: {},
  loading: false,
  sendData: async (file) => {
    try {
      const data = new FormData()

      const response = await fetch('/api/v1/AUTH/global/user')
      const userData = await response.json()

      const randomString = `${userData?.user.email}_${Math.floor(Math.random() * 999)}_${Date.now()}`

      data.set('fileName', randomString)
      data.set('file', file)

      const responseTitle2 = await fetch('https://storage.server.gementar.com/gementar/storage/upload', {
        method: 'POST',
        body: data,
      })

      const data2 = await responseTitle2.json()

      if (responseTitle2.ok) {
        // toast.success('Sucessfully upload', {
        //   position: 'top-right',
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: 'light',
        // })

        set((state) => ({
          loading: false,
          data: data2,
        }))
      } else {
        toast.error('Failed upload, make sure user are logged in', {
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
          data: data2,
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
