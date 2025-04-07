
import { marcarFaltantesComoNoContestado } from "./src/PESV/services/formPreoperacional.service.js";



// Ejecución directa del servicio
(async () => {
    console.log(`[${new Date().toISOString()}] Iniciando cron job de preoperacional`);

    try {
        const resultado = await marcarFaltantesComoNoContestado(HORA_LIMITE);

        console.log(`[${new Date().toISOString()}] Resultado del proceso:`, {
            success: resultado.success,
            message: resultado.message,
            vehiculosProcesados: resultado.vehiculosProcesados,
            errores: resultado.errores
        });

        process.exit(resultado.success ? 0 : 1);

    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error inesperado:`, error);
        process.exit(1);
    }
})();