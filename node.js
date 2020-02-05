const Pool = require("pg").Pool;
const pool = new Pool({
    user: "user",
    host: "localhost",
    database: "db",
    password: "pass",
    port: 5432
});

const helloWorld = () => {
    pool.query(
        "SELECT $1::text as message",
        ["Hello world!"],
        (error, results) => {
            if (error) {
                throw error;
            }

            console.log(results.rows);
        }
    );
};
helloWorld();

//adds a new visitor to the database table
const addNewVisitor = () => {
    pool.query(
        "INSERT INTO visitors (visitor_name, visitor_age, date_of_visit, time_of_visit, assistant, comments) values ($1, $2, $3, $4, $5, $6)", ['Tadiwa Zingoni', 20, '01-02-2020', '10:30', 'JoeBoy', 'Fast learner'],
        (err, info) => {
            if (err) {
                throw err
            }
            console.log(info.rows)
        }
    );
};
addNewVisitor();

//returns a list of the name's of visitors and their id's
const listVisitors = () => {
    pool.query(
        "SELECT id, visitor_name FROM visitors",
        [], (err, info) => {
            if (err) {
                throw err
            }
            console.log(info.rows)
        }
    );
};
listVisitors();

//deletes a visitor
const deleteVisitor = () => {
    pool.query(
        "DELETE FROM visitors WHERE $1",
        [2], (err, info) => {
            if (err) {
                throw err
            }
            console.log(info.rows)
        }
    );
};
deleteVisitor();

//updates a visitor
const updateVisitor = () => {
    pool.query(
        "UPDATE visitors SET $1",
        [3], (err, info) => {
            if (err) {
                throw err
            }
            console.log(info.rows)
        }
    );
};
updateVisitor();

//returns all visitor information from id
const viewVisitor = () => {
    pool.query(
        "SELECT * FROM visitors WHERE $1", 
        [1], (err, info) => {
            if (err) {
                throw err
            }
            console.log(info.rows)
        }
    );
};
viewVisitor();

//deletes all entries from visitors table
const deleteAllVisitors = () => {
    pool.query(
        "DELETE * FROM visitors",
        [], (err, info) => {
            if (err) {
                throw err
            }
            console.log(info.rows)
        }
    );
};
deleteAllVisitors();