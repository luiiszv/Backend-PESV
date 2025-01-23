db.tipo_identificacion.insertMany([
  {
    name: "Cédula de Ciudadanía",
    description: "Documento de identificación para ciudadanos colombianos.",
  },
  {
    name: "Tarjeta de Identidad",
    description:
      "Documento de identificación para menores de edad en Colombia.",
  },
]);


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
    description: "Vehículo versátil utilizado para transporte de carga o pasajeros.",
  },
  {
    name: "Campero",
    description: "Vehículo robusto adecuado para terrenos difíciles.",
  },
  {
    name: "Automovil",
    description: "Vehículo de cuatro ruedas diseñado principalmente para transporte personal.",
  },
  {
    name: "Jeep",
    description: "Vehículo compacto y resistente, ideal para usos todoterreno.",
  },
  {
    name: "Microbus",
    description: "Vehículo más pequeño que un autobús, usado para transporte de pasajeros.",
  },
  {
    name: "Motocarro",
    description: "Vehículo pequeño de tres ruedas usado para carga o pasajeros.",
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