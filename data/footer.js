import { Behance, Facebook, Github, LinkedIn } from './svgImages';
export const FooterData = {
  logo: '/images/newlogolight.png',
  logoDark: '/images/newlogodark.png',
  footerText:
    'Now turn your idea into technology and build your dream business with latest technology.',
  copyright: `${new Date().getFullYear()} DexterDigi. All Rights Reserved`,
  email: 'info@dexterdigi.com',
  phone: '+91 800-5874-335',
  expolre: [
    {
      id: 1,
      name: 'About',
      link: '/about',
    },
    {
      id: 2,
      name: 'Services',
      link: '/services',
    },
    {
      id: 3,
      name: 'Career',
      link: '/career',
    },
    // {
    //   id: 4,
    //   name: 'Payment',
    //   link: '/home-2',
    // },

    // {
    //   id: 7,
    //   name: 'Testimonials',
    //   link: '/testimonial',
    // },
  ],
  resources: [
    // {
    //   id: 1,
    //   name: 'Banking',
    //   link: '/home-3',
    // },
    {
      id: 1,
      name: 'Team',
      link: '/teams',
    },
    {
      id: 2,
      name: "Faq's",
      link: '/faq',
    },
    {
      id: 3,
      name: 'Pricing',
      link: '/price',
    },

    // {
    //   id: 3,
    //   name: 'Integration',
    //   link: '/integration',
    // },
    // {
    //   id: 4,
    //   name: 'Blog',
    //   link: '/blog',
    // },
    // {
    //   id: 5,
    //   name: 'Log In',
    //   link: '/login',
    // },
    // {
    //   id: 6,
    //   name: 'Sign Up',
    //   link: '/signup',
    // },
    // {
    //   id: 7,
    //   name: '404',
    //   link: '/not-found',
    // },
  ],

  socialLinks: [
    {
      id: 1,
      name: <Facebook />,
      link: '#',
    },
    {
      id: 2,
      name: <Github />,
      link: '#',
    },
    {
      id: 3,
      name: <LinkedIn />,
      link: '#',
    },
    {
      id: 4,
      name: <Behance />,
      link: '#',
    },
  ],
};
