import { Client } from "pg";
import express from "express";
import tables from "./tables.js";
import { report, jsonskus } from "./report.js";
import transformObj from "./transformObj.js";

var { skus, ...totals } = report;

var reportsSchema = `CREATE TABLE IF NOT EXISTS reports (
  user_id text NOT NULL,
  report_id integer PRIMARY KEY,
  skus json[] NOT NULL DEFAULT '{}',
)`;

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

app.post("/insert", async (req, res) => {
  var reportTablePipeline = `INSERT INTO reports (${transformObj(Object.keys(totals), false)})
                                       VALUES (${transformObj(Object.values(totals))}) ;`;

  var pipeline = `INSERT INTO skus (${transformObj(Object.keys(skus[0]), false)}) 
                                       VALUES (${transformObj(Object.values(skus[0]))}),
                                              (${transformObj(Object.values(skus[1]))}),
                                              (${transformObj(Object.values(skus[2]))}),
                                              (${transformObj(Object.values(skus[3]))}),
                                              (${transformObj(Object.values(skus[4]))})`;

  await client.query(reportTablePipeline);
  await client.query(pipeline);
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
  var totals = (await client.query(`SELECT * FROM reports WHERE user_id = '96c98f5263d28febbe7a' ;`)).rows;
  var skus = (await client.query(`SELECT * FROM skus  WHERE user_id = '96c98f5263d28febbe7a' ;`)).rows;
  return res.json({ totals, skus });
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

(async () => {
  console.clear();
  app.use(express.urlencoded());
  app.listen(8000, "localhost", () => console.log("server is started"));
})();
