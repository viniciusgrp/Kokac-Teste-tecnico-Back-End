export interface Veiculo {
    uuid?: string;
  tipo: string;
  modelo: string;
  anoFabricacao: number;
  quantidadePortas: number;
  passageiros?: number | undefined;
  marca: string;
}
