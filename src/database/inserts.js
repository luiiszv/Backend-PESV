db.clase_vehiculos.insertMany([
  {
    name: "Motocicleta",
    description: "Vehículo de dos ruedas impulsado por un motor.",
  },
  {
    name: "Bus",
    description: "Vehículo grande diseñado para transportar muchos pasajeros.",
  },
  {
    name: "Camioneta",
    description:
      "Vehículo versátil utilizado para transporte de carga o pasajeros.",
  },
  {
    name: "Campero",
    description: "Vehículo robusto adecuado para terrenos difíciles.",
  },
  {
    name: "Automovil",
    description:
      "Vehículo de cuatro ruedas diseñado principalmente para transporte personal.",
  },
  {
    name: "Jeep",
    description: "Vehículo compacto y resistente, ideal para usos todoterreno.",
  },
  {
    name: "Microbus",
    description:
      "Vehículo más pequeño que un autobús, usado para transporte de pasajeros.",
  },
  {
    name: "Motocarro",
    description:
      "Vehículo pequeño de tres ruedas usado para carga o pasajeros.",
  },
]);
db.actividad_vehiculos.insertMany([
  {
    nombreTipo: "Transporte personal",
    description:
      "Vehículos destinados al traslado de personas en un ámbito privado o familiar.",
  },
  {
    nombreTipo: "Transporte de herramientas",
    description:
      "Vehículos utilizados para el traslado de herramientas y equipos de trabajo.",
  },
  {
    nombreTipo: "Uso personal",
    description:
      "Vehículos empleados exclusivamente para fines personales, sin actividades comerciales.",
  },
  {
    nombreTipo: "Vehículo de apoyo",
    description:
      "Vehículos destinados a brindar soporte en actividades operativas o logísticas.",
  },
  {
    nombreTipo: "Trabajo de campo",
    description:
      "Vehículos empleados en actividades operativas y logísticas fuera de instalaciones fijas.",
  }
]);

db.roles.insertMany([
  {
    name: "SuperAdmin",
    description: "Acceso total al sistema.",
  },
  {
    name: "AdminPESV",
    description: "Gestión de funciones relacionadas con PESV.",
  },
  {
    name: "UserPESV",
    description: "Usuario estándar en el módulo PESV.",
  },
]);
db.permisos.insertMany([
  {
    id_rol: "679195b408226e1ef20d8192",
    canRead: true,
    canWrite: true,
    canEdit: true,
    canDelete: true,
  },
  {
    id_rol: "679195b408226e1ef20d8193",
    canRead: true,
    canWrite: true,
    canEdit: true,
    canDelete: true,
  },
  {
    id_rol: "679195b408226e1ef20d8194",
    canRead: true,
    canWrite: true,
    canEdit: true,
    canDelete: true,
  },
]);

db.zonas.insertMany([
  {
    nombreZona: "Norte",
    codeZona: "1",
  },
  {
    nombreZona: "Sur",
    codeZona: "2",
  },
  {
    nombreZona: "Centro",
    codeZona: "3",
  },
]);

db.tipos_documentos.insertMany([
  {
    nombre: "Cédula de Ciudadanía",
    categoria: "persona",
    descripcion: "Documento de identificación para ciudadanos colombianos.",
  },
  {
    nombre: "Licencia de conducir",
    categoria: "persona",
    descripcion:
      "Documento que acredita la autorización para conducir vehículos.",
  },
  {
    nombre: "Revisión bimensual",
    categoria: "vehiculo",
    descripcion:
      "Inspección que se realiza a los vehículos, especialmente a los de transporte público",
  },
  {
    nombre: "Tarjeta de propiedad",
    categoria: "vehiculo",
    descripcion: "Documento que certifica la propiedad de un vehículo.",
  },
  {
    nombre: "SOAT",
    categoria: "vehiculo",
    descripcion: "Seguro Obligatorio de Accidentes de Tránsito para vehículos.",
  },

  {
    nombre: "Revisión técnico-mecánica",
    categoria: "vehiculo",
    descripcion:
      "Documento que acredita el estado técnico y mecánico del vehículo.",
  },
  {
    nombre: "Poliza Todo Riesgo",
    categoria: "vehiculo",
    descripcion: "Seguro opcional que cubre daños al vehículo y terceros.",
  },
  {
    nombre: "Contrato",
    categoria: "vehiculo",
    descripcion:
      "Documento que certifica la cesión temporal de uso de un vehículo bajo contrato.",
  },
  {
    nombre: "Tarjeta de operación",
    categoria: "vehiculo",
    descripcion:
      "Documento que autoriza a un vehículo a operar dentro de las normas legales.",
  },
]);

db.tipos_documentos.insertOne({
  nombre: "Otro",
  categoria: "vehiculo",
  descripcion: "Otro documento relaciondo",
});

db.tipos_documentos.insertOne({
  nombre: "Otro Documento",
  categoria: "persona",
  descripcion: "Otro documento relaciondo con el usuario",
});

db.cargos.insertMany([
  { name: "NO REGISTRA", description: "Sin información registrada." },
  {
    name: "MOTOSIERRISTA",
    description: "Operador de motosierra en tareas de corte.",
  },
  {
    name: "SUPERVISOR",
    description: "Encargado de supervisar actividades y personal.",
  },
  { name: "ARRIERO", description: "Transportista de carga con animales." },
  {
    name: "SISO",
    description: "Responsable de seguridad y salud ocupacional.",
  },
  { name: "TEC AMBIENTAL", description: "Técnico en gestión ambiental." },
  {
    name: "MONITOR",
    description: "Encargado de monitorear procesos o equipos.",
  },
  { name: "AUX MECANICO", description: "Asistente en tareas mecánicas." },
  {
    name: "CONDUCTOR",
    description: "Responsable de conducir vehículos asignados.",
  },
  { name: "PALETERO", description: "Señalizador de tránsito en obras viales." },
  {
    name: "OPERADOR",
    description: "Operador de maquinaria o equipo especializado.",
  },
  {
    name: "JEFE DE ALMACEN",
    description: "Encargado de la gestión de inventarios.",
  },
  {
    name: "GUADAÑADOR",
    description: "Operador de guadaña en actividades de corte.",
  },
  {
    name: "JEFE DE LINEA",
    description: "Líder responsable de una línea de trabajo.",
  },
  {
    name: "ESTABLESIMIENTO",
    description: "Encargado del establecimiento de cultivos.",
  },
  {
    name: "CONTROL FITOSANITARIO",
    description: "Especialista en manejo de plagas y enfermedades.",
  },
  { name: "ADMINISTRADOR", description: "Gestor de recursos y operaciones." },
  {
    name: "AUX HUERTOS",
    description: "Asistente en tareas relacionadas con huertos.",
  },
  {
    name: "AUX INVESTIGACION",
    description: "Asistente en labores de investigación.",
  },
  { name: "VIVERISTA", description: "Encargado del manejo de viveros." },
  {
    name: "AUX SISO",
    description: "Asistente de seguridad y salud ocupacional.",
  },
  {
    name: "JEFE DE OPERACIONES",
    description: "Responsable de coordinar operaciones generales.",
  },
  {
    name: "MONITOR AMBIENTAL",
    description: "Encargado de monitorear aspectos ambientales.",
  },
  {
    name: "GERENTE GENERAL",
    description: "Máxima autoridad administrativa de la empresa.",
  },
  {
    name: "PSICOLOGA",
    description: "Profesional encargada de apoyo psicológico.",
  },
  {
    name: "MEJORA SOCIAL",
    description: "Especialista en programas de mejora social.",
  },
  {
    name: "AUXILIAR SUPERVISION",
    description: "Asistente en labores de supervisión.",
  },
  {
    name: "ADMINISTRADOR 1",
    description: "Administrador con rol específico en el área.",
  },
  {
    name: "AUXILIAR PUM",
    description: "Asistente en procesos específicos de PUM.",
  },
  {
    name: "PASANTE",
    description: "Practicante en proceso de formación profesional.",
  },
  {
    name: "CONTROL DE HORMIGAS",
    description: "Especialista en control de hormigas.",
  },
  {
    name: "TRAZADOR",
    description: "Encargado de trazar líneas en procesos de trabajo.",
  },
  {
    name: "AUX PROCESO SOCIAL",
    description: "Asistente en procesos sociales comunitarios.",
  },
  { name: "AUXILIAR", description: "Personal de apoyo en diversas tareas." },
  {
    name: "EMPLEADO",
    description: "Trabajador contratado por la organización.",
  },
  {
    name: "APRENDIZ",
    description: "Persona en proceso de aprendizaje laboral.",
  },
]);





// { "name": "Motocicleta", "description": "Vehículo de dos ruedas impulsado por un motor.", "claseUnidad": "vehiculo" },
//   { "name": "Bus", "description": "Vehículo grande diseñado para transportar muchos pasajeros.", "claseUnidad": "vehiculo" },
//   { "name": "Camioneta", "description": "Vehículo versátil utilizado para transporte de carga o pasajeros.", "claseUnidad": "vehiculo" },
//   { "name": "Campero", "description": "Vehículo robusto adecuado para terrenos difíciles.", "claseUnidad": "vehiculo" },
//   { "name": "Automovil", "description": "Vehículo de cuatro ruedas diseñado principalmente para transporte personal.", "claseUnidad": "vehiculo" },
//   { "name": "Jeep", "description": "Vehículo compacto y resistente, ideal para usos todoterreno.", "claseUnidad": "vehiculo" },
//   { "name": "Microbus", "description": "Vehículo más pequeño que un autobús, usado para transporte de pasajeros.", "claseUnidad": "vehiculo" },
//   { "name": "Motocarro", "description": "Vehículo pequeño de tres ruedas usado para carga o pasajeros.", "claseUnidad": "vehiculo" },



db.clase_vehiculos.insertMany([

  { "name": "CARGADOR", "description": "Maquinaria de carga articulada (BELL, CAT, etc.)", "claseUnidad": "maquinaria" },
  { "name": "CAMION", "description": "Camión forestal o de carga pesada, algunos con placa", "claseUnidad": "vehiculo" },
  { "name": "GRUA", "description": "Grúa hidráulica o articulada usada en operación forestal", "claseUnidad": "maquinaria" },
  { "name": "BULLDOZER", "description": "Tractor oruga para empuje y nivelación de terrenos", "claseUnidad": "maquinaria" },
  { "name": "FELLER BUNCHER", "description": "Máquina de corte y apilado forestal", "claseUnidad": "maquinaria" },
  { "name": "MONTACARGA", "description": "Equipo de carga y descarga de pallets y materiales", "claseUnidad": "maquinaria" },
  { "name": "MOTONIVELADORA", "description": "Equipo para nivelación de caminos forestales", "claseUnidad": "maquinaria" },
  { "name": "SKIDDER", "description": "Equipo para arrastre de madera o troncos", "claseUnidad": "maquinaria" },
  { "name": "TORRE", "description": "Torre forestal para extracción o soporte estructural", "claseUnidad": "maquinaria" },
  { "name": "TRACTOCARGADOR", "description": "Cabezal de carga forestal con remolque", "claseUnidad": "vehiculo" },
  { "name": "TRACTOR", "description": "Tractor agrícola o forestal", "claseUnidad": "vehiculo" },
  { "name": "TRAKOLLER", "description": "Equipo remolcador de cable para extracción forestal", "claseUnidad": "maquinaria" },
  { "name": "WINCHE", "description": "Winche de tracción para cargas pesadas", "claseUnidad": "maquinaria" }
])




