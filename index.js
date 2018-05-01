const sqlite = require("sqlite"),
	Sequelize = require("sequelize"),
	request = require("request"),
	express = require("express"),
	app = express();

const {
	PORT = 3000,
	NODE_ENV = "development",
	DB_PATH = "./db/database.db"
} = process.env;

// START SERVER
Promise.resolve()
	.then(() =>
		app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
	)
	.catch(err => {
		if (NODE_ENV === "development") console.error(err.stack);
	});

// ROUTES
app.get("/films/:id/recommendations", getFilmRecommendations);

// ROUTE HANDLER
function getFilmRecommendations(req, res) {

	
	try {
	const dbPromise = sqlite.open(DB_PATH, { Promise });
    const db = await dbPromise;
    const [genres] = await Promise.all([
      db.all('SELECT * FROM genre')
    ]);
    res.render('post', { genres });
  } catch (err) {
    next(err);
  }















	res.status(500).send("Not Implemented");
	console.log(req.params);
	let filmId = req.params.id;
	console.log(filmId);
}

module.exports = app;
