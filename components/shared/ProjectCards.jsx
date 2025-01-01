'use client';
import { fadeUpAnimation } from '@/data/animation';
import ProjectList from '@/data/projectsData';
import useWhileInView from '@/hooks/useWhileInView';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

const ProjectCards = ({ activeFilter }) => {
  const ref = useRef(null);
  const controlAnimation = useWhileInView(ref);
  const { ProjectData } = ProjectList;

  // Filter projects based on the selected category
  const filteredProjects =
    activeFilter === 'ALL'
      ? ProjectData // Show all projects if 'ALL' is selected
      : ProjectData?.filter((project) => project?.category === activeFilter);

      console.log(filteredProjects,"filteredProjects")

  return (
    <motion.div
      className="grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-sm:grid-cols-1"
      ref={ref}
      initial="initial"
      animate={controlAnimation}
      variants={fadeUpAnimation}>
      {filteredProjects.length > 0 ? (
        filteredProjects.map((project) => (
          <div
            className="relative scale-100 rounded-medium bg-white p-2.5 shadow-nav transition-transform duration-500 hover:scale-105 hover:transition-transform hover:duration-500 dark:bg-dark-200"
            key={project.id}>
            <div className="h-full rounded border border-dashed border-gray-100 p-10 dark:border-borderColor-dark max-lg:p-5">
              <Image
                src={project.iconLight}
                alt="project logo"
                className="mb-6 inline-block dark:hidden"
                width={40}
                height={40}
              />
              <Image
                src={project.iconDark}
                alt="project logo"
                className="mb-6 hidden dark:inline-block"
                width={40}
                height={40}
              />
              <Link href={`/portfolio/${project.slug}`} className="block">
                <h3 className="mb-2.5">{project.title}</h3>
              </Link>
              <p className="mb-6">{project.excerpt}</p>
              <Link href={`/portfolio/${project.slug}`} className="btn-outline btn-sm">
                Read More
              </Link>
            </div>
          </div>
        ))
      ) : (
        <>       
         <div
            className="relative scale-100 rounded-medium bg-white p-2.5 shadow-nav transition-transform duration-500 hover:scale-105 hover:transition-transform hover:duration-500 dark:bg-dark-200"
            key={'id'}>
            <div className="h-full rounded border border-dashed border-gray-100 p-10 dark:border-borderColor-dark max-lg:p-5">
              
             
              <p className="mb-6">No Projects available.</p>
              
                
            
            </div>
          </div>
</>
      )}
    </motion.div>
  );
};

export default ProjectCards;






















// 'use client';
// import { fadeUpAnimation } from '@/data/animation';
// import ProjectList from '@/data/projectsData';
// import useWhileInView from '@/hooks/useWhileInView';
// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useRef } from 'react';

// const ProjectCards = ({ activeFilter }) => {
//   const ref = useRef(null);
//   const controlAnimation = useWhileInView(ref);
//   const { ProjectData } = ProjectList;

//   const filteredProjects =
//     activeFilter === 'ALL'
//       ? ProjectData
//       : ProjectData.filter((project) => project.category === activeFilter);

//   return (
//     <motion.div
//       className="grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-sm:grid-cols-1"
//       ref={ref}
//       initial="initial"
//       animate={controlAnimation}
//       variants={fadeUpAnimation}>
//       {filteredProjects?.map((project) => (
//         <div
//           className="relative scale-100 rounded-medium bg-white p-2.5 shadow-nav transition-transform duration-500 hover:scale-105 hover:transition-transform hover:duration-500 dark:bg-dark-200"
//           key={project.id}>
//           <div className="h-full rounded border border-dashed border-gray-100 p-10 dark:border-borderColor-dark max-lg:p-5">
//             <Image
//               src={project.iconLight}
//               alt="project logo"
//               className="mb-6 inline-block dark:hidden"
//               width={40}
//               height={40}
//             />
//             <Image
//               src={project.iconDark}
//               alt="project logo"
//               className="mb-6 hidden dark:inline-block"
//               width={40}
//               height={40}
//             />
//             <Link href={`/portfolio/${project.slug}`} className="block">
//               <h3 className="mb-2.5">{project.title}</h3>
//             </Link>
//             <p className="mb-6">{project.excerpt}</p>
//             <Link href={`/portfolio/${project.slug}`} className="btn-outline btn-sm">
//               Read More
//             </Link>
//           </div>
//         </div>
//       )
//       )}
//     </motion.div>
//   );
// };

// export default ProjectCards;
