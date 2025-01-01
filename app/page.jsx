// import Cta from '@/components/home-1/Cta'
// import Faq from '@/components/home-1/Faq'
// import Hero from '@/components/home-1/Hero'
// import Integration from '@/components/home-1/Integration'
// import Solution from '@/components/home-1/Solution'
// import Vision from '@/components/home-1/Vision'
// import PrimaryNavbar from '@/components/navbar/PrimaryNavbar'
// import Clients from '@/components/shared/Clients'
// import Counter from '@/components/shared/Counter'
// import FinancialBlog from '@/components/shared/FinancialBlog'
// import Services from '@/components/shared/Services'
// import Testimonial from '@/components/shared/Testimonial'

import Footer from '@/components/footer/Footer';
import GetStart from '@/components/home-8/GetStart';
import Hero from '@/components/home-8/Hero';
import Integration from '@/components/home-8/Integration';
import RobustFeatures from '@/components/home-8/RubustFeature';
import Steps from '@/components/home-8/Steps';
import PrimaryNavbar from '@/components/navbar/PrimaryNavbar';
import NewsLetterV2 from '@/components/shared/NewsLetterV2';
import Pricing from '@/components/shared/Pricing';
import Testimonial from '@/components/shared/Testimonial';
import Clients from '@/components/shared/Clients';
import Integration1 from '@/components/home-1/Integration';

export const metadata = {
  title: 'DexterDigi.com',
};

export default function Home() {
  return (
    <>
      <PrimaryNavbar />
      <main>
        <Hero />
        <Clients />
        <GetStart />
        <Steps />
        <RobustFeatures />
        <Pricing />
        <Integration />
        <Testimonial />
        <Integration1 />
        <NewsLetterV2 />
      </main>
      <Footer />
    </>
  );
}
