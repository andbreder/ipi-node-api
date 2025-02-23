const express = require("express");
const cors = require('cors');
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 4222;
const DB_FILE = path.join(__dirname, "db.json");

app.use(cors());
app.use(express.json());

const readDB = () => {
  try {
    const data = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return resetDB();
  }
};

const resetDB = () => {
  const _default = {
    auth: {
      password: "J3susS@lv4"
    },
    members: [
      { name: "ANDERSON"    /**/, awnsers: [] },
      { name: "ANDRESA"     /**/, awnsers: [] },
      { name: "BRENDA"      /**/, awnsers: [] },
      { name: "CHARLES"     /**/, awnsers: [] },
      { name: "CHRISTOPHER" /**/, awnsers: [] },
      { name: "DAVI"        /**/, awnsers: [] },
      { name: "ISABELA"     /**/, awnsers: [] },
      { name: "JOYCE"       /**/, awnsers: [] },
      { name: "JULYA"       /**/, awnsers: [] },
      { name: "KELLY"       /**/, awnsers: [] },
      { name: "KETHELLYN"   /**/, awnsers: [] },
      { name: "LUIS"        /**/, awnsers: [] },
      { name: "LUNIS"       /**/, awnsers: [] },
      { name: "MARIA"       /**/, awnsers: [] },
      { name: "MAURICIO"    /**/, awnsers: [] },
      { name: "MILENA"      /**/, awnsers: [] },
      { name: "NICOLI"      /**/, awnsers: [] },
      { name: "PEROLA"      /**/, awnsers: [] },
      { name: "SARA"        /**/, awnsers: [] },
      { name: "SARAH"       /**/, awnsers: [] },
      { name: "SOPHIA"      /**/, awnsers: [] },
      { name: "TEREZA"      /**/, awnsers: [] },
      { name: "THIAGO"      /**/, awnsers: [] },
      { name: "ZENAIDE"     /**/, awnsers: [] },
      { name: "ZENILDA"     /**/, awnsers: [] },
      { name: "ZINHA"       /**/, awnsers: [] }
    ]
  };
  writeDB(_default);
  return _default;
};

const writeDB = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
};

/// =====================================================================================
/// routes
/// =====================================================================================

app.get("/members", (req, res) => {
  const data = readDB();
  res.json(data.members);
});

app.post("/auth", (req, res) => {
  const data = readDB();
  console.log(req.body)
  res.status(req.body.password === data.auth.password ? 200 : 401).send({});
});

app.put("/awnser", (req, res) => {
  const data = readDB();
  let index = data.members.findIndex((m) => m.name === req.body.name);
  let httpCode = 201;
  if (index < 0) {
    httpCode = 400;
  } else {
    data.members[index] = req.body;
    writeDB(data);
  }
  res.status(httpCode).json(data.members);
});

app.delete("/undo/:name", (req, res) => {
  const { name } = req.params;
  const data = readDB();
  if (name === 'ROOT')
    res.status(200).send(resetDB());
  else {
    data.members[data.members.findIndex((m) => m.name === name)] = { name, awnsers: [] };
    writeDB(data);
    res.status(200).send(data.members);
  }
});

/// =====================================================================================
/// stating
/// =====================================================================================

app.listen(PORT, () => {
  console.log(`Running ipi-node-api at http://localhost:${PORT}`);
});
