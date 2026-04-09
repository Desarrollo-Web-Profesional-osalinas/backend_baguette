import dotenv from 'dotenv'
dotenv.config()

import { app } from './app.js'
import { initBaseDeDatos } from './bd/init.js'

await initBaseDeDatos()

// Solo escucha en puerto si estamos en local
const PORT = process.env.PORT || 3001
app.listen(PORT, '0.0.0.0', () => {
    console.info(`Servidor en http://localhost:${PORT}`)
})

export default app
