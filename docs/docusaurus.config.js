/* eslint-disable global-require,import/no-extraneous-dependencies */

// @ts-check
// 注意：类型注解允许类型检查和IDE自动补全
// eslint-disable-next-line import/no-extraneous-dependencies
const { ProvidePlugin } = require("webpack");
require("dotenv").config();

const prism = require("prism-react-renderer");

const baseLightCodeBlockTheme = prism.themes.vsLight;
const baseDarkCodeBlockTheme = prism.themes.vsDark;

const baseUrl = "/";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '🦜️🔗 Langchain | Langchainjs 中文文档',
  tagline: "LangChain Python 中文文档",
  favicon: "img/brand/favicon.png",
  // 设置站点的生产环境URL
  url: "https://langchain.transdocs.org",
  // 设置站点提供的 /<baseUrl>/ 路径
  // 对于GitHub Pages部署，通常是 '/<projectName>/'
  baseUrl: baseUrl,
  trailingSlash: true,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  onBrokenAnchors: "throw",

  themes: ["@docusaurus/theme-mermaid"],
  markdown: {
    mermaid: true,
  },

  plugins: [
    () => ({
      name: "custom-webpack-config",
      configureWebpack: () => ({
        plugins: [
          new ProvidePlugin({
            process: require.resolve("process/browser"),
          }),
        ],
        resolve: {
          fallback: {
            path: false,
            url: false,
          },
        },
        module: {
          rules: [
            {
              test: /\.m?js/,
              resolve: {
                fullySpecified: false,
              },
            },
            {
              test: /\.py$/,
              loader: "raw-loader",
              resolve: {
                fullySpecified: false,
              },
            },
            {
              test: /\.ya?ml$/,
              use: "yaml-loader",
            },
            {
              test: /\.ipynb$/,
              loader: "raw-loader",
              resolve: {
                fullySpecified: false,
              },
            },
          ],
        },
      }),
    }),
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          editUrl:
            "https://github.com/langchain-ai/langchain/edit/master/docs/",
          sidebarPath: require.resolve("./sidebars.js"),
          remarkPlugins: [
            [require("@docusaurus/remark-plugin-npm2yarn"), { sync: true }],
          ],
          async sidebarItemsGenerator({
            defaultSidebarItemsGenerator,
            ...args
          }) {
            const sidebarItems = await defaultSidebarItemsGenerator(args);
            sidebarItems.forEach((subItem) => {
              // 这允许通过在每个斜杠后插入零宽度空格来将长的侧边栏标签分成多行。
              if (
                "label" in subItem &&
                subItem.label &&
                subItem.label.includes("/")
              ) {
                // eslint-disable-next-line no-param-reassign
                subItem.label = subItem.label.replace(/\//g, "/\u200B");
              }
              if (args.item.className) {
                subItem.className = args.item.className;
              }
            });
            return sidebarItems;
          },
        },
        pages: {
          remarkPlugins: [require("@docusaurus/remark-plugin-npm2yarn")],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        googleTagManager: {
          containerId: "GTM-MH4VTX4V",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        { name: 'description', content: 'langchain 中文文档，每天定时同步官网更新。' },
        { name: 'keywords', content: 'langchain,中文文档' },
      ],
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      colorMode: {
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      announcementBar: {
        content:
          '<strong>我们的 <a href="https://academy.langchain.com/courses/ambient-agents/?utm_medium=internal&utm_source=docs&utm_campaign=q2-2025_ambient-agents_co" target="_blank">使用LangGraph构建环境代理</a> 课程现已在LangChain学院上线！</strong>',
        backgroundColor: "#d0c9fe",
      },
      prism: {
        theme: {
          ...baseLightCodeBlockTheme,
          plain: {
            ...baseLightCodeBlockTheme.plain,
            backgroundColor: "#F5F5F5",
          },
        },
        darkTheme: {
          ...baseDarkCodeBlockTheme,
          plain: {
            ...baseDarkCodeBlockTheme.plain,
            backgroundColor: "#222222",
          },
        },
      },
      image: "img/brand/theme-image.png",
      navbar: {
        logo: {
          src: "img/brand/wordmark.png",
          srcDark: "img/brand/wordmark-dark.png",
        },
        items: [
          {
            type: "docSidebar",
            position: "left",
            sidebarId: "integrations",
            label: "集成",
          },
          {
            label: "API 参考",
            to: "https://python.langchain.com/api_reference/",
          },
          {
            type: "下拉菜单",
            label: "更多",
            position: "left",
            items: [
              {
                type: "doc",
                docId: "contributing/index",
                label: "贡献",
              },
              {
                type: "doc",
                docId: "people",
                label: "人员",
              },
              {
                type: "doc",
                docId: "troubleshooting/errors/index",
                label: "错误参考",
              },
              {
                type: "html",
                value:
                  '<hr class="dropdown-separator" style="margin-top: 0.5rem; margin-bottom: 0.5rem">',
              },
              {
                href: "https://docs.smith.langchain.com",
                label: "LangSmith",
              },
              {
                href: "https://langchain-ai.github.io/langgraph/",
                label: "LangGraph",
              },
              {
                href: "https://smith.langchain.com/hub",
                label: "LangChain Hub",
              },
              {
                href: "https://js.langchain.com",
                label: "LangChain JS/TS",
              },
            ],
          },
          {
            type: "下拉菜单",
            label: "v0.3",
            position: "right",
            items: [
              {
                label: "v0.3",
                href: "/docs/introduction",
              },
              {
                label: "v0.2",
                href: "https://python.langchain.com/v0.2/docs/introduction",
              },
              {
                label: "v0.1",
                href: "https://python.langchain.com/v0.1/docs/get_started/introduction",
              },
            ],
          },
          {
            to: "https://chat.langchain.com",
            label: "💬",
            position: "right",
          },
          // 请保持GitHub链接在右侧以保持一致性。
          {
            href: "https://github.com/langchain-ai/langchain",
            position: "right",
            className: "header-github-link",
            "aria-label": "GitHub仓库",
          },
        ],
      },
      footer: {
        style: "light",
        links: [
          {
            title: "社区",
            items: [
              {
                label: "LangChain论坛",
                href: "https://forum.langchain.com/",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/LangChainAI",
              },
              {
                label: "Slack",
                href: "https://www.langchain.com/join-community",
              },
            ],
          },
          {
            title: "GitHub",
            items: [
              {
                label: "组织",
                href: "https://github.com/langchain-ai",
              },
              {
                label: "Python",
                href: "https://github.com/langchain-ai/langchain",
              },
              {
                label: "JS/TS",
                href: "https://github.com/langchain-ai/langchainjs",
              },
            ],
          },
          {
            title: "更多",
            items: [
              {
                label: "首页",
                href: "https://langchain.com",
              },
              {
                label: "博客",
                href: "https://blog.langchain.dev",
              },
              {
                label: "YouTube",
                href: "https://www.youtube.com/@LangChain",
              },
            ],
          },
        ],
        copyright: `版权所有 © ${new Date().getFullYear()} LangChain, Inc.`,
      },
      algolia: {
        // Algolia提供的应用程序ID
        appId: "VAU016LAWS",

        // 公共API密钥：提交是安全的
        // 目前链接到 erick@langchain.dev
        apiKey: "6c01842d6a88772ed2236b9c85806441",

        indexName: "python-langchain-latest",

        contextualSearch: false,
      },
    }),
  scripts: [
    {
      src: 'https://cdn.jsdmirror.com/gh/transdocs-org/cdn/transdocs-info-modal.js',
      defer: true
    },
    {
      src: 'https://hm.baidu.com/hm.js?2fe1095387fd2f2c25892a4fde2f0cc2',
      async: true
    },
  ],
  customFields: {
    supabasePublicKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  },
};

module.exports = config;