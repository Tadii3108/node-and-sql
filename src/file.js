"use strict"

require("dotenv").config();

const Pool = require("pg").Pool;

let pool = new Pool({
    user: "user",
    host: "localhost",
    database: "db",
    password: "pass",
    port: 5432
});


const addNewVisitor = async(visitor_name, visitor_age, date_of_visit, time_of_visit, assistant, comments) => {
    let values, query;
    var stop = await pool.connect();
    const text = `INSERT INTO visitors(
                visitor_name,
                visitor_age,
                date_of_visit,
                time_of_visit,
                assistant,
                comments)
            VALUES($1,$2,$3,$4,$5,$6)
            RETURNING *`

    values = [visitor_name, visitor_age, date_of_visit, time_of_visit, assistant, comments]

    try {
        query = await pool.query(text,values)
        stop.release();
        await pool.end();
        console.log("User has been added!")
        return query.rows
    } catch(err) {
        console.log(err);
    }
}

const listVisitors = async () => {
    const text = `SELECT id, visitor_name FROM visitors`;
    var stop = await pool.connect();

    return await pool.query(text);
    stop.release();
    await pool.end();
    console.log("User have been listed!");
}

//const deleteVisitor = async id => {
//    let values = [id];
//    const text = `DELETE FROM visitors WHERE $1`;

//    return await pool.query(id, text);
//    console.log("User has been deleted!")
//}

//const updateVisitor = (id, visitor_name, visitor_age, date_of_visit, time_of_visit, assistant, comments) => {
//    text = `UPDATE visitors SET name = $2, age = $3, date = $4, time = $5, assistant = $6, comment = $7 WHERE id = $1`;
//    let values = [id, visitor_name, visitor_age, date_of_visit, time_of_visit, assistant, comments];

//    try {
//        query = await pool.query(text,values)

//        await pool.end()
//        return query.rows
//    } catch(err) {
//        console.log(err);
//        await pool.end()
//    }
//    console.log("User has been deleted!")
//}

//const viewVisitor = id => {
//    const text = `SELECT * FROM visitors WHERE $1`;
//    let values = [id];

//    try {
//        query = await pool.query(text,values)

//        await pool.end()
//        return query.rows
//    } catch(err) {
//        console.log(err);
//        await pool.end()
//    }
//}

const deleteAllVisitors = async () => {
    const text = `DELETE FROM visitors`;

    try {
        query = await pool.query(text,values)

        await pool.end()
        return query.rows
    } catch(err) {
        console.log(err);
        await pool.end()
    }
}

//addNewVisitor('Kate Winslet', 44, '14/02/1912','22:22', 'Leonardo Dicaprio', 'LOML');
listVisitors();
//deleteVisitor('');
//updateVisitor();
//viewVisitor();
//deleteAllVisitors();

module.exports = {
    addNewVisitor,
    listVisitors,
    //deleteVisitor,
    //updateVisitor,
    //viewVisitor,
    deleteAllVisitors
}