import Link from 'next/link'
import { FaFacebook, FaGithub } from 'react-icons/fa'
import { LiaFacebook } from 'react-icons/lia'
import { VscGithub } from 'react-icons/vsc'

export default function MainFooter() {
     return (
          <footer className="border-t border-gray-800">
               <div className="container mx-auto px-4">
                    <div className="flex flex-col py-10 md:flex-row justify-between items-center">
                         <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4 md:mb-0">
                              Lensor
                         </div>
                         <div className="flex items-center space-x-8">
                              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                                   Templates
                              </Link>
                              <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">
                                   Pricing
                              </Link>
                              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                                   Contact
                              </Link>
                              <div className="flex space-x-4">
                                   <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                                        <FaFacebook className='w-5 h-5' />
                                   </Link>
                                   <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                                        <FaGithub className='w-5 h-5' />
                                   </Link>
                                   <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                                        {/* <Instagram className="w-5 h-5" /> */}
                                   </Link>
                              </div>
                         </div>
                    </div>
                    <div className="pt-4 border-t border-gray-800 text-center text-gray-400">
                         <p>&copy; 2025 Lensor. All rights reserved.</p>
                    </div>
               </div>
          </footer>
     )
}
