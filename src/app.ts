import express from "express";
import { palindromesController } from "./services/palindromos";
import { caixaService } from "./services/caixa";
import { criarVeiculoController, deletarVeiculoController, getVeiculoService, getVeiculosController, patchVeiculoController } from "./services/veiculo";
import cors from 'cors'

const port = 3000;

const app = express();

app.use(express.json());
app.use(cors({origin: "*"}))

app.post("/palindromo", palindromesController);
app.post("/caixa", caixaService);
app.post("/veiculos", criarVeiculoController);
app.delete("/veiculos/:uuid", deletarVeiculoController);
app.patch("/veiculos/:uuid", patchVeiculoController);
app.get("/veiculos/:uuid", getVeiculoService);
app.get("/veiculos", getVeiculosController);

app.listen(port, () => {
  console.log(`App rodando em http://localhost:${port}`);
});

export default app