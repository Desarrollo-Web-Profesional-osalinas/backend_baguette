import { Pedido } from "../bd/modelos/pedido.js";

/**
 * Función para crear un nuevo pedido en la base de datos.
 * @param {*} pedido - Objeto que contiene los detalles del pedido
 * a crear, incluyendo:
 * - nombre: Nombre del cliente
 * - telefono: Teléfono del cliente (10 dígitos)
 * - fecha_solicitud: Fehca de solicitud del pedido
 * - fecha_envio: Fecha de envio del pedido
 * - total: Total del pedido (opcional, por defecto 0.0)
 * - pagado: Monto abonado al pedido (opcional)
 * - comentario: comentarios adicionales sobre el pedido (opcional)
 * @returns {Promise<Pedido>} - el pedido creado en la base de datos
*/

export async function creaPedido({
    nombre,
    telefono,
    fecha_solicitud,
    fecha_envio, 
    total,
    pagado,
    abono,
    comentario
}) {
    const pedido = new Pedido({
        nombre,
        telefono,
        fecha_solicitud,
        fecha_envio,
        total,
        pagado,
        abono,
        comentario,
    });
    return await pedido.save();
}

/**
 * Función para obtener una lista de pedidos de la base de datos.
 * @param {*} query Tipo de consulta
 * @param {*} param1 Ordenamiento de la consulta 
 * @returns {Promise<Array>} - Una promesa que resuelve en un arreglo de pedidos.
 */

export async function listaPedidos(
    query = {},
    { sortBy = "CreatedAt", sortOrder = "descending"} = {},
) {
    return await Pedido.find(query).sort({ [sortBy]: sortOrder});
}

/**
 * Función ára obtener una lista de todos los pedidos de la base de datos.
 * @param {*} opciones
 * @returns {Promise<Array>}  - Una promesa que resulve en un arreglo de pedidos.
 */

export async function listaAllPedidos(opciones) {
    return await listaPedidos({}, opciones);
}

/**
 * Funcion para obetener una lista de pedidos filtrados por nombre del cliente.
 * @param {*} nombre
 * @param {*} opciones
 * @param {Promise<Array>} - Una promesa que resuelve en un arreglo de pedidos 
 */

export async function listaPedidosByNombre(nombre,opciones) {
    return await listaPedidos({nombre}, opciones);
}

/**
 * Función para obtener una lusta de pedidos filtrados por teléfono del cliente
 * @param {*} pagado
 * @param {*} opciones
 * @returns {Promise<Array>} - Una promesa que resuleve en un arreglo de pedidos
 */

export async function listaPedidosByPagado(pagado, opciones) {
    return await listaPedidos({pagado}, opciones);
}

/**
 * Función para obetener un pedido específico por su ID.
 * @param {*} pedidoId - Indetificador
 * @returns {Promise<Pedido>} - Una promesa que resuelve en el pedido encontrado o null si no se encutra
 */

export async function getPedidoById(pedidoId){
    return await Pedido.findById(pedidoId);
}

/**
 * Función para modiciar un pedido existente en la base de datos utilizando su ID
 * @param {Function} - pedidoId
 * @param {*} - param1
 * @returns {Promise<Pedido>} - Una promesa que resuelve en el pedido actualziado o null si no se encutra.
 */

export async function modificaPedido(
    pedidoId,
    {
        nombre,
        telefono,
        fecha_solicitud,
        fecha_envio,
        total,
        pagado,
        abono,
        comentario,
    }
) {
    return await Pedido.findOneAndUpdate(
        { _id: pedidoId },
        {
            $set: {
                nombre, 
                telefono,
                fecha_solicitud,
                fecha_envio,
                total,
                pagado,
                comentario,
            },
        },
        { new: true },
    );
}

/**
 * Elimina un pedido de la base de datos utilizando su ID
 * @param {*} pedidoId
 * @returns {Promise<Object>} - Una promesa que resuelve en el resultado de la operación de eliminación
 */

export async function eliminaPedido(pedidoId) {
    return await Pedido.deleteOne({ _id: pedidoId})
}