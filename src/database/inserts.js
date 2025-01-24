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
