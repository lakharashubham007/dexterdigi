'use client';
import { useState } from 'react';
import ServiceBoxes from './ServiceBoxes';
import ProjectCards from './ProjectCards';

const Services = ({ sectionDetails = true }) => {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filters = ['ALL', 'Web Development', 'Mobile'];
  return (
    <section className="relative bg-white pb-150 dark:bg-dark-300 sm:overflow-hidden">
      <div className="absolute left-0 right-0 top-25 h-full w-full bg-[url('/images/service-bg.png')] bg-cover bg-center bg-no-repeat opacity-70 sm:hidden"></div>
      <div className="container">
        {sectionDetails && (
          <div className="mb-12">
            <p className="section-tagline max-lg:text-center">Our Services</p>
            <div className="block max-lg:text-center lg:flex">
              <h2 className=" max-lg:mb-5">
                The world&rsquo;s best companies <br />
                trust aplio.
              </h2>
              <p className="max-w-[520px] lg:ml-auto">
                Until recently, the prevailing view assumed lorem ipsum was born
                as a nonsense text. It&rsquo;s not Latin, though it looks like
                it
              </p>
            </div>
          </div>
        )}
        {/* <div className="mb-8 mt-5 flex flex-wrap justify-center gap-4" >
          {filters.map((filter) => (
            <button
              key={filter}
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                activeFilter === filter
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-primary-100 hover:text-primary-700 dark:bg-dark-200 dark:text-gray-400 dark:hover:bg-dark-400'
              } transition-all duration-200`}
              onClick={() => setActiveFilter(filter)}>
              {filter}
            </button>
          ))}
        </div> */}
        <div className="relative z-10">
          <div className="absolute left-1/2 top-1/2 -z-10 flex -translate-x-1/2  -translate-y-1/2 max-sm:hidden">
            <div className="rounded-full bg-primary-200/20 blur-[145px] lg:h-[330px] lg:w-[330px] xl:h-[442px] xl:w-[442px] "></div>
            <div className="rounded-full bg-primary-200/25 blur-[145px] lg:-ml-[170px] lg:h-[330px] lg:w-[330px] xl:h-[442px] xl:w-[442px]"></div>
            <div className="lg-ml-[170px] rounded-full bg-primary-200/20 blur-[145px] lg:h-[330px] lg:w-[330px] xl:h-[442px] xl:w-[442px]"></div>
          </div>
          <ServiceBoxes />
          {/* <ProjectCards activeFilter={activeFilter}/> */}
        </div>
      </div>
    </section>
  );
};

export default Services;
