import { BASE_URL } from "@/constants";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com", "i.pinimg.com", "14.169.52.232", "lensor.klong.io.vn"],
  },
};
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
