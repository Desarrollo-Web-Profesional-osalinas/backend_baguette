import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';

// 1. Configuración de Rate Limit (10 peticiones por minuto)
const comentariosLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minuto
    max: 10, // Límite de 10 peticiones por ventana
    message: 'Demasiados intentos, intenta de nuevo en un minuto',
});

// 2. Middleware de Validación y Sanitización
const validarComentario = [
    body('puntuacion')
        .exists().withMessage('La puntuación es obligatoria')
        .isInt().withMessage('La puntuación debe ser un número entero')
        .toInt(),
    
    body('texto')
        .exists().withMessage('El texto es obligatorio')
        .isString().withMessage('El texto debe ser una cadena')
        .isLength({ max: 200 }).withMessage('El texto no puede superar los 200 caracteres')
        .escape() // Sanitización de HTML/JS (inyección)
        .trim(),
];

export function comentariosRoutes(app) {
    app.post('/api/v1/comentarios', comentariosLimiter, validarComentario, (req, res) => {
        // Validación de resultados
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { puntuacion, texto } = req.body;
        
        // Simular guardado exitoso
        return res.status(201).json({
            message: 'Comentario guardado exitosamente',
            data: { puntuacion, texto }
        });
    });
}
