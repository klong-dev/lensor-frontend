import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export interface PricingPlan {
     name: string
     price: string
     period: string
     description: string
     features: string[]
     popular?: boolean
}

interface PricingSectionProps {
     title: string
     titleHighlight: string
     description: string
     plans: PricingPlan[]
     mostPopular: string
     getStarted: string
}

export default function PricingSection({
     title,
     titleHighlight,
     description,
     plans,
     mostPopular,
     getStarted
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

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                         {plans.map((plan, index) => (
                              <div key={index} className={`relative p-8 rounded-2xl ${plan.popular ? 'bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-2 border-purple-500' : 'bg-neutral-900/50 border border-gray-800'}`}>
                                   {plan.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-sm font-medium text-white">
                                             {mostPopular}
                                        </div>
                                   )}
                                   <div className="mb-6">
                                        <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                        <p className="text-gray-400 text-sm">{plan.description}</p>
                                   </div>
                                   <div className="mb-6">
                                        <span className="text-5xl font-bold text-white">{plan.price}</span>
                                        <span className="text-gray-400 ml-2">{plan.period}</span>
                                   </div>
                                   <ul className="space-y-4 mb-8">
                                        {plan.features.map((feature, i) => (
                                             <li key={i} className="flex items-start gap-3">
                                                  <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                                  <span className="text-gray-300">{feature}</span>
                                             </li>
                                        ))}
                                   </ul>
                                   <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                                        {getStarted}
                                   </Button>
                              </div>
                         ))}
                    </div>
               </div>
          </section>
     )
}
