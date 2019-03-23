const express = require("express");

const path = require("path");

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const playerInformation = require("./model");

mongoose.connect("mongodb://localhost:27017/minihackathon", error => {
  if (error) {
    throw error;
  }
  console.log("Connect to Mongodb success!");
  const server = express();

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(express.static("public"));

  //route index
  server.get("/", (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname + "/public/index.html"));
  });

  server.post("/", async (req, res) => {
    console.log(req.body);
    // const body = JSON.parse(req.body);
    // console.log(body);
    const newName = {
      player: JSON.parse(req.body.player)
    };
    const result = await playerInformation.create(newName);
    console.log(result);
    res.status(201).json({
      id: result._id
    });
  });

  //route Game
  server.get("/get-game-by-id/:id", async (req, res) => {
    const gameId = req.params.id;
    const result = await playerInformation.findById(gameId);
    res.status(200).json(result);
  });

  server.get("/games/:playerId", (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname + "/public/game.html"));
  });

  server.listen(8080, error => {
    //check connection
    if (error) {
      throw error;
    }
    console.log("server listen port 8080...");
  });
});
