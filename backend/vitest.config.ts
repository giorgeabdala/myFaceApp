import { defineConfig } from 'vitest/config';

export default defineConfig({

    plugins: [

    ],
    test: {
        globals: true,
        include: ['**/test/entities/**', './test/application/**', './test/controller/**', './test/**/**/**.test.*'],
      threads: false,
        singleThread: false,
        testTimeout: 5000,
        useAtomics: true,

        coverage: {
            reporter: ['html', 'text', 'lcov'],
            reportsDirectory: './test/coverage'
        }


    },

}



)
