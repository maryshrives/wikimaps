"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("markers")
      .then((results) => {
        res.json(results);
    });
  });

  router.post("/delete", (req, res) => {
    knex("markers")
      .where("id", Number([req.body.data]))
      .del()
      .then (() =>{
        res.status(200).send("deleted");
      });
  });

  router.get("/faves", (req, res) => {
    knex
      .select("*")
      .from("fave_maps")
      .innerJoin("maps", "map_id", "maps.id")
      .then((results) => {
        res.json(results);
      });
  });

  router.get("/contributions", (req, res) => {
    knex
      .select("*")
      .from("contribution")
      .innerJoin("maps", "map_id", "maps.id")
      .then((results) => {
        res.json(results);
      });
  });

  return router;
};
