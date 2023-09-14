import { Request, Response } from "express";

export const caixaService = (req: Request, res: Response) => {
  const valorPago = req.body.valorPago;
  const totalCompra = req.body.totalCompra;
  let valorTroco = valorPago - totalCompra;

    if (valorTroco < 0) {
        return res.status(400).send({troco: "O valor pago é menor que o valor da compra"})
    }

  const notas = [100, 10, 1];
  const response: any = {};


  for (let nota of notas) {
    const qtdNotas = Math.floor(valorTroco / nota);
    if (qtdNotas > 0) {
      response[`nota${nota}`] = qtdNotas;
      valorTroco -= qtdNotas * nota;
    }
  }

  return res.status(200).send({
    troco: valorPago - totalCompra,
    notas: response,
  });
};
