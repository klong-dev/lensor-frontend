import { MousePointerClick, Palette, Rocket, TrendingUp } from "lucide-react"

export default function HowItWorksSection() {
     const steps = [
          {
               icon: MousePointerClick,
               number: "01",
               title: "Choose Your Template",
               description: "Select from our collection of stunning, professionally designed templates tailored for photographers."
          },
          {
               icon: Palette,
               number: "02",
               title: "Customize Everything",
               description: "Make it yours with our intuitive drag-and-drop editor. No coding skills required."
          },
          {
               icon: Rocket,
               number: "03",
               title: "Launch Your Site",
               description: "Go live in minutes with your custom domain or our free subdomain. It's that simple."
          },
          {
               icon: TrendingUp,
               number: "04",
               title: "Grow Your Business",
               description: "Start selling your work, connect with clients, and watch your photography business thrive."
          }
     ]

     return (
          <section className="py-20 lg:py-32 bg-neutral-900">
               <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                         <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                              How It{" "}
                              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                   Works
                              </span>
                         </h2>
                         <p className="text-xl text-gray-400">
                              Get your professional portfolio online in 4 simple steps
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
                         <p className="text-gray-400 mb-6">Ready to get started?</p>
                         <div className="flex flex-col sm:flex-row gap-4 justify-center">
                              <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                                   Create Your Portfolio
                              </button>
                              <button className="px-8 py-3 border border-gray-700 text-white rounded-lg font-medium hover:border-purple-500/50 transition-all">
                                   Watch Demo
                              </button>
                         </div>
                    </div>
               </div>
          </section>
     )
}
