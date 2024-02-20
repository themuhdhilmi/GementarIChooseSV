import { create } from 'zustand'

enum SuccessState {
  NONE = 'NONE',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

interface LecturerData {
  name: string
  email: string
  password: string
  confirmPassword: string
  track: string
}

type LecturerStore = {
  loading: boolean
  data: any
  success: SuccessState
  sendData: (postData: LecturerData) => Promise<void>
}

export const useAddLecturer = create<LecturerStore>((set) => ({
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
      const response = await fetch('/api/v1/AUTH/manageUser/lecturer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })

      const data = await response.json()

      // Update the state based on the fetched data
      if (response.ok) {
        set((state) => ({
          data: data, // Adjust this based on your API response structure
          loading: false,
          success: SuccessState.SUCCESS,
        }))
      } else {
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
