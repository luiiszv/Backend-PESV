db.clase_vehiculos.insertMany([
  {
    name: "Todos",
    description: "Categoría general que incluye todos los tipos de vehículos.",
  },
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

db.tipo_vehiculos.insertMany([
  {
    nombreTipo: "Transporte personal",
    description: "Vehículos destinados para el transporte de personas de manera privada o familiar.",
  },
  {
    nombreTipo: "Uso personal",
    description: "Vehículos utilizados para fines personales o privados, sin fines comerciales.",
  },
  {
    nombreTipo: "Vehículo de apoyo",
    description: "Vehículos utilizados para el apoyo de actividades operativas o logísticas.",
  },
  {
    nombreTipo: "Motocicleta",
    description: "Vehículo motorizado de dos ruedas utilizado para el transporte de personas o carga ligera.",
  },
  {
    nombreTipo: "Buseta",
    description: "Vehículo de transporte público de pequeño tamaño, utilizado para el transporte colectivo de personas.",
  },
  {
    nombreTipo: "Transporte de herramienta",
    description: "Vehículos destinados al transporte de herramientas y equipos para trabajos específicos.",
  },
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




db.cargos.insertMany([
  { name: "NO REGISTRA", description: "Sin información registrada." },
  { name: "MOTOSIERRISTA", description: "Operador de motosierra en tareas de corte." },
  { name: "SUPERVISOR", description: "Encargado de supervisar actividades y personal." },
  { name: "ARRIERO", description: "Transportista de carga con animales." },
  { name: "SISO", description: "Responsable de seguridad y salud ocupacional." },
  { name: "TEC AMBIENTAL", description: "Técnico en gestión ambiental." },
  { name: "MONITOR", description: "Encargado de monitorear procesos o equipos." },
  { name: "AUX MECANICO", description: "Asistente en tareas mecánicas." },
  { name: "CONDUCTOR", description: "Responsable de conducir vehículos asignados." },
  { name: "PALETERO", description: "Señalizador de tránsito en obras viales." },
  { name: "OPERADOR", description: "Operador de maquinaria o equipo especializado." },
  { name: "JEFE DE ALMACEN", description: "Encargado de la gestión de inventarios." },
  { name: "GUADAÑADOR", description: "Operador de guadaña en actividades de corte." },
  { name: "JEFE DE LINEA", description: "Líder responsable de una línea de trabajo." },
  { name: "ESTABLESIMIENTO", description: "Encargado del establecimiento de cultivos." },
  { name: "CONTROL FITOSANITARIO", description: "Especialista en manejo de plagas y enfermedades." },
  { name: "ADMINISTRADOR", description: "Gestor de recursos y operaciones." },
  { name: "AUX HUERTOS", description: "Asistente en tareas relacionadas con huertos." },
  { name: "AUX INVESTIGACION", description: "Asistente en labores de investigación." },
  { name: "VIVERISTA", description: "Encargado del manejo de viveros." },
  { name: "AUX SISO", description: "Asistente de seguridad y salud ocupacional." },
  { name: "JEFE DE OPERACIONES", description: "Responsable de coordinar operaciones generales." },
  { name: "MONITOR AMBIENTAL", description: "Encargado de monitorear aspectos ambientales." },
  { name: "GERENTE GENERAL", description: "Máxima autoridad administrativa de la empresa." },
  { name: "PSICOLOGA", description: "Profesional encargada de apoyo psicológico." },
  { name: "MEJORA SOCIAL", description: "Especialista en programas de mejora social." },
  { name: "AUXILIAR SUPERVISION", description: "Asistente en labores de supervisión." },
  { name: "ADMINISTRADOR 1", description: "Administrador con rol específico en el área." },
  { name: "AUXILIAR PUM", description: "Asistente en procesos específicos de PUM." },
  { name: "PASANTE", description: "Practicante en proceso de formación profesional." },
  { name: "CONTROL DE HORMIGAS", description: "Especialista en control de hormigas." },
  { name: "TRAZADOR", description: "Encargado de trazar líneas en procesos de trabajo." },
  { name: "AUX PROCESO SOCIAL", description: "Asistente en procesos sociales comunitarios." },
  { name: "AUXILIAR", description: "Personal de apoyo en diversas tareas." },
  { name: "EMPLEADO", description: "Trabajador contratado por la organización." },
  { name: "APRENDIZ", description: "Persona en proceso de aprendizaje laboral." }
]);

