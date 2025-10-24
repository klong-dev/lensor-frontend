import React from 'react';
import Link from 'next/link';
import { LoginForm } from './components/login-form';
import { InfiniteSlider } from '@/components/motion-primitives/infinite-slider';
import Image from 'next/image'
import { ROUTES } from '@/constants/path';

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 py-0 px-2 overflow-hidden">
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center backdrop-blur-xl bg-black/40 border border-purple-500/30 shadow-2xl shadow-purple-500/20 h-[650px] w-[1200px] rounded-4xl overflow-hidden p-6">
        <div className="flex flex-col justify-center items-center w-full md:w-5/12 h-full bg-card backdrop-blur-sm rounded-3xl border border-purple-500/20 text-center py-8 md:py-0 shadow-lg">
          <LoginForm />
        </div>

        <div className='flex flex-col w-full md:w-7/12 gap-2 justify-between items-center h-full'>
          <div className='w-full h-1/2 relative flex justify-center items-center overflow-hidden'>
            <InfiniteSlider speedOnHover={80} gap={18}>
              <Image
                src="https://i.pinimg.com/736x/0e/9b/8d/0e9b8d7be8ef4213d74afc9568668f4e.jpg"
                alt="Urban Photography Preset"
                height={290}
                width={350}
                className="object-cover rounded-2xl h-[290px] w-[350px]"
              />
              <Image
                src="https://i.pinimg.com/736x/bb/e3/fa/bbe3fa57c93e251a074ba91c07e88083.jpg"
                alt="Nature Portrait Collection"
                height={290}
                width={350}
                className="object-cover rounded-2xl h-[290px] w-[350px]"
              />
              <Image
                src="https://i.pinimg.com/736x/5f/4a/f9/5f4af93d5dab52035c882bfb7c0cada9.jpg"
                alt="Vintage Film Presets"
                height={290}
                width={350}
                className="object-cover rounded-2xl h-[290px] w-[350px]"
              />
              <Image
                src="https://i.pinimg.com/736x/a6/03/fa/a603fa58ecfb8a6a71cba6daacadb821.jpg"
                alt="Happy Robot 032"
                height={290}
                width={350}
                className="object-cover rounded-2xl h-[290px] w-[350px]"
              />
              <Image
                src="https://i.pinimg.com/736x/40/00/b7/4000b7bf5aec646501ed7958e637f06f.jpg"
                alt="Cinematic LUT Pack"
                height={290}
                width={350}
                className="object-cover rounded-2xl h-[290px] w-[350px]"
              />
              <Image
                src="https://i.pinimg.com/736x/f3/b0/37/f3b0371f36abd9a5acdb26ba4b8ca456.jpg"
                alt="Abstract 3D Models"
                height={290}
                width={350}
                className="object-cover rounded-2xl h-[290px] w-[350px]"
              />
            </InfiniteSlider>
          </div>
          <div className='w-full h-1/2 relative flex justify-center items-center overflow-hidden'>
            <InfiniteSlider speedOnHover={80} gap={18} reverse>
              <Image
                src="https://i.pinimg.com/1200x/d8/ba/68/d8ba68dc0140e8a3778b3738b6d3f390.jpg"
                alt="Urban Photography Preset"
                height={290}
                width={350}
                className="object-cover rounded-2xl h-[290px] w-[350px]"
              />
              <Image
                src="https://i.pinimg.com/736x/14/2d/eb/142debd42b5aa5c3a49e853f34d824b9.jpg"
                alt="Nature Portrait Collection"
                height={290}
                width={350}
                className="object-cover rounded-2xl h-[290px] w-[350px]"
              />
              <Image
                src="https://i.pinimg.com/736x/53/07/e5/5307e5c3386ce1f39eac02771e401b3e.jpg"
                alt="Vintage Film Presets"
                height={290}
                width={350}
                className="object-cover rounded-2xl h-[290px] w-[350px]"
              />
              <Image
                src="https://i.pinimg.com/736x/5c/7f/99/5c7f9934f4b91ed7e5a0b692c200b89b.jpg"
                alt="Happy Robot 032"
                height={290}
                width={350}
                className="object-cover rounded-2xl h-[290px] w-[350px]"
              />
              <Image
                src="https://i.pinimg.com/736x/74/35/66/7435667246898c42f1167195f46aa27f.jpg"
                alt="Cinematic LUT Pack"
                height={290}
                width={350}
                className="object-cover rounded-2xl h-[290px] w-[350px]"
              />
              <Image
                src="https://i.pinimg.com/736x/d5/e4/b8/d5e4b8b19367525324fd1c2e85d0441f.jpg"
                alt="Abstract 3D Models"
                height={290}
                width={350}
                className="object-cover rounded-2xl h-[290px] w-[350px]"
              />
            </InfiniteSlider>
          </div>
        </div>
      </div>
      <Link href={ROUTES.HOME} className='absolute inset-5 w-14 h-14'>
        <Image
          src="/Lensor-removebg-preview.png"
          alt="Lensor Logo"
          width={50}
          height={50}
        />
      </Link>
    </div >
  )
}