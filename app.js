const express = require("express");
const app = express();
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const dbPath = path.join(__dirname, "cricketTeam.db");
let db = null;
const initializeDbServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`Db Error :${e.message}`);
    process.exit(1);
  }
};
initializeDbServer();
app.get("/players/", async (request, response) => {
  const getPlayerQuery = `
    SELECT * FROM cricket_team;`;
  const playersArray = await db.all(getPlayerQuery);
  response.send(playersArray);
});

app.post("/players/", async (request, response) => {
<<<<<<< HEAD
=======
  //   const player_id = request.params;
>>>>>>> f26b24b209af6aed1753a6c9682a05260c02b5f5
  const playerDetails = request.body;
  console.log(playerDetails);
  const { playerName, jerseyNumber, role } = playerDetails;
  const addPlayerQuery = `
    Insert INTO cricket_team(player_name,jersey_number,role)
    values
    (  '${playerName}',
        ${jerseyNumber},
        ${role}
    };`;
  const dbResponse = await db.run(addPlayerQuery);
  const playerId = dbResponse.lastID;
  response.send("Player Added to Team");
});

app.get("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const playerQuery = `
    SELECT * FROM cricket_team WHERE player_id=${playerId}`;
  const player = await db.get(playerQuery);
  response.send(player);
});

app.put("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const playerDetails = request.body;
  const { playerName, jerseyNumber, role } = playerDetails;
  console.log(playerName);

  const updatePlayerQuery = `
    UPDATE cricket_team SET 
    player_name = '${playerName}',
    jersey_number = ${jerseyNumber},
    role = '${role}'
    WHERE player_id = ${playerID};
    `;
  await db.run(updatePlayerQuery);
  response.send("Player Details Updated");
});

<<<<<<< HEAD
app.delete("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const deleteBookQuery = `
    DELETE FROM cricket_team WHERE player_id = ${playerId}; `;
  await db.run(deleteBookQuery);
  response.send("Player Removed");
});
=======
app.delete("/players/:playerId/",async (request, response) => {
    const { playerId } = request.params;
    const deleteBookQuery = `
    DELETE FROM cricket_team WHERE playerId = ${playerId}; `;
    await db.run(deleteBookQuery);
    response.send("Player Removed");
  }
);
>>>>>>> f26b24b209af6aed1753a6c9682a05260c02b5f5
module.exports = app;
