'use client'
import { useUserInformation } from '@/app/utilities/storage/user/useUserInformation'
import { signIn } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'

export const LoginForm = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { fetchData } = useUserInformation()
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      setFormValues({
        email: '',
        password: '',
      })

      const res = await signIn('credentials', {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl,
      })

      setLoading(false)

      console.log(res)
      if (!res?.error) {
        fetchData()
        router.replace(callbackUrl)
      } else {
        setError('invalid email or password')
      }
    } catch (error: any) {
      setLoading(false)
      setError(error)
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const input_style = 'form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'

  return (
    <form onSubmit={onSubmit}>
      {error && <p className="text-center bg-blue-300 py-4 mb-6 rounded">{error}</p>}
      <div>
        <div className="form-control ">
          <label className="label">
            <span className="label-text">Email</span>
          </label>

          <input required type="email" name="email" className="input input-bordered rounded-lg" value={formValues.email} onChange={handleChange} placeholder="Email address" />
        </div>
      </div>
      <div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">password</span>
          </label>

          <input required type="password" name="password" value={formValues.password} onChange={handleChange} placeholder="Password" className="input input-bordered rounded-lg" />
        </div>
      </div>

      <div className="form-control mt-6">
        <button type="submit" className="btn rounded-lg bg-blue-600 hover:bg-blue-400 text-white" disabled={loading}>
          {loading ? 'loading...' : 'Sign In'}
        </button>
      </div>

      {/* <div className="text-center py-4">Develop by </div> */}
    </form>
  )
}
