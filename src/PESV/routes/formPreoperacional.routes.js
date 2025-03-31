import {
  getFormulariosDiarios,
  getFormulariosDiariosErrores,
  getFormularioPreoperacionalById,
  registerFormPreOperaconal,
  getVehiculosFaltantes,
  marcarFomrsFaltanes,
  registerFormPreOperaconalNoAplica
} from "../controllers/formPreoperacional.controller.js";
import { Router } from "express";
const router = Router();
//Validationes
import { authMiddleware } from "../../Middleware/ValidateAuth.js";
import { validateSchema } from "../../Middleware/ValitarorSchema.js";
import { registerFormularioPreOperacionalSchema } from "../schemas/FormularioPreoperacional.js";


//Fun para marcar formualrios preoperacionales faltantes
router.post("/marcar-faltantes-pesv", marcarFomrsFaltanes);

router.get("/vehiculos-faltantes", authMiddleware, getVehiculosFaltantes);

/**
 * @swagger
 * tags:
 *   - name: Formulario de respuesta preoperacional
 *     description: Endpoints relacionados con los formularios preoperacionales respondidos por los usuarios.
 *
 * /pesv/preoperacional/diarios:
 *   get:
 *     tags:
 *       - Formulario de respuesta preoperacional
 *     summary: Obtiene los formularios preoperacionales respondidos en una fecha específica.
 *     description: Devuelve una lista de formularios preoperacionales completados en el día indicado.
 *     parameters:
 *       - in: query
 *         name: fecha
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Fecha en formato YYYY-MM-DD para consultar los formularios de ese día.
 *     responses:
 *       200:
 *         description: Lista de formularios encontrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       estadoFormulario:
 *                         type: string
 *                         example: "completado"
 *                       fechaRespuesta:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-21T15:30:00.000Z"
 *                       idUsuario:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Juan"
 *                           lastName:
 *                             type: string
 *                             example: "Pérez"
 *                           email:
 *                             type: string
 *                             example: "juan@example.com"
 *                           numeroDocumento:
 *                             type: string
 *                             example: "12345678"
 *                       formularioId:
 *                         type: object
 *                         properties:
 *                           nombreFormulario:
 *                             type: string
 *                             example: "Inspección Vehicular"
 *       400:
 *         description: Error en la solicitud (fecha faltante o malformateada).
 *       500:
 *         description: Error interno del servidor.
 */

router.get("/diarios", authMiddleware, getFormulariosDiarios);

/**
 * @swagger
 * tags:
 *   - name: Formulario de respuesta preoperacional
 *     description: Endpoints relacionados con los formularios preoperacionales respondidos por los usuarios.
 *
 * /pesv/preoperacional/diarios/error:
 *   get:
 *     tags:
 *       - Formulario de respuesta preoperacional
 *     summary: Obtiene los formularios preoperacionales respondidos en una fecha específica con errores.
 *     description: Devuelve una lista de formularios preoperacionales completados en el día indicado.
 *     parameters:
 *       - in: query
 *         name: fecha
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Fecha en formato YYYY-MM-DD para consultar los formularios de ese día.
 *     responses:
 *       200:
 *         description: Lista de formularios encontrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       estadoFormulario:
 *                         type: string
 *                         example: "completado"
 *                       fechaRespuesta:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-21T15:30:00.000Z"
 *                       idUsuario:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Juan"
 *                           lastName:
 *                             type: string
 *                             example: "Pérez"
 *                           email:
 *                             type: string
 *                             example: "juan@example.com"
 *                           numeroDocumento:
 *                             type: string
 *                             example: "12345678"
 *                       formularioId:
 *                         type: object
 *                         properties:
 *                           nombreFormulario:
 *                             type: string
 *                             example: "Inspección Vehicular"
 *       400:
 *         description: Error en la solicitud (fecha faltante o malformateada).
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/diarios/error", authMiddleware, getFormulariosDiariosErrores);

router.get("/:id", authMiddleware, getFormularioPreoperacionalById);

router.post(
  "/",
  authMiddleware,
  validateSchema(registerFormularioPreOperacionalSchema),
  registerFormPreOperaconal
);


router.post(
  "/no-aplica/:id",
  authMiddleware,
  registerFormPreOperaconalNoAplica
);



export default router;
