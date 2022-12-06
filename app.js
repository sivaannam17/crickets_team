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
    SELECT * FROM cricket_team
    ORDER BY player_id;`;
  const playersArray = await db.all(getPlayerQuery);
  response.send(playersArray);
});

app.post("/players/", async (request, response) => {
  //   const player_id = request.params;
  const playerDetails = request.body;
  //console.log(request);
  console.log(request.body);
  console.log(playerDetails);
  const { player_name, jersey_number, role } = playerDetails;
  const addPlayerQuery = `
    Insert INTO cricket_team(player_name,jersey_number,role)
    values
    (   ${player_name},
        ${jersey_number},
        ${role}
    };`;
  const dbResponse = await db.run(addPlayerQuery);
  const player_Id = dbResponse.lastID;
  response.send({ player_id: player_Id });
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

  const updateQuery = `
    UPDATE cricket_team SET 
    player_name = $'{playerName}',
    jersey_number = ${jerseyNumber},
    role = $'{role}'
    WHERE player_id = ${playerID};
    `;
  await db.run(updateQuery);
  response.send("Player Details Updated");
});

app.delete("/players/:playerId/",async (request, response) => {
    const { playerId } = request.params;
    const deleteBookQuery = `
    DELETE FROM cricket_team WHERE playerId = ${playerId}; `;
    await db.run(deleteBookQuery);
    response.send("Player Removed");
  }
);
module.exports = app;
