import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import sidebarItemsGenerator from "./src/plugin/sidebarItemsGenerator";

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

  scripts: [
    'https://buttons.github.io/buttons.js',
    'https://use.fontawesome.com/221fd444f5.js',
    'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit',
  ],
  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;900&family=Source+Code+Pro:ital,wght@0,400;0,600;1,400;1,600&display=swap',
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/nearai/aitp/tree/main/website/',
          routeBasePath: '/',
          sidebarItemsGenerator,
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
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'AITP: Agent Interaction & Transaction Protocol',
      items: [
        {
          href: 'https://github.com/nearai/aitp',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'html', position: 'right',
          value: '<a class="navbar__link false" href="#" onclick="google.translate.TranslateElement({pageLanguage: \'en\', includedLanguages: \'af,sq,am,en,fa,ar,ps,ja,zh-CN,hy,az,eu,be,bn,bs,bg,ca,ceb,ny,zh-TW,co,hr,cs,da,nl,eo,et,tl,fi,fr,fy,gl,ka,de,el,gu,ht,ha,haw,iw,hi,hmn,hu,is,ig,id,ga,it,jw,kn,kk,km,ko,ku,ky,lo,la,lv,lt,lb,mk,mg,ms,ml,mt,mi,mr,mn,my,ne,no,pl,pt,pa,ro,ru,sm,gd,sr,st,sn,sd,si,sk,sl,so,es,su,sw,sv,tg,ta,te,th,tr,uk,ur,uz,vi,cy,xh,yi,yo,zu\'}, \'google_translate_element\');"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" style="vertical-align: text-bottom"><path fill="currentColor" d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"></path></svg></a>',
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
