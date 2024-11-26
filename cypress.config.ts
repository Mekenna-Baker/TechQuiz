import { defineConfig } from 'cypress';
import customViteConfig from './vite.config';
import { fileURLToPath } from 'url';
import path from 'path';


const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    component: {
        devServer: {
            framework: 'react',
            bundler: 'vite',
            viteConfig: customViteConfig,
        },
        specPattern: 'cypress/component/**/*.cy.{js,ts,jsx,tsx}',
    },

    e2e: {
        baseUrl: 'http://localhost:3001',
        fileServerFolder: path.resolve(__dirname, 'client'),
        setupNodeEvents(on, config) {

        },
    },
});