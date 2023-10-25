const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

app.use(express.json());
app.use(cors())
app.use(bodyParser.json());

const allRoutes = require("./routes");
app.use("/bot", allRoutes);


app.listen(port, () => {
  console.log(`Aplicativo Express está ouvindo na porta ${port}`);
});
