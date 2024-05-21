const express = require('express');
const Movie = require('./models/Movie');
const router = express.Router();

// https://image.tmdb.org/t/p/w185/
class MovieObject {
    constructor(id, genres_str, original_title, overview, poster_path, production_companies_str, release_date, runtime, cast_str, keywords_str) {
        this.id = parseInt(id);
        this.genres = genres_str ? this.getNameListFromString(genres_str) : [];
        this.original_title = original_title;
        this.overview = overview;
        this.poster_path = poster_path;
        this.production_companies = production_companies_str ? this.getNameListFromString(production_companies_str) : [];
        this.release_date = release_date;
        this.runtime = parseFloat(runtime);
        this.cast = cast_str ? this.getNameListFromString(cast_str) : [];
        this.keywords = keywords_str ? this.getNameListFromString(keywords_str) : [];
    }

    getNameListFromString(str) {
        const re = /\'name\': \'([a-zA-Z\s]*)\'/g;
        let str_name_list = str.match(re);

        if (!str_name_list) {
            return [];
        }


        let output = [];
        str_name_list.forEach(item => {
            output.push(item.replace(`\'name\': \'`, '').replace(`\'`, ''));
        });

        return output;
    }
}

router.get('/', (req, res) => {
    return res.status(200).send("Hello World");
});

router.get('/get_all_movies', async (req, res) => {
    try {
        let results = await Movie.getAllMovies();
        return res.status(200).json(results);
    } catch (e) {
        console.log(e);
        return res.status(500).send("Sorry, Server error");
    }
});

router.get('/get_movie_by_title', async (req, res) => {
    try {
        if (!req.query.movie_title)
            return res.status(400).json({ success: false, message: 'Please provide movie title.' });

        let results = await Movie.getMovieByTitle((req.query.movie_title).replaceAll("'", "''"));
        let result = results[0];

        let movie_list = [];
        result.forEach(item => {
            movie_list.push(new MovieObject(item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], item[8], item[9]));
        })

        return res.status(200).json({ success: true, data: movie_list });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: "Fail to get data" });
    }
});

router.get('/get_movie_by_genres', async (req, res) => {
    try {
        if (!req.query.genres)
            return res.status(400).json({ success: false, message: 'Please provide genres.' });

        let results = await Movie.getMovieByGenres((req.query.genres).replaceAll("'", "''"));
        let result = results[0];

        let movie_list = [];
        result.forEach(item => {
            movie_list.push(new MovieObject(item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], item[8], item[9]));
        })

        return res.status(200).json({ success: true, data: movie_list });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: "Fail to get data" });
    }
});

router.get('/get_movie_by_company', async (req, res) => {
    try {
        if (!req.query.company)
            return res.status(400).json({ success: false, message: 'Please provide company name.' });

        let results = await Movie.getMovieByCompany((req.query.company).replaceAll("'", "''"));
        let result = results[0];

        let movie_list = [];
        result.forEach(item => {
            movie_list.push(new MovieObject(item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], item[8], item[9]));
        })

        return res.status(200).json({ success: true, data: movie_list });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: "Fail to get data" });
    }
});

router.get('/get_movie_by_cast', async (req, res) => {
    try {
        if (!req.query.cast)
            return res.status(400).json({ success: false, message: 'Please provide cast.' });

        let results = await Movie.getMovieByCast((req.query.cast).replaceAll("'", "''"));
        let result = results[0];

        let movie_list = [];
        result.forEach(item => {
            movie_list.push(new MovieObject(item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], item[8], item[9]));
        })

        return res.status(200).json({ success: true, data: movie_list });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: "Fail to get data" });
    }
});

router.get('/get_movie_by_keywords', async (req, res) => {
    try {
        if (!req.query.keywords)
            return res.status(400).json({ success: false, message: 'Please provide keywords.' });

        let results = await Movie.getMovieByKeywords((req.query.keywords).replaceAll("'", "''"));
        let result = results[0];

        let movie_list = [];
        result.forEach(item => {
            movie_list.push(new MovieObject(item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], item[8], item[9]));
        })

        return res.status(200).json({ success: true, data: movie_list });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: "Fail to get data" });
    }
});

router.get('/get_movie_by_id', async (req, res) => {
    try {
        if (!req.query.movie_id)
            return res.status(400).json({ success: false, message: 'Please provide movie id.' });

        let results = await Movie.getMovieById((req.query.movie_id).replaceAll("'", "''"));
        let result = results[0];

        let movie_list = [];
        result.forEach(item => {
            movie_list.push(new MovieObject(item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], item[8], item[9]));
        })

        return res.status(200).json({ success: true, data: movie_list });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: "Fail to get data" });
    }
});

module.exports = router;