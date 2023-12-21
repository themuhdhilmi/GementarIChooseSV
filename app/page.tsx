'use client'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import Link from 'next/link';
import { useRouter } from 'next/navigation'

export default function Home() {

  const session = useSession();
  const router = useRouter();

  function checkIfAvailable()
  {
    if(session.status === 'unauthenticated')
    {
      router.push("/api/auth/signin");
      
    }

    return true;
  }

  return (
    
<div className="hero min-h-screen bg-base-200">
{checkIfAvailable()}
  <div className="hero-content flex-col lg:flex-row">
    <img src="https://cdna.artstation.com/p/assets/images/images/024/208/242/large/syed-ariff-2020-02-13-05-07-03-2.jpg?1581645769" className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-5xl font-bold">Welcome to the 3rd Game</h1>
      <p className="py-6">Attention all citizens: The recent heroic intervention by Keluang Man in the City of Light has led to the capture of the notorious villain, Dark Wing. The citizens are advised to remain calm and cooperate with the authorities in restoring peace and order to our beloved city.</p>
      <Link href="/api/auth/signout">
        <button className="btn btn-primary">Log Out</button>
      </Link>
      
    </div>
  </div>
</div>
  )
}
