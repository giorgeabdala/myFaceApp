import { defineConfig } from 'vite'
import { swc } from 'unplugin-swc'

export default defineConfig({

    plugins: [

    ],
    test: {
        globals: true,
        include: ['**/test/entities/**', './test/application/**'],
    },

})