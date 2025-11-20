import { Facebook, Github, Instagram, Twitter, Mail } from 'lucide-react'
import Link from 'next/link'

export default function MainFooter() {
     return (
          <footer className="border-t border-gray-800 bg-neutral-950">
               <div className="container mx-auto px-4">
                    {/* Main Footer Content */}
                    <div className="grid md:grid-cols-4 gap-12 py-16">
                         {/* Brand Section */}
                         <div className="space-y-4">
                              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                   Lensor
                              </div>
                              <p className="text-gray-400 text-sm leading-relaxed">
                                   Empowering photographers to build stunning portfolios and grow their creative business.
                              </p>
                              <div className="flex space-x-4 pt-2">
                                   <Link href="#" className="w-10 h-10 rounded-full bg-neutral-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/50 transition-all">
                                        <Facebook className='w-5 h-5' />
                                   </Link>
                                   <Link href="#" className="w-10 h-10 rounded-full bg-neutral-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/50 transition-all">
                                        <Twitter className='w-5 h-5' />
                                   </Link>
                                   <Link href="#" className="w-10 h-10 rounded-full bg-neutral-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/50 transition-all">
                                        <Instagram className="w-5 h-5" />
                                   </Link>
                                   <Link href="#" className="w-10 h-10 rounded-full bg-neutral-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/50 transition-all">
                                        <Github className='w-5 h-5' />
                                   </Link>
                              </div>
                         </div>

                         {/* Product Links */}
                         <div>
                              <h3 className="text-white font-semibold mb-4">Product</h3>
                              <ul className="space-y-3">
                                   <li>
                                        <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                                             Portfolio Builder
                                        </Link>
                                   </li>
                                   <li>
                                        <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                                             Templates
                                        </Link>
                                   </li>
                                   <li>
                                        <Link href="#pricing" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                                             Pricing
                                        </Link>
                                   </li>
                                   <li>
                                        <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                                             Custom Domains
                                        </Link>
                                   </li>
                              </ul>
                         </div>

                         {/* Community Links */}
                         <div>
                              <h3 className="text-white font-semibold mb-4">Community</h3>
                              <ul className="space-y-3">
                                   <li>
                                        <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                                             Forum
                                        </Link>
                                   </li>
                                   <li>
                                        <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                                             Marketplace
                                        </Link>
                                   </li>
                                   <li>
                                        <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                                             Success Stories
                                        </Link>
                                   </li>
                                   <li>
                                        <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                                             Blog
                                        </Link>
                                   </li>
                              </ul>
                         </div>

                         {/* Support Links */}
                         <div>
                              <h3 className="text-white font-semibold mb-4">Support</h3>
                              <ul className="space-y-3">
                                   <li>
                                        <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                                             Help Center
                                        </Link>
                                   </li>
                                   <li>
                                        <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                                             Documentation
                                        </Link>
                                   </li>
                                   <li>
                                        <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                                             Contact Us
                                        </Link>
                                   </li>
                                   <li>
                                        <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm flex items-center gap-2">
                                             <Mail className="w-4 h-4" />
                                             support@lensor.com
                                        </Link>
                                   </li>
                              </ul>
                         </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="py-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                         <p className="text-gray-400 text-sm">
                              &copy; 2025 Lensor. All rights reserved.
                         </p>
                         <div className="flex items-center gap-6">
                              <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                                   Privacy Policy
                              </Link>
                              <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                                   Terms of Service
                              </Link>
                              <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                                   Cookie Policy
                              </Link>
                         </div>
                    </div>
               </div>
          </footer>
     )
}
