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
