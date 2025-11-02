import { ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export interface ShowcaseItem {
     title: string
     photographer: string
     image: string
     category: string
}

interface ShowcaseSectionProps {
     title: string
     titleHighlight: string
     description: string
     showcaseItems: ShowcaseItem[]
     viewMore: string
}

export default function ShowcaseSection({
     title,
     titleHighlight,
     description,
     showcaseItems,
     viewMore
}: ShowcaseSectionProps) {
     return (
          <section className="py-20 lg:py-32 bg-neutral-950">
               <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                         <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                              {title}{" "}
                              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                   {titleHighlight}
                              </span>
                         </h2>
                         <p className="text-xl text-gray-400">
                              {description}
                         </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                         {showcaseItems.map((item, index) => (
                              <Link
                                   href="#"
                                   key={index}
                                   className="group relative overflow-hidden rounded-2xl bg-neutral-900 border border-gray-800 hover:border-purple-500/50 transition-all"
                              >
                                   <div className="relative aspect-[4/5] overflow-hidden">
                                        <Image
                                             src={item.image}
                                             alt={item.title}
                                             fill
                                             className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Overlay Content */}
                                        <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                                             <div className="inline-block w-fit px-3 py-1 bg-purple-500/80 backdrop-blur-sm rounded-full text-white text-xs font-medium mb-3">
                                                  {item.category}
                                             </div>
                                             <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                                             <div className="flex items-center justify-between">
                                                  <p className="text-gray-300 text-sm">by {item.photographer}</p>
                                                  <ExternalLink className="w-5 h-5 text-purple-400" />
                                             </div>
                                        </div>
                                   </div>
                              </Link>
                         ))}
                    </div>

                    <div className="text-center mt-12">
                         <Link href="#">
                              <button className="px-8 py-3 border border-gray-700 text-white rounded-lg font-medium hover:border-purple-500/50 transition-all inline-flex items-center gap-2">
                                   {viewMore}
                                   <ExternalLink className="w-4 h-4" />
                              </button>
                         </Link>
                    </div>
               </div>
          </section>
     )
}