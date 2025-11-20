import { BASE_URL } from "@/constants";
import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com', 'i.pinimg.com', '14.169.52.232'],
  }
};
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
