import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"
import Link from "next/link"

interface HeroSectionProps {
     badge: string
     title: string
     titleHighlight: string
     description: string
     startForFree: string
     exploreMarketplace: string
     rating: string
     startForFreeHref: string
     exploreMarketplaceHref: string
     videoSrc: string
}

export default function HeroSection({
     badge,
     title,
     titleHighlight,
     description,
     startForFree,
     exploreMarketplace,
     rating,
     startForFreeHref,
     exploreMarketplaceHref,
     videoSrc
}: HeroSectionProps) {
     return (
          <section className="relative py-5 pb-10 bg-gradient-to-br from-neutral-900 via-purple-900/20 to-neutral-900 text-white overflow-hidden">
               <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
               <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                         <div className="space-y-8">
                              <div className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-sm font-medium">
                                   {badge}
                              </div>
                              <div className="space-y-6">
                                   <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                                        {title}{" "}
                                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                                             {titleHighlight}
                                        </span>
                                   </h1>
                                   <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                                        {description}
                                   </p>
                              </div>
                              <div className="flex flex-col sm:flex-row gap-4">
                                   <Link href={startForFreeHref}>
                                        <Button size="lg" className="group">
                                             {startForFree}
                                             <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                   </Link>
                                   <Link href={exploreMarketplaceHref}>
                                        <Button size="lg" variant="outline">
                                             {exploreMarketplace}
                                        </Button>
                                   </Link>
                              </div>
                              <div className="flex items-center gap-8 pt-4">
                                   <div className="flex -space-x-3">
                                        {[1, 2, 3, 4].map((i) => (
                                             <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 border-2 border-neutral-900" />
                                        ))}
                                   </div>
                                   <div>
                                        <div className="flex items-center gap-1">
                                             <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                             <span className="font-bold">4.9/5</span>
                                        </div>
                                        <p className="text-sm text-gray-400">{rating}</p>
                                   </div>
                              </div>
                         </div>
                         <div className="relative w-full h-0 pb-[65%] rounded-2xl overflow-hidden shadow-2xl border border-purple-500/20">
                              <video
                                   src={videoSrc}
                                   className="absolute top-0 left-0 w-full h-full object-cover"
                                   autoPlay
                                   muted
                                   loop
                                   playsInline
                                   disablePictureInPicture
                                   controlsList="nodownload nofullscreen noremoteplayback"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/50 to-transparent" />
                         </div>
                    </div>
               </div>
          </section>
     )
}
