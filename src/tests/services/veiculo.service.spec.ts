import {
  criarVeiculoService,
  deletarVeiculoService,
  getVeiculosService,
  patchVeiculoService,
} from "../../services/veiculo";

describe("Vehicle tests", () => {

  test("Should insert the information of the new vehicle in the database", async () => {
    const marca = "Volkswagen";
    const modelo = "Gol";
    const anoFabricacao = 2000;
    const quantidadePortas = 2;
    const tipo = "carro";

    const vehicleData = {
      tipo,
      marca,
      modelo,
      anoFabricacao,
      quantidadePortas,
    };

    const newVehicle = await criarVeiculoService(vehicleData);

    expect(newVehicle).toHaveProperty("marca", marca);
    expect(newVehicle).toHaveProperty("modelo", modelo);
    expect(newVehicle).toHaveProperty("quantidadePortas", quantidadePortas);
    expect(newVehicle).toHaveProperty("anoFabricacao", anoFabricacao);
    expect(newVehicle).not.toHaveProperty("tipo");
  });

  test("Should be able to get the created vehicle", async () => {
    const vehicles = await getVeiculosService();

    expect(vehicles).toHaveLength(1);
  });

  test("Should not update the information of the incorrect vehicle uuid", async () => {
    const marca = "Ferrari";
    const modelo = "458 Pista";

    const infos = {
        marca,
        modelo
    }

    const vehicle = await getVeiculosService()[0];

    const updatedVehicle = await patchVeiculoService('uuid-aleatorio', infos)

    const updated = await getVeiculosService()[0];

    expect(updated).toHaveProperty("marca", vehicle.marca)
    expect(updated).toHaveProperty("modelo", vehicle.modelo)
    expect(updatedVehicle).toBe(false)

  }
  )

  test("Should update the information of the new vehicle in the database", async () => {
    const marca = "Ferrari";
    const modelo = "458 Pista";

    const infos = {
        marca,
        modelo
    }

    const vehicle = await getVeiculosService()[0];

    await patchVeiculoService(vehicle.uuid, infos)

    const updated = await getVeiculosService()[0];

    expect(updated).toHaveProperty("marca", marca)
    expect(updated).toHaveProperty("modelo", modelo)
    expect(updated).toHaveProperty("anoFabricacao", vehicle.anoFabricacao)

  }
  )

  test("Should not be able to delete a incorrect uuid", async () => {
    const deleteVehicle = await deletarVeiculoService('uuid-aleatorio')

    const atualizatedVehicles = await getVeiculosService();

    expect(deleteVehicle).toBe(false)
    expect(atualizatedVehicles).toHaveLength(1);
  });

  test("Should be able to delete the created vehicle", async () => {
    const vehicle = await getVeiculosService()[0];

    await deletarVeiculoService(vehicle.uuid)

    const atualizatedVehicles = await getVeiculosService();

    expect(atualizatedVehicles).toHaveLength(0);
  });

});
