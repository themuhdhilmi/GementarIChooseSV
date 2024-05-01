import { create } from 'zustand'

type StudentStore = {
    data: any
    loading: boolean
    fetchData: () => Promise<void>
  }


export const useGetHomeQuizList = create<StudentStore>((set : any) => ({
  data: {},
  loading: false,
  fetchData: async () => {
    try {
      set({
        loading: true,
      })
      // Make your fetch API call here
      // const response = await fetch(`/api/v1/feedHome/childQuestion`)

      const response = await fetch(`/api/v1/feedHome/childQuestion`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
          cache : "no-store"
        },
      })

      const data = await response.json()

      if (response.ok) {
        // Update the state based on the fetched data
        set((set : any) => ({
          loading: false,
          data: data,
        }))
      } else {
        // Update the state based on the fetched data
        set((set : any) => ({
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
