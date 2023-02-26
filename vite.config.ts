import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import { defineConfig } from 'vite'

dotenv.config({
    path: './.env',
})

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
    },
})
