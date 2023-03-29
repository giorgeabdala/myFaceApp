import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    //necesário para rodar no docker
    host: '0.0.0.0',
    port: 5173,
  }
})
