import React, { useEffect, useState } from 'react'
import Quill from '../Quill/Quill'
import { useGetsessions } from '../../../utilities/storage/user/useGetSessions'
import { useUserInformation } from '@/app/utilities/storage/user/useUserInformation'
import { usePutSessions } from '@/app/utilities/storage/user/usePutSessions'
import ReactQuill from 'react-quill'
import { breakpoints } from '@/app/config/breakpoints'
import { useMediaQuery } from 'usehooks-ts'


const Feed = () => {
  const { data, loading } = useGetsessions()
  const { data: dataUser } = useUserInformation()
 

  const [value, setValue] = useState(data?.sessionSelected?.feed ?? '<p><br></p><p><strong>🎉📚 Welcome to IChoosesv, the one-stop destination for Politeknik Ungku Omar students on their quest to find the perfect lecturer match! 📚🎉</strong></p><p><strong>Dear Students,</strong></p><p><br></p><p>Are you ready to embark on a journey of academic excellence? Look no further, because IChoosesv is here to make your search for the ideal lecturer smoother and more efficient than ever before.</p><p>Whether you are seeking guidance, expertise, or just a friendly face in your academic endeavors, IChoosesv is your trusted companion. With a user-friendly interface and a wide range of options, finding the perfect match for your learning style has never been easier.</p><p><br></p><p>So, dive in, explore, and connect with lecturers who are not only knowledgeable but also passionate about helping you succeed. Lets create a vibrant community of learning together!</p><p>Welcome aboard, and may your journey with IChoosesv be filled with enriching experiences and academic achievements!</p>')
  const { putSessionsGlobalFeed } = usePutSessions()

  useEffect(() => {
    setValue(data?.sessionSelected?.feed ?? '<p><br></p><p><strong>🎉📚 Welcome to IChoosesv, the one-stop destination for Politeknik Ungku Omar students on their quest to find the perfect lecturer match! 📚🎉</strong></p><p><strong>Dear Students,</strong></p><p><br></p><p>Are you ready to embark on a journey of academic excellence? Look no further, because IChoosesv is here to make your search for the ideal lecturer smoother and more efficient than ever before.</p><p>Whether you are seeking guidance, expertise, or just a friendly face in your academic endeavors, IChoosesv is your trusted companion. With a user-friendly interface and a wide range of options, finding the perfect match for your learning style has never been easier.</p><p><br></p><p>So, dive in, explore, and connect with lecturers who are not only knowledgeable but also passionate about helping you succeed. Lets create a vibrant community of learning together!</p><p>Welcome aboard, and may your journey with IChoosesv be filled with enriching experiences and academic achievements!</p>')
  }, [data])

  useEffect(() => {
    if (data?.sessionSelected?.id) {
      putSessionsGlobalFeed(data?.sessionSelected?.id, value)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const canEdit = dataUser?.user?.role === 'ADMIN' ? true : false

  if (canEdit) {
    return (
      <div className="min-h-screen">
        <Quill initialValue={data?.sessionSelected?.feed ?? '<p><br></p><p><strong>🎉📚 Welcome to IChoosesv, the one-stop destination for Politeknik Ungku Omar students on their quest to find the perfect lecturer match! 📚🎉</strong></p><p><strong>Dear Students,</strong></p><p><br></p><p>Are you ready to embark on a journey of academic excellence? Look no further, because IChoosesv is here to make your search for the ideal lecturer smoother and more efficient than ever before.</p><p>Whether you are seeking guidance, expertise, or just a friendly face in your academic endeavors, IChoosesv is your trusted companion. With a user-friendly interface and a wide range of options, finding the perfect match for your learning style has never been easier.</p><p><br></p><p>So, dive in, explore, and connect with lecturers who are not only knowledgeable but also passionate about helping you succeed. Lets create a vibrant community of learning together!</p><p>Welcome aboard, and may your journey with IChoosesv be filled with enriching experiences and academic achievements!</p>'} value={value} setValue={setValue} canEdit={dataUser?.user?.role === 'ADMIN' ? true : false} />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <ReactQuill value={data?.sessionSelected?.feed ?? '<p><br></p><p><strong>🎉📚 Welcome to IChoosesv, the one-stop destination for Politeknik Ungku Omar students on their quest to find the perfect lecturer match! 📚🎉</strong></p><p><strong>Dear Students,</strong></p><p><br></p><p>Are you ready to embark on a journey of academic excellence? Look no further, because IChoosesv is here to make your search for the ideal lecturer smoother and more efficient than ever before.</p><p>Whether you are seeking guidance, expertise, or just a friendly face in your academic endeavors, IChoosesv is your trusted companion. With a user-friendly interface and a wide range of options, finding the perfect match for your learning style has never been easier.</p><p><br></p><p>So, dive in, explore, and connect with lecturers who are not only knowledgeable but also passionate about helping you succeed. Lets create a vibrant community of learning together!</p><p>Welcome aboard, and may your journey with IChoosesv be filled with enriching experiences and academic achievements!</p>'} readOnly={true} theme={'bubble'} />
    </div>
  )
}

export default Feed
