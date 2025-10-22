import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import viteReact from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default ({ mode }:{mode:any}) => {

  const env = loadEnv(mode, process.cwd(), '');

  console.log(env.VITE_SERVER_URL);

  return defineConfig({
    build: {
      outDir: './dist',
      emptyOutDir: true,
    },
    plugins: [
      tanstackRouter(
        {
          target: 'react',
          routesDirectory: "./src/routes",
          generatedRouteTree: "./src/routeTree.gen.ts",
          routeFileIgnorePrefix: "-",
        }
      ),
      viteReact(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
      },
    },
    optimizeDeps: {
      force: true,
    },
    server: {
      port: 5000,
      proxy: {
        '/api': {
          target: env.VITE_SERVER_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  })
}
