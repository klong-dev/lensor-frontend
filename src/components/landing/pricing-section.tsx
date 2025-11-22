import { Button } from "@/components/ui/button"
import { Check, Tag } from "lucide-react"

interface PricingSectionProps {
     title: string
     titleHighlight: string
     description: string
     platformFee: string
     feeDescription: string
     features: {
          title: string
          list: string[]
     }
}

export default function PricingSection({
     title,
     titleHighlight,
     description,
     platformFee,
     feeDescription,
     features
}: PricingSectionProps) {
     return (
          <section id="pricing" className="py-20 lg:py-32 bg-neutral-950">
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

                    <div className="max-w-4xl mx-auto">
                         <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-2 border-purple-500/50 rounded-2xl p-12">
                              <div className="text-center mb-12">
                                   <div className="inline-flex items-center gap-3 mb-4">
                                        <Tag className="w-8 h-8 text-purple-400" />
                                        <h3 className="text-5xl font-bold text-white">{platformFee}</h3>
                                   </div>
                                   <p className="text-xl text-gray-300">{feeDescription}</p>
                              </div>

                              <div className="mb-8">
                                   <h4 className="text-2xl font-bold text-white mb-6 text-center">{features.title}</h4>
                                   <div className="grid md:grid-cols-2 gap-4">
                                        {features.list.map((feature, i) => (
                                             <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-neutral-900/50">
                                                  <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                                  <span className="text-gray-300">{feature}</span>
                                             </div>
                                        ))}
                                   </div>
                              </div>

                              <div className="text-center">
                                   <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8">
                                        Start Selling Today
                                   </Button>
                              </div>
                         </div>
                    </div>
               </div>
          </section>
     )
}
