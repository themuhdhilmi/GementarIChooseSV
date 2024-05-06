import { create } from 'zustand'

type Studenttore = {
  data: any
  loading: boolean
  doneFetch: boolean
  fetchData: (id: string) => Promise<void>
}

export const useGetSessionDetail = create<Studenttore>((set) => ({
  data: {},
  loading: false,
  doneFetch: true,
  fetchData: async (id: string) => {
    try {
      set({
        loading: true,
      })
      set({
        doneFetch: false,// app\api\v1\GLOBAL\sessions\[id]
      })
      // Make your fetch API call here
      const response = await fetch(`/api/v1/GLOBAL/sessionInfo/${id}`)
      const data = await response.json()

      // Update the state based on the fetched data
      set((state) => ({
        data: data, // Adjust this based on your API response structure
        loading: false,
        doneFetch: true,
      }))
    } catch (error) {
      console.error('Error fetching data:', error)
      set({
        loading: false,
      })
    }
  },
}))
