import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";
import { getDirname, path } from "vuepress/utils";
// import { defaultTheme } from "@vuepress/theme-default";
import { plumeTheme } from "vuepress-theme-plume";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "亦谙",
  description: "亦谙博客",
  port: 3000,

  head: [["link", { rel: "icon", href: "/favicon.ico" }]],

  pagePatterns: ["**/*.md", "!.vuepress", "!node_modules"],

  permalinkPattern: "",

  theme: plumeTheme({
    // 部署站点域名
    hostname: "",

    plugins: {
      // 语法高亮插件
      shiki: {
        languages: [
          "bat",
          "sh",
          "shell",
          "shellscript",
          "cmake",
          "makefile",
          "dockerfile",
          "lua",
          "xml",
          "json",
          "jsonc",
          "properties",
          "yaml",
          "csv",
          "markdown",
          "c",
          "cpp",
          "java",
          "kotlin",
          "python",
          "csharp",
          "go",
          "groovy",
          "javascript",
          "sql",
          "html",
          "js",
          "css",
          "vue",
          "latex"
        ],
        // https://shiki.style/themes
        theme: { light: "github-light", dark: "material-theme-darker" },
      },

      // markdown插件
      markdownPower: {
        // 启用pdf阅读
        // @[pdf](https://plume.pengzhanbo.cn/files/sample.pdf)
        pdf: true,
        // Bilibili视频
        // @[bilibili p1](aid cid)
        bilibili: true,
        // Youtube视频
        // @[youtube](id)
        youtube: true,
      },
    },
  }),

  plugins: [],

  alias: {
    // '@alias': path.resolve(__dirname, './path/to/some/dir'),
    "@theme/VPFooter.vue": path.resolve(__dirname, "./components/MyFooter.vue"),
  },

  bundler: viteBundler(),
});
