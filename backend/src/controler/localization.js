import { openDb } from "../db.js";

export async function selectLocalizations(req, res) {
  openDb().then((db) => {
    db.all("SELECT * FROM tabela").then((localizations) =>
      res.json(localizations)
    );
  });
}

export async function selectLocalization(req, res) {
  let key = req.params.key;
  openDb().then((db) => {
    db.get("SELECT * FROM tabela WHERE key=?", [key]).then((localization) =>
      res.json(localization)
    );
  });
}

export async function insertLocalization(req, res) {
  let localization = req.body;
  console.log(localization);
  openDb().then((db) => {
    db.run(
      "INSERT INTO tabela (description, data_inicio, data_fim, plataforma, localizacao) VALUES (?,?,?,?,?)",
      [
        localization.description,
        localization.data_inicio,
        localization.data_fim,
        localization.plataforma,
        localization.localizacao,
      ]
    );
  });
  res.json({ statusCode: 200 });
}

export async function updateLocalization(req, res) {
  let localization = req.body;
  console.log(localization);
  openDb().then((db) => {
    db.run(
      "UPDATE tabela SET description=?, data_inicio=?, data_fim=?, plataforma=?, localizacao=? WHERE key=?",
      [
        localization.description,
        localization.data_inicio,
        localization.data_fim,
        localization.plataforma,
        localization.localizacao,
        localization.key,
      ]
    );
  });
  res.json({
    statusCode: 200,
  });
}

export async function deleteLocalization(req, res) {
  let key = req.params.key;
  openDb().then((db) => {
    db.get("DELETE FROM tabela WHERE key=?", [key]).then((res) => res);
  });
  res.json({
    statusCode: 200,
  });
}
