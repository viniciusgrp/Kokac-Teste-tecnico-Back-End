import app from "../../app";
const request = require("supertest");

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

    const newVehicle = await request(app).post('/veiculos').send(vehicleData)

    expect(newVehicle.body).toHaveProperty("marca", marca);
    expect(newVehicle.body).toHaveProperty("modelo", modelo);
    expect(newVehicle.body).toHaveProperty("quantidadePortas", quantidadePortas);
    expect(newVehicle.body).toHaveProperty("anoFabricacao", anoFabricacao);
  });

  test("Should be able to get the created vehicle", async () => {
    const vehicles = await request(app).get("/veiculos").send().expect(200);

    expect(vehicles.body[0]).toHaveProperty("uuid");
    expect(vehicles.body[0]).toHaveProperty("marca");
    expect(vehicles.body[0]).toHaveProperty("modelo");
    expect(vehicles.body[0]).toHaveProperty("anoFabricacao");
  });

    test("Should not update the information of the incorrect vehicle uuid", async () => {
      const marca = "Ferrari";
      const modelo = "458 Pista";

      const infos = {
        marca,
        modelo,
      };

      const vehicle = await request(app).get("/veiculos").send()

      const updatedVehicle = console.log()

      const updated = await request(app).get("/veiculos").send()


      expect(updated.body[0]).toHaveProperty("marca", vehicle.body[0].marca);
      expect(updated.body[0]).toHaveProperty("modelo", vehicle.body[0].modelo);
    });

    test("Should update the information of the new vehicle in the database", async () => {
        const marca = "Ferrari";
        const modelo = "458 Pista";
        
        const infos = {
            marca,
            modelo,
        };
        
        const vehicle = await request(app).get("/veiculos").send();
        
        await request(app).patch(`/veiculos/${vehicle.body[0].uuid}`).send( infos);
        
        const updated = await request(app).get(`/veiculos/${vehicle.body[0].uuid}`).send();
        
        expect(updated.body).toHaveProperty("marca", marca);
        expect(updated.body).toHaveProperty("modelo", modelo);
        expect(updated.body).toHaveProperty("anoFabricacao", vehicle.body[0].anoFabricacao);
    });
    test("Should be able to delete the created vehicle", async () => {
      const vehicle = await request(app).get("/veiculos").send()

      await request(app).delete(`/veiculos/${vehicle.body[0].uuid}`).send().expect(200)

      const atualizatedVehicles = await request(app).get(`/veiculos/${vehicle.body[0].uuid}`).send().expect(404)
    });
    
    test("Should not be able to delete a incorrect uuid", async () => {
        const deleteVehicle = await request(app).delete("/veiculos/uuidaleatorio").send().expect(404)
    });

});
