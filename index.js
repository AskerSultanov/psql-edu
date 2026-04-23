import { Client } from "pg";
import express from "express";
import tables from "./tables.js";
import { report } from "./report.js";
import transformObj from "./transformObj.js";
import dbUtils from "./collections/reports/index.js";

var client = new Client(JSON.parse(process.env.options));
client.connect();

var app = express();

app.delete("/", async (req, res) => {
  await client.query(`DROP TABLE IF EXISTS users, skus, goods, reports, tokens,  tax_params, reports_trees, weekly_prices_and_discounts`);
  return res.json({ ok: "ok" });
});

app.post("/createtable", async (req, res) => {
  for (var table of tables) {
    await client.query(table);
  }
  return res.json({ ok: "ok" });
});

app.post("/savereport", async (req, res) => {
  await dbUtils.saveReportToDb(client, report);
  return res.json({ ok: "ok" });
});

app.post("/insertjson", async (req, res) => {
  for (var i = 0; i < skus.length; i++) {
    var pipeline = `UPDATE reports SET skus = array_append(skus, '${JSON.stringify(skus[i])}') WHERE user_id = '96c98f5263d28febbe7a';`;

    await client.query(pipeline);
  }

  return res.json({ ok: "ok" });
});

app.get("/", async (req, res) => {
  var { report } = await dbUtils.getReportById(client, "96c98f5263d28febbe7a", 650668408);
  return res.json({ report });
});

app.post("/getjson", async (req, res) => {
  var { rows } = await client.query(`select skus FROM reports ; `);
  console.log({ rows: rows });
  return res.json({ rows });
});

app.patch("/changejson", async (req, res) => {
  var pipeline = `UPDATE reports  SET skus = jsonb_set(skus, '{1, sku_id}', '2'::jsonb) jsonb_set(skus, '{1, sku_name}', '"new_sku_name"'::jsonb) WHERE user_id = '96c98f5263d28febbe7a'`;
  console.log({ pipeline });
  var { rows } = await client.query(pipeline);
  return res.json({ rows });
});

app.get("/bykey", async (req, res) => {
  var pipeline = `SELECT age, username FROM users WHERE id=${3};`;
  var { rows } = await client.query(pipeline);
  return res.json({ rows });
});

app.post("/update", async (req, res) => {
  var pipeline = `UPDATE users SET age = 1 WHERE age < 10 ;`;
  var { rows } = await client.query(pipeline);
  return res.json({ rows });
});

app.post("/drop", async (req, res) => {
  var pipeline = `DELETE FROM users ;`;
  var { rows } = await client.query(pipeline);
  return res.json({ rows });
});

app.delete("/deletereport", async (req, res) => {
  var success = await dbUtils.deleteReportFromDb(client, "96c98f5263d28febbe7a", 650668408);
  res.json({ success });
});

(async () => {
  console.clear();
  app.use(express.urlencoded());
  app.listen(8000, "localhost", () => console.log("server is started"));
})();
