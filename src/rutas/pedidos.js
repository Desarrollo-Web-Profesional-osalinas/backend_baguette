import {
    creaPedido,
    getPedidoById,
    eliminaPedido,
    listaPedidosByNombre,
    listaPedidosByPagado,
    listaAllPedidos,
    modificaPedido
} from '../servicios/pedidos.js'

/**
 * Función que define para pedidos
 * @param {*} app
 */

export function pedidosRoutes(app) {
    // Listar pedidos con filtros opcionales
    app.get('/api/v1/pedidos', async (req, res) => {
        const { sortBy, sortOrder, nombre, pagado } = req.query
        const opciones =  { sortBy, sortOrder}
        try {
            if (nombre && pagado) {
                return res
                    .status(400)
                    .json({ error: 'consulta por nombre o status, No ambos'})
            } else if (nombre) {
                return res.json(await listaPedidosByNombre(nombre, opciones))
            } else if (pagado) {
                return res.json(await listaPedidosByPagado(pagado, opciones))
            } else {
                return res.json(await listaAllPedidos(opciones))
            }
        } catch (err){
            console.error('Erro listando Pedidos - ', err)
            return res.status(500).end()
        }
    })

    // Obtener pedido por ID

    app.get('/api/v1/pedidos/:id', async (req, res) => {
        const { id } = req.params
        try {
            const pedido = await getPedidoById(id)
            if (pedido === null) return res.status(404).end()
                return res.json(pedido)
        } catch (err) {
            console.error('Error Obteniendo un pedido', err)
            return res.status(500).end()
        }
    })

    // Crar un nuevo pedido por ID

    app.post('/api/v1/pedidos', async (req, res)=> {
        try {
            const pedido = await creaPedido(req.body)
            return res.json(pedido)
        } catch ( err) {
            console.error('Error creando un pedido', err)
            return res.status(500).end()
        }
    })

    //Modificar un pedido existente
    app.patch('/api/v1/pedidos/:id', async (req, res) => {
        try {
            const pedido = await modificaPedido(req.params.id, req.body)
            return res.json(pedido)
        } catch (err) {
            console.error('Error modifcando el pedido', err)
            return res.status(500).end()
        }
    })

    // Eliminar un pedido por id
    app.delete('/api/v1/pedidos/:id', async (req, res) => {
        try {
            const { deletedCount } = await eliminaPedido(req.params.id)
            if (deletedCount === 0) return res.sendStatus(404)
                return res.status(204).end()
        } catch (err) {
            console.error('Error Eliminado un pedido', err)
            return res.status(500).end()
        }
    })
}