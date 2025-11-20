import { Star, Quote } from "lucide-react"

export interface Testimonial {
     name: string
     role: string
     avatar: string
     rating: number
     text: string
}

interface TestimonialsSectionProps {
     title: string
     titleHighlight: string
     description: string
     testimonials: Testimonial[]
}

export default function TestimonialsSection({
     title,
     titleHighlight,
     description,
     testimonials
}: TestimonialsSectionProps) {
     return (
          <section className="py-20 lg:py-32 bg-neutral-900">
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

                    <div className="grid md:grid-cols-3 gap-8">
                         {testimonials.map((testimonial, index) => (
                              <div key={index} className="relative p-8 bg-neutral-950 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all">
                                   <Quote className="absolute top-6 right-6 w-8 h-8 text-purple-500/20" />
                                   <div className="flex items-center gap-4 mb-6">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white font-bold text-xl">
                                             {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                             <h4 className="text-white font-semibold">{testimonial.name}</h4>
                                             <p className="text-gray-400 text-sm">{testimonial.role}</p>
                                        </div>
                                   </div>
                                   <div className="flex gap-1 mb-4">
                                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                                             <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                   </div>
                                   <p className="text-gray-300 leading-relaxed">
                                        "{testimonial.text}"
                                   </p>
                              </div>
                         ))}
                    </div>
               </div>
          </section>
     )
}