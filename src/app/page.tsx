import MainFooter from "@/components/layout/footer/main-footer"
import MainHeader from "@/components/layout/header/main-header"
import TestimonialsSection from "@/components/landing/testimonials-section"
import HowItWorksSection from "@/components/landing/how-it-works-section"
import ShowcaseSection from "@/components/landing/showcase-section"
import { Button } from "@/components/ui/button"
import { Camera, Globe, ShoppingBag, Users, Zap, Shield, TrendingUp, Star, Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import { ROUTES } from "@/constants/path"

export default function Home() {
  return (
    <>
      <MainHeader />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-neutral-900 via-purple-900/20 to-neutral-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-sm font-medium">
                ✨ Your Creative Journey Starts Here
              </div>
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Community for{" "}
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    Photographers
                  </span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  The ultimate platform for photographers to create stunning portfolios, build a personal brand,
                  sell their work, and connect with a vibrant community.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={ROUTES.CREATE_PORTFOLIO}>
                  <Button size="lg" className="group">
                    Start for Free
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href={ROUTES.MARKETPLACE}>
                  <Button size="lg" variant="outline">
                    Explore Marketplace
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
                  <p className="text-sm text-gray-400">from 2000+ creators</p>
                </div>
              </div>
            </div>
            <div className="relative w-full h-0 pb-[65%] rounded-2xl overflow-hidden shadow-2xl border border-purple-500/20">
              <video
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video-vzjr7k51nyB62iitsJPVrl9a6I8NKm.mp4"
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

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-neutral-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Succeed
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              All-in-one platform designed specifically for creative professionals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Camera,
                title: "Portfolio Builder",
                description: "Create stunning, professional portfolios with customizable templates in minutes."
              },
              {
                icon: Globe,
                title: "Custom Domain",
                description: "Get your own custom domain and showcase your brand professionally."
              },
              {
                icon: ShoppingBag,
                title: "Digital Store",
                description: "Sell your photos, presets, and digital products directly to your audience."
              },
              {
                icon: Users,
                title: "Community Forum",
                description: "Connect with thousands of photographers, share tips, and grow together."
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Optimized performance ensures your portfolio loads instantly everywhere."
              },
              {
                icon: Shield,
                title: "Secure & Reliable",
                description: "Enterprise-grade security to protect your work and customer data."
              }
            ].map((feature, index) => (
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

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Showcase Section */}
      <ShowcaseSection />

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900/20 to-neutral-950">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10K+", label: "Active Creators" },
              { number: "50K+", label: "Portfolios Created" },
              { number: "$2M+", label: "Creator Earnings" },
              { number: "4.9/5", label: "Average Rating" }
            ].map((stat, index) => (
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

      {/* Pricing Section */}
      <section id="pricing" className="py-20 lg:py-32 bg-neutral-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Simple, Transparent{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Pricing
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Choose the plan that fits your needs. Upgrade or downgrade anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Starter",
                price: "Free",
                period: "forever",
                description: "Perfect for getting started",
                features: [
                  "1 Portfolio site",
                  "Basic templates",
                  "Lensor subdomain",
                  "Community access",
                  "5GB storage"
                ]
              },
              {
                name: "Pro",
                price: "$12",
                period: "/month",
                description: "For serious creators",
                features: [
                  "Unlimited portfolios",
                  "Premium templates",
                  "Custom domain",
                  "Digital store (5% fee)",
                  "100GB storage",
                  "Priority support",
                  "Analytics"
                ],
                popular: true
              },
              {
                name: "Business",
                price: "$29",
                period: "/month",
                description: "For agencies & teams",
                features: [
                  "Everything in Pro",
                  "No store fees",
                  "Team collaboration",
                  "1TB storage",
                  "White-label option",
                  "API access",
                  "Dedicated support"
                ]
              }
            ].map((plan, index) => (
              <div key={index} className={`relative p-8 rounded-2xl ${plan.popular ? 'bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-2 border-purple-500' : 'bg-neutral-900/50 border border-gray-800'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-sm font-medium text-white">
                    Most Popular
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
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-purple-900/30 via-neutral-900 to-blue-900/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl lg:text-6xl font-bold text-white">
              Ready to Showcase Your{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Creativity?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of photographers who have already built their dream portfolio with Lensor
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href={ROUTES.CREATE_PORTFOLIO}>
                <Button size="lg" className="text-lg px-8">
                  Start Building for Free
                </Button>
              </Link>
              <Link href={ROUTES.FORUM}>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Join Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <MainFooter />
    </>
  )
}
