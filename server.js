const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database.js");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Récupérer toutes les tâches
app.get("/tasks", (req, res) => {
  db.all("SELECT * FROM tasks", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Ajouter une nouvelle tâche
app.post("/tasks", (req, res) => {
  const { user_id, start, end } = req.body;

  db.run(
    "INSERT INTO tasks (user_id, start, end) VALUES (?, ?, ?)",
    [user_id, start, end],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({
          id: this.lastID,
          user_id,
          start,
          end,
        });
      }
    }
  );
});

// Modifier une tâche existante
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { user_id, start, end } = req.body;

  db.run(
    "UPDATE tasks SET user_id = ?, start = ?, end = ? WHERE id = ?",
    [user_id, start, end, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: "Tâche mise à jour avec succès." });
      }
    }
  );
});

// Supprimer une tâche
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  console.log("delete task " + id);

  db.run("DELETE FROM tasks WHERE id = ?", id, function (err) {
    if (err) {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: "Tâche supprimée avec succès." });
    }
  });
});

app.listen(port, () => {
  console.log(`Serveur backend en écoute sur http://localhost:${port}`);
});
