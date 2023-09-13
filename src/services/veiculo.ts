import {Request, Response} from "express"
import { veiculos } from "../database/veiculos";
import { Veiculo } from "../interface/interface";
import { v4 as uuid } from 'uuid'

class VeiculoBase implements Veiculo {
    constructor(
        public tipo: string,
        public modelo: string,
        public anoFabricacao: number,
        public quantidadePortas: number,
        public marca: string,
    ) {}
}

class Carro extends VeiculoBase {
    uuid: string;

    constructor(tipo: string, modelo: string, anoFabricacao: number, quantidadePortas: number, marca: string) {
        super(tipo, modelo, anoFabricacao, quantidadePortas, marca);
        this.uuid = uuid()
    }
}

class Moto extends VeiculoBase {
    uuid: string;
    passageiros: number;
    rodas: number;

    constructor(tipo: string, modelo: string, anoFabricacao: number, marca: string, passageiros: number) {
        super(tipo, modelo, anoFabricacao, 0, marca)
        this.uuid = uuid() 
        this.passageiros = passageiros
        this.rodas = 2
    }
}

export const criarVeiculoController = async (req: Request, res: Response) => {
    const body = req.body
    const newVehicle = await criarVeiculoService(body)

    return res.status(201).json(newVehicle)
}

export const criarVeiculoService = async (veiculo) => {
    if (veiculo.tipo === "carro") {
        veiculo = new Carro(veiculo.tipo, veiculo.modelo, veiculo.anoFabricacao, veiculo.quantidadePortas, veiculo.marca)
    } else if (veiculo.tipo === "moto") {
        veiculo = new Moto(veiculo.tipo, veiculo.modelo, veiculo.anoFabricacao, veiculo.marca, veiculo.passageiros)
    }

    veiculos.push(veiculo)

    return veiculo
}


export const getVeiculoService = (req: Request, res: Response) => {
    const uuid = req.params.uuid
    const index = veiculos.findIndex((elem) => elem.uuid === uuid)

    if (index === -1) {
        return res.status(404).send({error: "Veículo não encontrado"})
    }

    const veiculo = veiculos[index]

    return res.status(200).json(veiculo)
}

export const getVeiculosController = async (req: Request, res: Response) => {
    const veiculos = await getVeiculosService()

    return res.status(200).json(veiculos)
}

export const getVeiculosService = () => {
    return veiculos
}

export const deletarVeiculoController = async (req: Request, res: Response) => {
    const uuid = req.params.uuid
    
    const deleteVehicle = await deletarVeiculoService(uuid) 

    if (!deleteVehicle) {
        return res.status(404).send({error: "Veiculo não encontrado"})
    }

    return res.status(200)
}

export const deletarVeiculoService = (uuid) => {
    const index = veiculos.findIndex((elem) => elem.uuid === uuid)
    if (index === -1) {
        return false
    }

    veiculos.splice(index, 1)

    return true
}

export const patchVeiculoController = async (req: Request, res: Response) => {
    const uuid = req.params.uuid
   
    const novoVeiculo = await patchVeiculoService(uuid, req.body)

    if (!novoVeiculo) {
        return res.status(404).send({error: "Veiculo não encontrado"})
    }

    return res.status(200).json(novoVeiculo)
}

export const patchVeiculoService = (uuid, body) => {
    const index = veiculos.findIndex((elem) => elem.uuid === uuid)

    if (index === -1) {
        return false
    }

    let veiculo = veiculos[index]

    const novoVeiculo = {
        ...veiculo,
        ...body
    }

    veiculos[index] = novoVeiculo
}