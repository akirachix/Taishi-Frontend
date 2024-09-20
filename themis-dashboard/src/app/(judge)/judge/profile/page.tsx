        import React from 'react'; import Image from 'next/image'; 
        import { Camera } from 'lucide-react'; import Layout from '../Layout'; 
import Link from 'next/link';
        const ProfilePage: React.FC = () => { 

            
            return (
                <Layout>
                    <div className="flex bg-white"> 
                        <div className="flex-1 p-8">
                            <div className="max-w-md mx-auto"> 
                                
                                <div className="text-center mb-8 nh:mb-2"> 
                                    <div className="relative inline-block">
                                        <Image src="/ladyjustice.png" 
                                         alt="Amani Mwangi" width={200} height={200} className="rounded-full nh:h-48 nh:w-48" /> 
                                        
                                        <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md"> <Camera size={24} color="#333" /> 
                                        </button>
                                        </div> <h1 className="text-[24px] font-bold mt-4">Amani Mwangi</h1> </div>
                                      
                                        <div className="space-y-4">
                                            <div> <label className="block text-lg font-medium text-gray-700 text-[24px]">Email:</label> <input type="text"
                                            value="amanimwangi@gmail.com" 
                                            readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 px-3 py-2" /> 
                                            </div> 
                                            <div> 
                                                <label className="block text-lg font-medium text-gray-700">Password:
                                                    </label>
                                                    
                                                    <input 
                                                    type="password" 
                                                    value="••••••••" 
                                                    readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 px-3 py-2" /> 
                                                    </div> 

                                                    <Link href="https://themis-informational.vercel.app/">
                                                    <button className="w-full bg-green-900 text-white py-4 px-6 rounded-md hover:bg-green-800 transition duration-300 text-[24px]"> About </button>
                                                    </Link>
                                                     </div> 
                                                    </div> 
                                                    </div> 
                                                    </div> 
                                                    </Layout> ); };
                                                    export default ProfilePage; 