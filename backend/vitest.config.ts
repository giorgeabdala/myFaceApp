import { defineConfig } from 'vitest/config';

export default defineConfig({

    plugins: [

    ],
    test: {
        globals: true,
        include: ['**/test/entities/**', './test/application/**', './test/controller/**'],
/*      coverage: {
            reporter: ['html', 'text', 'lcov'],
            reportsDirectory: './aleatorio/coverage'
        }

 */
    },

}



)
