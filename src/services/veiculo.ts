import { Request, Response } from "express";
import { veiculos } from "../database/veiculos";
import { Veiculo } from "../interface/interface";
import { v4 as uuid } from "uuid";

import fs from "fs";
import path from "path";

class VeiculoBase implements Veiculo {
  constructor(
    public tipo: string,
    public modelo: string,
    public anoFabricacao: number,
    public quantidadePortas: number,
    public marca: string
  ) {}
}

class Carro extends VeiculoBase {
  uuid: string;

  constructor(
    tipo: string,
    modelo: string,
    anoFabricacao: number,
    quantidadePortas: number,
    marca: string
  ) {
    super(tipo, modelo, anoFabricacao, quantidadePortas, marca);
    this.uuid = uuid();
  }
}

class Moto extends VeiculoBase {
  uuid: string;
  passageiros: number | undefined;
  rodas: number;

  constructor(
    tipo: string,
    modelo: string,
    anoFabricacao: number,
    marca: string,
    passageiros: number | undefined
  ) {
    super(tipo, modelo, anoFabricacao, 0, marca);
    this.uuid = uuid();
    this.passageiros = passageiros;
    this.rodas = 2;
  }
}

const directoryPath = "./src/databaseTeste";

export const criarVeiculoController = async (req: Request, res: Response) => {
  const body = req.body;
  const newVehicle = await criarVeiculoService(body);

  return res.status(201).json(newVehicle);
};

export const criarVeiculoService = async (veiculo: Veiculo) => {
  if (veiculo.tipo === "carro") {
    veiculo = new Carro(
      veiculo.tipo,
      veiculo.modelo,
      veiculo.anoFabricacao,
      veiculo.quantidadePortas,
      veiculo.marca
    );
  } else if (veiculo.tipo === "moto") {
    veiculo = new Moto(
      veiculo.tipo,
      veiculo.modelo,
      veiculo.anoFabricacao,
      veiculo.marca,
      veiculo.passageiros
    );
  }

  const filePath = `./src/databaseTeste/${veiculo.uuid}.json`;

  const jsonData = JSON.stringify(veiculo, null, 2);

  fs.writeFile(filePath, jsonData, (err) => {
    if (err) {
      console.error("Erro ao salvar os dados em JSON:", err);
    } else {
      console.log("Dados salvos com sucesso em", filePath);
    }
  });

  return veiculo;
};

export const getVeiculoService = (req: Request, res: Response) => {
  const uuid = req.params.uuid;
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Erro ao listar os arquivos:", err);
      res.status(500).json({ error: "Erro ao listar os arquivos" });
    } else {
      const jsonFiles = files.filter(
        (file) => path.basename(file) === `${uuid}.json`
      )[0];
      if (!jsonFiles) {
        return res.status(404).send({error:"Veículo não encontrado"})
      }
      const filePath = path.join(directoryPath, jsonFiles);
      const fileData = fs.readFileSync(filePath, "utf-8");
      const jsonData = JSON.parse(fileData);
      return res.json(jsonData);
    }
  });
};

export const getVeiculosController = async (req: Request, res: Response) => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Erro ao listar os arquivos:", err);
      res.status(500).json({ error: "Erro ao listar os arquivos" });
    } else {
      const jsonFiles = files.filter((file) => path.extname(file) === ".json");
      const fileContents: any = [];

      jsonFiles.forEach((file) => {
        const filePath = path.join(directoryPath, file);
        const fileData = fs.readFileSync(filePath, "utf-8");
        try {
          const jsonData = JSON.parse(fileData);
          fileContents.push(jsonData);
        } catch (error) {
          console.error(`Erro ao analisar o arquivo ${file}:`, error);
        }
      });

      res.json(fileContents);

      return fileContents;
    }
  });
};

export const deletarVeiculoController = async (req: Request, res: Response) => {
    const filePath = `./src/databaseTeste/${req.params.uuid}.json`;

    await fs.readdir(directoryPath, (err, files) => {
        const vehicle = files.find((file) => path.basename(file) === `${req.params.uuid}.json`)
        console.log("VIEUCLO", vehicle)
        if (!vehicle) {
            return res.status(404)
        }
    })

  try {
    fs.unlinkSync(filePath);
    return res.json({ mensagem: 'Veículo excluído com sucesso' })
  } catch (error) {
    console.error('Erro ao excluir o veículo:', error);
    return res.status(404).json({ erro: 'Erro ao excluir o veículo' });
  }
};

export const patchVeiculoController = async (req: Request, res: Response) => {
  const uuid = req.params.uuid;

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Erro ao listar os arquivos:", err);
      res.status(500).json({ error: "Erro ao listar os arquivos" });
    } else {
        const filePath = `./src/databaseTeste/${uuid}.json`;
        try {
          const fileData = fs.readFileSync(filePath, "utf-8");
        const jsonData = JSON.parse(fileData);
        const updatedVehicle = {
          ...jsonData,
          ...req.body,
        };
        const jsonUpdatedData = JSON.stringify(updatedVehicle, null, 2);
        fs.writeFile(filePath, jsonUpdatedData, (err) => {
          if (err) {
            console.error("Erro ao salvar os dados em JSON:", err);
          } else {
            console.log("Dados salvos com sucesso em", filePath);
            return res.json(updatedVehicle);
          }
        });
      } catch (error) {
          console.error(`Erro ao analisar o arquivo`, error);
        return res.status(404).send({error: "Veiculo não encontrado"})
      }

    }
  });
};