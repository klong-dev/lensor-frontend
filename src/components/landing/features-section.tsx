import { LucideIcon } from "lucide-react"

export interface Feature {
     icon: LucideIcon
     title: string
     description: string
}

interface FeaturesSectionProps {
     title: string
     titleHighlight: string
     description: string
     features: Feature[]
}

export default function FeaturesSection({
     title,
     titleHighlight,
     description,
     features
}: FeaturesSectionProps) {
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

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                         {features.map((feature, index) => (
                              <div key={index} className="group p-8 bg-neutral-900/50 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                                   <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <feature.icon className="w-7 h-7 text-white" />
                                   </div>
                                   <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                   <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                              </div>
                         ))}
                    </div>
               </div>
          </section>
     )
}
