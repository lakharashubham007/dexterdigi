import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import ServiceContent from '@/components/service/ServiceContent'
import MembersCounter from '@/components/shared/MembersCounter'
import NewsLetter from '@/components/shared/NewsLetter'
import Pricing from '@/components/shared/Pricing'
import ProjectList from '@/data/projectsData';

import ProjectContent from '@/components/service/ProjectContent'
import PrimaryNavbar from '@/components/navbar/PrimaryNavbar'

export async function generateMetadata({ params }) {
  return {
    title: params.slug,
  }
}

export async function generateStaticParams() {
  const { ProjectData } = ProjectList
  return ProjectData.map((item) => ({
    slug: item.slug,
  }))
}

const ServiceDetails = (props) => {
  const { ProjectData } = ProjectList
  const slug = props.params.slug
  const data = ProjectData.find((post) => post.slug === slug)

  return (
    <>
      <PrimaryNavbar />
      {/* <SecondaryNavbar /> */}
      <main>
        {/* <ServiceContent data={data} /> */}
        <ProjectContent data={data} />
        <MembersCounter />
        <Pricing className={'pt-150 max-md:pt-20'} />
        <NewsLetter />
      </main>
      <Footer />
    </>
  )
}

export default ServiceDetails
