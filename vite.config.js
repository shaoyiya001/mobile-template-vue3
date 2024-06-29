import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import px2rem from "postcss-px2rem"  // 分辨率适配
// autoprefixer 不兼容 postcss-px2rem
// import autoprefixer from "autoprefixer"
// 兼容低版本浏览器
import legacy from '@vitejs/plugin-legacy'
import viteCompression from 'vite-plugin-compression'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // 打包路径
  assetsInclude: resolve(__dirname, './src/assets'), // 静态资源处理
  build: {
    target: 'modules',
    outDir: 'dist', // 指定输出路径
    assetsDir: 'assets', // 指定生成静态资源的存放路径
    minify: 'terser', // 混淆器，terser构建后文件体积更小 npm install terser 安装 / 项目压缩：boolean | 'terser' | 'esbuild'
    emptyOutDir: true, // 打包前先清空原有打包文件
    // chunkSizeWarningLimit: 1000, // chunk 大小警告的限制（以 kbs 为单位）默认：500
    cssTarget: 'chrome61', // 防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制符号的形式 （要兼容的场景是安卓微信中的 webview 时,它不支持 css 中的 #RGBA 十六进制颜色符号）
    // 清除console和debugger
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      treeshake: false,
      // input: { // 可以配置多个，表示多入口
      // 方便运维配置，我把index.html入口文件名和指定输出路径文件改为同名了，但是开发环境没有index.html会导致页面空白，所以我是再复制一份出来命名为index.html
      // main: resolve(__dirname, 'decisionAnalysis.html'),
      // nested: resolve(__dirname, 'nested/index.html')
      // },
      output: { // 配置这个是让不同类型文件放在不同文件夹，不会显得太乱
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
        manualChunks(id) { // 静态资源分拆打包
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    legacy({
      targets: [
        'last 2 versions',
        'iOS >= 10',
        'Android >= 6',
        'Chrome >= 49',
        'Safari >= 10',
        'Samsung >= 5',
        'OperaMobile >= 46',
        // 其他特定版本或者范围
        "cover 99.5%"
      ],
    }),
    viteCompression({ // 压缩，让体积更小
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    AutoImport({
      resolvers: [VantResolver()],
    }),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  // 引入第三方配置 强制预构建插件包
  optimizeDeps: {
    include: ["axios"],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      components: resolve(__dirname, './src/components'),
      asserts: resolve(__dirname, './src/assets'),
      // vite解决警告:vue-i18n.esm-bundler.js:39 You are running the esm-bundler build of vue-i18n. It is recomme
      // 'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    },
    // 导入时想要省略的扩展名列表
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  server: {
    host: '0.0.0.0',
    port: 8080, // 服务端口号
    open: true, // 服务启动时是否自动打开浏览器
    hmr: true, // 开启热更新
    cors: true, // 允许跨域
    proxy: {
      '^/api/.*': {
        target: 'http://www.xxxx.com',
        ws: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 注入样式变量（根据自己需求注入其它）
        additionalData: '@import "@/style/seeting/index.scss";'
      }
    },
    postcss: {
      plugins: [
        // autoprefixer({
        //   overrideBrowserslist: ["Android 4.1", "iOS 7.1", "Chrome > 31", "ff > 31", "ie >= 8"],
        // }),
        px2rem({
          remUnit: 37.5
        })
      ]
    }
  }
})
