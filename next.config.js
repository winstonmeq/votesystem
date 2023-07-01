/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        //dre eh butang ang domain.. dire lng mag change automatic na ma update ang mga domain
    
       
           //LOCAL_URL: 'http://192.168.1.8:3000',
          LOCAL_URL: 'https://vms-green.vercel.app',

     },


   //   experimental: {
   //      appDir:true,
   //      serverComponentsExternalPackages:["mongoose"]
   //   },
     images: {
        domains:['lh3.googleusercontent.com']
     },
   //   webpack(config){
   //      config.experiments = {
   //          ...config.experiments,
   //          topLevelAwait: true,
   //      }
   //      return config
   //   }


}

module.exports = nextConfig
