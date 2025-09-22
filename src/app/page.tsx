'use client'

import MainHeader from "@/components/layout/header/main-header"
import { Button } from "@mantine/core"
import { useTranslations } from "next-intl"
import Link from 'next/link'

export default function Home() {
  const t = useTranslations ('HomePage')
  return (
    <div className="">
      <MainHeader isLogin={false} />
    </div>
  )
}
