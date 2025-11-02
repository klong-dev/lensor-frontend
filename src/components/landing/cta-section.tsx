import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CTASectionProps {
     title: string
     titleHighlight: string
     description: string
     startBuilding: string
     joinCommunity: string
     startBuildingHref: string
     joinCommunityHref: string
}

export default function CTASection({
     title,
     titleHighlight,
     description,
     startBuilding,
     joinCommunity,
     startBuildingHref,
     joinCommunityHref
}: CTASectionProps) {
     return (
          <section className="py-20 lg:py-32 bg-gradient-to-br from-purple-900/30 via-neutral-900 to-blue-900/30">
               <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                         <h2 className="text-4xl lg:text-6xl font-bold text-white">
                              {title}{" "}
                              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                   {titleHighlight}
                              </span>
                         </h2>
                         <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                              {description}
                         </p>
                         <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                              <Link href={startBuildingHref}>
                                   <Button size="lg" className="text-lg px-8">
                                        {startBuilding}
                                   </Button>
                              </Link>
                              <Link href={joinCommunityHref}>
                                   <Button size="lg" variant="outline" className="text-lg px-8">
                                        {joinCommunity}
                                   </Button>
                              </Link>
                         </div>
                    </div>
               </div>
          </section>
     )
}
