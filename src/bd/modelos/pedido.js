import mongoose, { Schema} from "mongoose";

/**
 * @typedef {Object} Pedido
 * @property {String} nombre - Nombre del cliente
 * @property {string} telefono - Teléfono del cliente (10 dígitos)
 * @property {Date} fecha_solicitud - Fecha de solicitud del pedido
 * @property {Date} fecha_envio - Fecha de envió del pedido
 * @property {number} total - Total de pedido (por defecto 0)
 * @property {string[]} pagado - Lista de métodos del pago utilizados
 * @property {number} abono - Monto abonado al pedido
 * @property {string} comentario - Comnetarios adicionales sobre el pedido
 */

const pedidoSchema = new Schema(
    {
        nombre: { type: String, required: true },
        telefono: { type: String, required: true, length: 10},
        fecha_solicitud: { type: Date, required: true},
        fecha_envio: { type: Date, required: true},
        total: { type: Number, default: 0.0},
        pagado: [String],
        abono: { type: Number},
        comentario: { type: String},
        cliente: { type: Schema.Types.ObjectId, ref:  'usuario'},
    },
    { timestamps: true},
);

export const Pedido =  mongoose.model("pedido", pedidoSchema);