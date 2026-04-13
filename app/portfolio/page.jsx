import Footer from '@/components/footer/Footer';
import PrimaryNavbar from '@/components/navbar/PrimaryNavbar';
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar';
import MembersCounter from '@/components/shared/MembersCounter';
import NewsLetter from '@/components/shared/NewsLetter';
import PageHero from '@/components/shared/PageHero';
import Pricing from '@/components/shared/Pricing';
import Projects from '@/components/shared/Projects';

export const metadata = {
  title: 'Portfolio',
};
export default function ServicePage() {
  return (
    <>
      {/* <SecondaryNavbar /> */}
      <PrimaryNavbar />
      <main>
        <PageHero
          subtitle="OUR PROJECTS"
          title="The world’s best companies <br> trust Drexterdigi "
          paragraph="Discover our clients' exceptional work, innovative solutions, and comprehensive case studies that showcase their journey toward success with Drexterdigi."
        />
        <Projects sectionDetails={false} />
        <MembersCounter />
        <Pricing className={'pt-150 max-md:pt-20'} />
        <NewsLetter />
      </main>
      <Footer />
    </>
  );
}
