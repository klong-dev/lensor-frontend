import MainFooter from "@/components/layout/footer/main-footer"
import MainHeader from "@/components/layout/header/main-header"
import { Button } from "@mantine/core"
import { useTranslations } from "next-intl"
import Link from 'next/link'

export default function Home() {
  const t = useTranslations('HomePage')
  return (
    <>
      <MainHeader isLogin={false} />
      <section className="py-20 lg:py-32 bg-neutral-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Community for {" "}
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Photographer.
                  </span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  The ultimate platform for photographer to create stunning portfolios, build a personal brand, and sell their work.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  component={Link}
                  href='/login'
                >
                  Start for Free
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                >
                  See a Demo
                </Button>
              </div>
            </div>
            <div className="relative w-full h-0 pb-[65%] rounded-lg overflow-hidden shadow-2xl">
              <video
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video-vzjr7k51nyB62iitsJPVrl9a6I8NKm.mp4"
                className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                autoPlay
                muted
                loop
                playsInline
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
              />
            </div>
          </div>
        </div>
      </section>
      <MainFooter />
    </>
  )
}
