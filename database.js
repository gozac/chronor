const sqlite3 = require("sqlite3").verbose();

// Créer ou ouvrir la base de données SQLite
const db = new sqlite3.Database("./tasks.db", (err) => {
  if (err) {
    console.error("Erreur lors de l'ouverture de la base de données", err.message);
  } else {
    console.log("Base de données SQLite connectée.");
  }
});

// Créer la table `tasks` si elle n'existe pas
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      start TEXT NOT NULL,
      end TEXT NOT NULL
    )
  `);
  console.log("Table `tasks` vérifiée/créée.");
});

module.exports = db;
