import CTASection from "@/components/landing/cta-section"
import FeaturesSection from "@/components/landing/features-section"
import HeroSection from "@/components/landing/hero-section"
import HowItWorksSection from "@/components/landing/how-it-works-section"
import PricingSection from "@/components/landing/pricing-section"
import ShowcaseSection from "@/components/landing/showcase-section"
import StatsSection from "@/components/landing/stats-section"
import TestimonialsSection from "@/components/landing/testimonials-section"
import MainFooter from "@/components/layout/footer/main-footer"
import MainHeader from "@/components/layout/header/main-header"
import { ROUTES } from "@/constants/path"
import { Camera, Globe, MousePointerClick, Palette, Rocket, Shield, ShoppingBag, TrendingUp, Users, Zap } from "lucide-react"
import { useTranslations } from "next-intl"

export default function Home() {
  const t = useTranslations('Landing')

  // Hero Section Data
  const heroData = {
    badge: t('hero.badge'),
    title: t('hero.title'),
    titleHighlight: t('hero.titleHighlight'),
    description: t('hero.description'),
    startForFree: t('hero.startForFree'),
    exploreMarketplace: t('hero.exploreMarketplace'),
    rating: t('hero.rating'),
    startForFreeHref: ROUTES.CREATE_PORTFOLIO,
    exploreMarketplaceHref: ROUTES.MARKETPLACE,
    videoSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video-vzjr7k51nyB62iitsJPVrl9a6I8NKm.mp4"
  }

  // Features Section Data
  const featuresData = {
    title: t('features.title'),
    titleHighlight: t('features.titleHighlight'),
    description: t('features.description'),
    features: [
      {
        icon: Camera,
        title: t('features.portfolioBuilder.title'),
        description: t('features.portfolioBuilder.description')
      },
      {
        icon: Globe,
        title: t('features.customDomain.title'),
        description: t('features.customDomain.description')
      },
      {
        icon: ShoppingBag,
        title: t('features.digitalStore.title'),
        description: t('features.digitalStore.description')
      },
      {
        icon: Users,
        title: t('features.community.title'),
        description: t('features.community.description')
      },
      {
        icon: Zap,
        title: t('features.lightningFast.title'),
        description: t('features.lightningFast.description')
      },
      {
        icon: Shield,
        title: t('features.secure.title'),
        description: t('features.secure.description')
      }
    ]
  }

  // How It Works Section Data
  const howItWorksData = {
    title: t('howItWorks.title'),
    titleHighlight: t('howItWorks.titleHighlight'),
    description: t('howItWorks.description'),
    readyToStart: t('howItWorks.readyToStart'),
    createPortfolio: t('howItWorks.createPortfolio'),
    watchDemo: t('howItWorks.watchDemo'),
    steps: [
      {
        icon: MousePointerClick,
        number: "01",
        title: t('howItWorks.step1.title'),
        description: t('howItWorks.step1.description')
      },
      {
        icon: Palette,
        number: "02",
        title: t('howItWorks.step2.title'),
        description: t('howItWorks.step2.description')
      },
      {
        icon: Rocket,
        number: "03",
        title: t('howItWorks.step3.title'),
        description: t('howItWorks.step3.description')
      },
      {
        icon: TrendingUp,
        number: "04",
        title: t('howItWorks.step4.title'),
        description: t('howItWorks.step4.description')
      }
    ]
  }

  // Showcase Section Data
  const showcaseData = {
    title: t('showcase.title'),
    titleHighlight: t('showcase.titleHighlight'),
    description: t('showcase.description'),
    viewMore: t('showcase.viewMore'),
    showcaseItems: [
      {
        title: "Wedding Photography",
        photographer: "Sarah Johnson",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
        category: "Wedding"
      },
      {
        title: "Travel & Landscape",
        photographer: "Michael Chen",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
        category: "Travel"
      },
      {
        title: "Portrait Studio",
        photographer: "Emma Rodriguez",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
        category: "Portrait"
      },
      {
        title: "Fashion Editorial",
        photographer: "Alex Turner",
        image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80",
        category: "Fashion"
      },
      {
        title: "Wildlife Photography",
        photographer: "David Miller",
        image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=80",
        category: "Wildlife"
      },
      {
        title: "Architecture",
        photographer: "Lisa Anderson",
        image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
        category: "Architecture"
      }
    ]
  }

  // Stats Section Data
  const statsData = {
    stats: [
      { number: "10K+", label: t('stats.activeCreators') },
      { number: "50K+", label: t('stats.portfoliosCreated') },
      { number: "$2M+", label: t('stats.creatorEarnings') },
      { number: "4.9/5", label: t('stats.averageRating') }
    ]
  }

  // Pricing Section Data
  const pricingData = {
    title: t('pricing.title'),
    titleHighlight: t('pricing.titleHighlight'),
    description: t('pricing.description'),
    mostPopular: t('pricing.mostPopular'),
    getStarted: t('pricing.getStarted'),
    plans: [
      {
        name: t('pricing.starter.name'),
        price: t('pricing.starter.price'),
        period: t('pricing.starter.period'),
        description: t('pricing.starter.description'),
        features: [
          t('pricing.starter.feature1'),
          t('pricing.starter.feature2'),
          t('pricing.starter.feature3'),
          t('pricing.starter.feature4'),
          t('pricing.starter.feature5')
        ]
      },
      {
        name: t('pricing.pro.name'),
        price: t('pricing.pro.price'),
        period: t('pricing.pro.period'),
        description: t('pricing.pro.description'),
        features: [
          t('pricing.pro.feature1'),
          t('pricing.pro.feature2'),
          t('pricing.pro.feature3'),
          t('pricing.pro.feature4'),
          t('pricing.pro.feature5'),
          t('pricing.pro.feature6'),
          t('pricing.pro.feature7')
        ],
        popular: true
      },
      {
        name: t('pricing.business.name'),
        price: t('pricing.business.price'),
        period: t('pricing.business.period'),
        description: t('pricing.business.description'),
        features: [
          t('pricing.business.feature1'),
          t('pricing.business.feature2'),
          t('pricing.business.feature3'),
          t('pricing.business.feature4'),
          t('pricing.business.feature5'),
          t('pricing.business.feature6'),
          t('pricing.business.feature7')
        ]
      }
    ]
  }

  // Testimonials Section Data
  const testimonialsData = {
    title: t('testimonials.title'),
    titleHighlight: t('testimonials.titleHighlight'),
    description: t('testimonials.description'),
    testimonials: [
      {
        name: "Sarah Johnson",
        role: "Wedding Photographer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        rating: 5,
        text: "Lensor transformed my online presence. Within a month, I doubled my bookings and finally have a portfolio that truly represents my style."
      },
      {
        name: "Michael Chen",
        role: "Travel Photographer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        rating: 5,
        text: "The best investment I've made for my photography business. The marketplace feature alone has paid for my subscription 10x over."
      },
      {
        name: "Emma Rodriguez",
        role: "Portrait Photographer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
        rating: 5,
        text: "I love how easy it is to update my portfolio. No coding knowledge needed, and the templates are absolutely stunning!"
      }
    ]
  }

  // CTA Section Data
  const ctaData = {
    title: t('cta.title'),
    titleHighlight: t('cta.titleHighlight'),
    description: t('cta.description'),
    startBuilding: t('cta.startBuilding'),
    joinCommunity: t('cta.joinCommunity'),
    startBuildingHref: ROUTES.CREATE_PORTFOLIO,
    joinCommunityHref: ROUTES.FORUM
  }

  return (
    <>
      <MainHeader />
      <HeroSection {...heroData} />
      <FeaturesSection {...featuresData} />
      <HowItWorksSection {...howItWorksData} />
      <ShowcaseSection {...showcaseData} />
      <StatsSection {...statsData} />
      <PricingSection {...pricingData} />
      <TestimonialsSection {...testimonialsData} />
      <CTASection {...ctaData} />
      <MainFooter />
    </>
  )
}
