const path = require('path')

module.exports = {
  base: "/", // 部署站点的基础路径
  title: "VuePress", // 网站的标题
  description: "Vue 驱动的静态网站生成器", // 网站的描述
  head: [ // 额外的需要被注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/logo.png' }], // 自定义的 favicon
    // ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    // ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    // ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    // ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
  ],
  // host: '0.0.0.0', // 指定用于 dev server 的主机名
  // port: 8080, // 指定 dev server 的端口
  // temp: '/path/to/@vuepress/core/.temp', // 指定客户端文件的临时目录
  // dest: '.vuepress/dist', // 指定 vuepress build 的输出目录
  locales: { // 提供多语言支持的语言配置
    '/en/': {
      lang: 'en-US',
      title: 'VuePress',
      description: 'Vue-powered Static Site Generator'
    },
    '/': {
      lang: 'zh-CN',
      title: 'VuePress',
      description: 'Vue 驱动的静态网站生成器'
    },
  },
  alias: {
    '@styles': path.resolve(__dirname, './styles'),
    '@assets': path.resolve(__dirname, './assets'),
  },
  // theme: 'reco', // 当你使用自定义主题的时候，需要指定它
  themeConfig: { // 为当前的主题提供一些配置

    /** =============================================
     * * 导航栏
     */

    logo: '/logo.png', // 导航栏 Logo
    // navbar: false, // 禁用所有页面的导航栏
    nav: [ // 导航栏链接
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      {
        text: '选择语言',
        ariaLabel: '语言菜单',
        items: [
          { text: '简体中文', link: '/' },
          { text: 'English', link: '/en/' }
        ]
      },
      { text: 'External', link: 'https://google.com' }, // 外链
    ],

    /** =============================================
     * * 侧边栏
     */

    sidebar: 'auto', // 自动生成侧栏
    // sidebar: [ // 侧边栏
    //   '/',
    //   '/page-a',
    //   ['/page-b', 'Explicit link text']
    // ],
    // sidebar: [ // 侧边栏 分组
    //   {
    //     title: 'Group 1',   // 必要的
    //     path: '/foo/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    //     collapsable: false, // 可选的, 默认值是 true,
    //     sidebarDepth: 1,    // 可选的, 默认值是 1
    //     children: [
    //       '/'
    //     ]
    //   },
    //   {
    //     title: 'Group 2',
    //     children: [ /* ... */ ],
    //     initialOpenGroupIndex: -1 // 可选的, 默认值是 0
    //   }
    // ],

    /** =============================================
     * * 搜索框
     * 内置搜索只会为页面的标题、h2 、 h3 以及 tags 构建搜索索引
     */

    // search: false, // 禁用默认的搜索框
    // searchMaxSuggestions: 10, // 搜索框显示的搜索结果数量

    /** =============================================
     * * 其他
     */

    // displayAllHeaders: true // 显示所有页面的标题链接 false
    // activeHeaderLinks: false, // 活动的标题链接 true
    lastUpdated: '最后更新时间', // 最后更新时间 string(前缀) | boolean
    // nextLinks: false, // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
    // prevLinks: false, // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
    smoothScroll: true, // 页面滚动效果

    /** =============================================
     * * Git 仓库和编辑链接
     */

    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'SLC5514/standard/tree/master/vuepress-init',
    // 自定义仓库链接文字。
    repoLabel: 'GitHub',

    // 以下为可选的编辑链接选项

    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'SLC5514/standard/tree/master/vuepress-init',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'master',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '帮助我们改善此页面！'
  },
  plugins: [ // 使用插件
  ],
  markdown: {
    lineNumbers: true, // 是否在每个代码块的左侧显示行号
    anchor: { // 页眉锚点 https://github.com/valeriangalliat/markdown-it-anchor
      permalink: true, // 是否在标题旁边添加永久链接
      permalinkBefore: true, // 将永久链接放在标题之前
      permalinkSymbol: '#' // 永久链接锚点中的符号
    },
    plugins: [ // 使用插件
    ],
  },
  // pages: [
  //   {
  //     lastUpdated: 1524027677000,
  //     path: "/",
  //     title: "VuePress",
  //     frontmatter: {}
  //   }
  // ],
};
