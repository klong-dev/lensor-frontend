import Sidebar from '@/components/layout/sidebar/sidebar'
import { ROUTES } from '@/constants/path'
import { useTranslations } from 'next-intl'
import React from 'react'
import { FaHome, FaLayerGroup, FaMoneyCheckAlt, FaShoppingCart, FaTools, FaUser } from 'react-icons/fa'
import { FaCircleQuestion, FaMessage, FaShop } from 'react-icons/fa6'

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
     const t = useTranslations('Sidebar')

     const sidebar = [
          {
               title: t('main-menu'),
               subs: [
                    {
                         label: t('forum'),
                         icon: <FaHome />,
                         href: ROUTES.FORUM
                    },
                    {
                         label: t('profile'),
                         icon: <FaUser />,
                         href: ROUTES.PROFILE('36')
                    },
                    {
                         label: t('create-portfolio'),
                         icon: <FaLayerGroup />,
                         href: ROUTES.PORTFOLIO
                    },
                    {
                         label: t('message'),
                         icon: <FaMessage />,
                         href: ROUTES.MESSAGE
                    },
               ]
          },
          {
               title: t('marketplaces'),
               subs: [
                    {
                         label: t('marketplace'),
                         icon: <FaShop />,
                         href: ROUTES.MARTKETPLACE
                    },
                    {
                         label: t('purchased-presets'),
                         icon: <FaMoneyCheckAlt />,
                         href: ROUTES.PURCHASED_PRESET
                    },
                    {
                         label: t('cart'),
                         icon: <FaShoppingCart />,
                         href: ROUTES.CART
                    },
               ]
          },
          {
               title: t('settings'),
               subs: [
                    {
                         label: t('setting'),
                         icon: <FaTools />,
                         href: ROUTES.SETTING
                    },
                    {
                         label: t('help'),
                         icon: <FaCircleQuestion />,
                         href: ROUTES.HELP
                    },
               ]
          }
     ]

     return (
          <div className='grid grid-cols-[256px_1fr]'>
               <div>
                    <Sidebar listItems={sidebar} />
               </div>
               <section>
                    {children}
               </section>
          </div>
     )
}
