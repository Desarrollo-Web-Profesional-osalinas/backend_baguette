import dotenv from 'dotenv'
dotenv.config()

import { app } from './app.js'
import { initBaseDeDatos } from './bd/init.js'

await initBaseDeDatos()

// Solo escucha en puerto si estamos en local
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.info(`Servidor en http://localhost:${PORT}`)
  })
}

export default app
