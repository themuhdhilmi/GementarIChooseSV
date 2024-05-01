import { toast } from 'react-toastify'
import { create } from 'zustand'

enum SuccessState {
  NONE = 'NONE',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

type Store = {
  loading: boolean
  data: any
  success: SuccessState
  sendData: (postData: any) => void
}

export const useUpdateQuestionListScore = create<Store>((set) => ({
  data: {},
  loading: false,
  success: SuccessState.NONE,
  sendData: async (postData) => {
    try {
      set({
        loading: true,
        success: SuccessState.NONE,
      })
      // Make your fetch API call here
      const response = await fetch('/api/v1/QUIZ/studentAnswer/studentListScore', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
          cache : "no-store"
        },
      })

      const data = await response.json()

      // Update the state based on the fetched data
      if (response.ok) {
        toast.success('Action Success', {
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
          data: data, // Adjust this based on your API response structure
          loading: false,
          success: SuccessState.SUCCESS,
        }))
      } else {
        toast.error('Action Failed', {
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
          data: data, // Adjust this based on your API response structure
          loading: false,
          success: SuccessState.ERROR,
        }))
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      set({
        loading: false,
        success: SuccessState.ERROR,
      })
    }
  },
}))
