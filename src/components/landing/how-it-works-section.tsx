import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"

export interface Step {
     icon: LucideIcon
     number: string
     title: string
     description: string
}

interface HowItWorksSectionProps {
     title: string
     titleHighlight: string
     description: string
     steps: Step[]
     readyToStart: string
     createPortfolio: string
     watchDemo: string
}

export default function HowItWorksSection({
     title,
     titleHighlight,
     description,
     steps,
     readyToStart,
     createPortfolio,
     watchDemo
}: HowItWorksSectionProps) {
     return (
          <section className="py-20 lg:py-32 bg-neutral-900">
               <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                         <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                              {title}{" "}
                              {titleHighlight && (
                                   <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                        {titleHighlight}
                                   </span>
                              )}
                         </h2>
                         <p className="text-xl text-gray-400">
                              {description}
                         </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                         {steps.map((step, index) => (
                              <div key={index} className="relative group">
                                   {/* Connecting Line */}
                                   {index < steps.length - 1 && (
                                        <div className="hidden lg:block absolute top-20 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-purple-500 to-transparent opacity-30" />
                                   )}

                                   <div className="relative p-8 bg-neutral-950 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10">
                                        {/* Step Number */}
                                        <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                             {step.number}
                                        </div>

                                        {/* Icon */}
                                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-900/50 to-blue-900/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-purple-500/20">
                                             <step.icon className="w-8 h-8 text-purple-400" />
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                        <p className="text-gray-400 leading-relaxed">{step.description}</p>
                                   </div>
                              </div>
                         ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="text-center mt-16">
                         <p className="text-gray-400 mb-6">{readyToStart}</p>
                         <div className="flex flex-col sm:flex-row gap-4 justify-center">
                              <Button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                                   {createPortfolio}
                              </Button>
                              <Button variant="outline" className="px-8 py-3 border border-gray-700 text-white rounded-lg font-medium hover:border-purple-500/50 transition-all">
                                   {watchDemo}
                              </Button>
                         </div>
                    </div>
               </div>
          </section>
     )
}