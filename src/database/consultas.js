// Vehículos personales o asignados a un usuario
const vehiculosDelUsuario = await Vehiculo.find({
    $or: [
      { userId: usuarioId }, // Vehículos personales
      { companyVehicle: true, userId: usuarioId }, // Vehículos de empresa asignados
    ]
  });
  