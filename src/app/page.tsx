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
import { MessageSquare, ShoppingBag, UserPlus, TrendingUp, Download, Shield, Users, Palette, Rocket, Search } from "lucide-react"
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
    startForFreeHref: ROUTES.FORUM,
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
        icon: MessageSquare,
        title: t('features.portfolioBuilder.title'),
        description: t('features.portfolioBuilder.description')
      },
      {
        icon: ShoppingBag,
        title: t('features.customDomain.title'),
        description: t('features.customDomain.description')
      },
      {
        icon: TrendingUp,
        title: t('features.digitalStore.title'),
        description: t('features.digitalStore.description')
      },
      {
        icon: Users,
        title: t('features.community.title'),
        description: t('features.community.description')
      },
      {
        icon: Download,
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
        icon: UserPlus,
        number: "01",
        title: t('howItWorks.step1.title'),
        description: t('howItWorks.step1.description')
      },
      {
        icon: Search,
        number: "02",
        title: t('howItWorks.step2.title'),
        description: t('howItWorks.step2.description')
      },
      {
        icon: MessageSquare,
        number: "03",
        title: t('howItWorks.step3.title'),
        description: t('howItWorks.step3.description')
      },
      {
        icon: Palette,
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
        title: "Moody Film Preset",
        photographer: "Sarah Johnson",
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80",
        category: "Film"
      },
      {
        title: "Golden Hour Pack",
        photographer: "Michael Chen",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
        category: "Landscape"
      },
      {
        title: "Portrait Pro Presets",
        photographer: "Emma Rodriguez",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
        category: "Portrait"
      },
      {
        title: "Urban Street Tones",
        photographer: "Alex Turner",
        image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
        category: "Street"
      },
      {
        title: "Cinematic Color Grade",
        photographer: "David Miller",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
        category: "Cinematic"
      },
      {
        title: "Vintage Film Look",
        photographer: "Lisa Anderson",
        image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80",
        category: "Vintage"
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
    platformFee: t('pricing.platformFee'),
    feeDescription: t('pricing.feeDescription'),
    features: {
      title: t('pricing.features.title'),
      list: [
        t('pricing.features.feature1'),
        t('pricing.features.feature2'),
        t('pricing.features.feature3'),
        t('pricing.features.feature4'),
        t('pricing.features.feature5'),
        t('pricing.features.feature6'),
        t('pricing.features.feature7')
      ]
    }
  }

  // Testimonials Section Data
  const testimonialsData = {
    title: t('testimonials.title'),
    titleHighlight: t('testimonials.titleHighlight'),
    description: t('testimonials.description'),
    testimonials: [
      {
        name: "Sarah Johnson",
        role: "Preset Creator",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        rating: 5,
        text: "I've sold over 500 presets on Lensor! The community is amazing and the marketplace makes it so easy to reach customers worldwide."
      },
      {
        name: "Michael Chen",
        role: "Professional Photographer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        rating: 5,
        text: "The preset marketplace has completely elevated my editing workflow. I've discovered incredible tools and connected with talented photographers in the forum."
      },
      {
        name: "Emma Rodriguez",
        role: "Content Creator",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
        rating: 5,
        text: "Best photography community I've found! The forum discussions are invaluable and I've learned so much from other creators. Plus, the presets are top-notch!"
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
    startBuildingHref: ROUTES.FORUM,
    joinCommunityHref: ROUTES.MARKETPLACE
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
