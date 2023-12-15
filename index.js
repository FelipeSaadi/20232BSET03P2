const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE if NOT EXISTS cats (id integer primary key, name TEXT unique, votes INT)");
  db.run("CREATE TABLE if NOT EXISTS dogs (id INT, name TEXT unique, votes INT)");
});

app.post('/cats', (req, res) => {
  const name = req.body.name;

  if(name != null && typeof(name) == typeof('') && name.length < 20) {
    db.run(`INSERT INTO cats (name, votes) VALUES ('${name}', 0)`, function(err) {
      if (err) {
        res.status(500).send("Erro ao inserir no banco de dados");
      } else {
        res.status(201).json({name, votes: 0 });
      }
    });
  }
});

app.post('/dogs', (req, res) => {
  const name = req.body.name;

  if(name != null && typeof(name) == typeof('') && name.length < 20) {
    db.run(`INSERT INTO dogs (name, votes) VALUES ('${name}', 0)`, function(err) {
      if (err) {
        res.status(500).send("Erro ao inserir no banco de dados");
      } else {
        res.status(201).json({name, votes: 0 });
      }
    });
  }
});

app.post('/vote/:animalType/:id'), (req, res) => {
  db.all(`SELECT FROM '${animalType}' WHERE id = " + ${id}`, [], (err, rows) => {
    if (err) {
      res.status(500).send("Erro ao consultar o banco de dados");
    } else {
      db.run(`UPDATE ${animalType} SET votes = votes + 1 WHERE id = ${id}`);
      res.status(200).send("Voto computado");
    }
  });
}

app.get('/cats', (req, res) => {
  db.all("SELECT * FROM cats", [], (err, rows) => {
    if (err) {
      res.status(500).send("Erro ao consultar o banco de dados");
    } else {
      res.json(rows);
    }
  });
});

app.get('/dogs', (req, res) => {
  db.all("SELECT * FROM cats", [], (err, rows) => {
    if (err) {
      res.status(500).send("Erro ao consultar o banco de dados");
    } else {
      res.json(rows);
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Ocorreu um erro!');
});

app.listen(port, () => {
  console.log(`Cats and Dogs Vote app listening at http://localhost:${port}`);
});