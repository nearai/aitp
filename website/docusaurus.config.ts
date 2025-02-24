import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'AITP',
  tagline: 'Agent Interaction & Transaction Protocol',

  // Set the production url of your site here
  url: 'https://aitp.dev',
  baseUrl: '/',
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'nearai',
  projectName: 'aitp',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  staticDirectories: ['static', '../schemas'],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/nearai/aitp/tree/main/website/',
          routeBasePath: '/'
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-SQ70S0ST9B',
          anonymizeIP: true,
        }
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    require.resolve('docusaurus-lunr-search'),
    'vercel-analytics'
  ],

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'AITP: Agent Interaction & Transaction Protocol',
      items: [
        {
          href: 'https://github.com/nearai/aitp',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          label: 'Telegram Community',
          href: 'https://t.me/nearaialpha',
        },
        {
          label: 'X',
          href: 'https://x.com/near_ai',
        },
        {
          label: 'NEAR AI',
          href: 'https://near.ai',
        },

        {
          label: 'GitHub',
          href: 'https://github.com/nearai/aitp',
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} NEAR AI. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
