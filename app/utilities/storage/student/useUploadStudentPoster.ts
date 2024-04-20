import { toast } from 'react-toastify'
import { create } from 'zustand'

type StudentStore = {
  data: any
  loading: boolean
  sendData: (file: any, emailLead: string, projectTitleId: string) => Promise<void>
}

export const useUploadStudentPoster = create<StudentStore>((set) => ({
  data: {},
  loading: false,
  sendData: async (file, emailLead, projectTitleId) => {
    try {
      set({
        loading: true,
      })

      if (!projectTitleId) {
        const postData = {
          emailLead: emailLead,
          name: 'None',
        }

        // Make your fetch API call here
        const responseTitle = await fetch('/api/v1/AUTH/manageUser/studentProjectTitle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        })

        const data = await responseTitle.json()
        const titleId = data.newProjectTitle.id

        if (responseTitle.ok) {
          const data = new FormData()
          data.set('fileName', titleId)
          data.set('file', file)

          const responseTitle2 = await fetch('https://storage.ichoosesv.website.com/website/storage/upload', {
            method: 'POST',
            body: data,
          })

          if (responseTitle2.ok) {
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
              data: responseTitle.body,
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
              data: responseTitle.body,
            }))
          }
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
      } else {
        const data = new FormData()
        data.set('fileName', projectTitleId)
        data.set('file', file)

        const response = await fetch('https://storage.ichoosesv.website.com/website/storage/upload', {
          method: 'POST',
          body: data,
        })

        if (response.ok) {
          const postData = {
            emailLead: emailLead,
            projectTitleId: projectTitleId,
            name: null,
          }

          const response2 = await fetch('/api/v1/AUTH/manageUser/studentProjectTitle', {
            method: 'PUT',
            body: JSON.stringify(postData),
          })

          if (response2.ok) {
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
              data: response.body,
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
              data: response.body,
            }))
          }
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
