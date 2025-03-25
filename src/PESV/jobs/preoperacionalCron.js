import cron from "node-cron";
import { marcarFaltantesComoNoContestado } from "../services/formPreoperacional.service.js";

// Configuración editable
export const HORA_EJECUCION = 15; // 10 PM
export const MINUTO_EJECUCION = 1; // 15 minutos
export const TIMEZONE = "America/Bogota";

export const initPreoperacionalCron = () => {
  const cronExpression = `${MINUTO_EJECUCION} ${HORA_EJECUCION} * * *`;

  cron.schedule(
    cronExpression,
    async () => {
      console.log(
        `[${new Date().toISOString()}] Iniciando marcado automático (${HORA_EJECUCION}:${MINUTO_EJECUCION} ${TIMEZONE})`
      );

      const resultado = await marcarFaltantesComoNoContestado(HORA_EJECUCION);

      if (resultado.success) {
        console.log(`[${new Date().toISOString()}] ✅ ${resultado.message}`);
        console.log(
          `[${new Date().toISOString()}] Detalles: ${
            resultado.vehiculosProcesados
          } procesados, ${resultado.errores} errores`
        );
      } else {
        console.warn(`[${new Date().toISOString()}] ⚠️ ${resultado.message}`);
      }
    },
    {
      scheduled: true,
      timezone: TIMEZONE,
    }
  );

  console.log(
    `[${new Date().toISOString()}] Cron job programado: ${cronExpression} ${TIMEZONE}`
  );
};

export const ejecutarMarcadoManual = async (hora) => {
  console.log(`[${new Date().toISOString()}] Ejecutando marcado MANUALMENTE`);
  return await marcarFaltantesComoNoContestado(hora);
};
