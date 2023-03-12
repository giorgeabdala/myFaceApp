import { defineConfig } from 'vite'

export default defineConfig({

    plugins: [

    ],
    test: {
        globals: true,
        include: ['**/test/entities/**', './test/application/**'],
        coverage: {
            reporter: ['html', 'text', 'lcov'],
            reportsDirectory: './test/coverage'
        }
    },

})
