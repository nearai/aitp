module.exports = {
  title: 'AITP',
  tagline: 'Agent Interaction & Transaction Protocol',
  url: 'https://aitp.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'nearai',
  projectName: 'aitp',
  plugins: [
    require.resolve('./plugins/schema-copy')
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false,
      },
    ],
  ],
};
