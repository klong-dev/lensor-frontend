interface StatsSectionProps {
     stats: {
          number: string
          label: string
     }[]
}

export default function StatsSection({ stats }: StatsSectionProps) {
     return (
          <section className="py-20 bg-gradient-to-br from-purple-900/20 to-neutral-950">
               <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                         {stats.map((stat, index) => (
                              <div key={index} className="space-y-2">
                                   <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                        {stat.number}
                                   </div>
                                   <div className="text-gray-400 text-lg">{stat.label}</div>
                              </div>
                         ))}
                    </div>
               </div>
          </section>
     )
}
