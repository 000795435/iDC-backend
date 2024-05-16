const config = require('../../config');
const sql = require('mssql');

const executeGetQuery = async (query) => {
    try {
        await sql.connect(config.connection_string);
        let request = new sql.Request();
        request.arrayRowMode = true;
        let result = await request.query(query);
        return result.recordsets;
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getAllMovies: async () => {
        let query = `SELECT *
                        FROM movies_metadata`;
        return (await executeGetQuery(query));

    },

    getMovieByTitle: async (movie_title) => {
        let query = `SELECT mm.id, mm.genres, mm.original_title, mm.overview, mm.poster_path, mm.production_companies, mm.release_date, mm.runtime, c.cast, k.keywords
                        FROM movies_metadata mm
                        LEFT JOIN credits c
                        ON TRY_CONVERT(int, mm.id) = TRY_CONVERT(int, c.id)
                        LEFT JOIN keywords k
                        ON TRY_CONVERT(int, mm.id) = TRY_CONVERT(int, k.id)
                        WHERE mm.original_title LIKE '%${movie_title}%'
                        ORDER BY CONVERT(INT, CONVERT(VARCHAR(MAX), mm.revenue)) desc;`;

        return (await executeGetQuery(query));
    },

    getMovieByGenres: async (genres) => {
        let query = `SELECT top(10) mm.id, mm.genres, mm.original_title, mm.overview, mm.poster_path, mm.production_companies, mm.release_date, mm.runtime, c.cast, k.keywords
                        FROM movies_metadata mm
                        LEFT JOIN credits c
                        ON TRY_CONVERT(int, mm.id) = TRY_CONVERT(int, c.id)
                        LEFT JOIN keywords k
                        ON TRY_CONVERT(int, mm.id) = TRY_CONVERT(int, k.id)
                        WHERE mm.genres LIKE '%${genres}%'
                        ORDER BY newid();`;

        return (await executeGetQuery(query));
    },

    getMovieByCompany: async (company) => {
        let query = `SELECT top(10) mm.id, mm.genres, mm.original_title, mm.overview, mm.poster_path, mm.production_companies, mm.release_date, mm.runtime, c.cast, k.keywords
                        FROM movies_metadata mm
                        LEFT JOIN credits c
                        ON TRY_CONVERT(int, mm.id) = TRY_CONVERT(int, c.id)
                        LEFT JOIN keywords k
                        ON TRY_CONVERT(int, mm.id) = TRY_CONVERT(int, k.id)
                        WHERE mm.production_companies LIKE '%${company}%'
                        ORDER BY newid();`;

        return (await executeGetQuery(query));
    },

    getMovieByCast: async (cast) => {
        let query = `SELECT top(10) mm.id, mm.genres, mm.original_title, mm.overview, mm.poster_path, mm.production_companies, mm.release_date, mm.runtime, c.cast, k.keywords
                        FROM movies_metadata mm
                        RIGHT JOIN credits c
                        ON TRY_CONVERT(int, mm.id) = TRY_CONVERT(int, c.id)
                        JOIN keywords k
                        ON TRY_CONVERT(int, mm.id) = TRY_CONVERT(int, k.id)
                        WHERE c.cast LIKE '%${cast}%' AND mm.id is NOT NULL
                        ORDER BY newid();`;

        return (await executeGetQuery(query));
    },

    getMovieByKeywords: async (keywords) => {
        let query = `SELECT top(10) mm.id, mm.genres, mm.original_title, mm.overview, mm.poster_path, mm.production_companies, mm.release_date, mm.runtime, c.cast, k.keywords
                        FROM movies_metadata mm
                        JOIN credits c
                        ON TRY_CONVERT(int, mm.id) = TRY_CONVERT(int, c.id)
                        RIGHT JOIN keywords k
                        ON TRY_CONVERT(int, mm.id) = TRY_CONVERT(int, k.id)
                        WHERE k.keywords LIKE '%${keywords}%' AND mm.id is NOT NULL
                        ORDER BY newid();`;

        return (await executeGetQuery(query));
    }
};