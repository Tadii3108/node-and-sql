"use strict"

require("dotenv").config();

const Pool = require("pg").Pool;
const text;

let pool = new Pool({
    user: "tadiwa",
    host: "localhost",
    database: "db",
    password: "pass",
    port: 5432
});

pool.connect()

const addNewVisitor = async(visitor_name, visitor_age, date_of_visit, time_of_visit, assistant, comments) => {
    let values, query;
    text = `INSERT INTO visitors(
                'name',
                'age',
                'date',
                'time',
                'name_of_assistant',
                'comments')
            VALUES($1,$2,$3,$4,$5,$6)
            RETURNING *`

    values = [visitor_name, visitor_age, date_of_visit, time_of_visit, assistant, comments]

    try {
        query = await pool.query(text,values)

        await pool.end()
        return query.rows
    } catch(err) {
        console.log(err);
        await pool.end()
    }
}

const listVisitors = async () => {
    text = `SELECT id, visitor_name FROM visitors`;

    return await pool.query(text);  
}

const deleteVisitor = async id => {
    let values = [id];
    text = `DELETE FROM visitors WHERE $1`;

    return await pool.query(id, text);
}

const updateVisitor = (id, visitor_name, visitor_age, date_of_visit, time_of_visit, assistant, comments) => {
    text = `UPDATE visitors SET name = $2, age = $3, date = $4, time = $5, assistant = $6, comment = $7 WHERE id = $1`;
    let values = [id, visitor_name, visitor_age, date_of_visit, time_of_visit, assistant, comments];

    try {
        query = await pool.query(text,values)

        await pool.end()
        return query.rows
    } catch(err) {
        console.log(err);
        await pool.end()
    }
}

const viewVisitor = id => {
    text = `SELECT * FROM visitors WHERE $1`;
    let values = [id];

    try {
        query = await pool.query(text,values)

        await pool.end()
        return query.rows
    } catch(err) {
        console.log(err);
        await pool.end()
    }
}

const deleteAllVisitors = () => {
    text = `DELETE FROM visitors`;

    try {
        query = await pool.query(text,values)

        await pool.end()
        return query.rows
    } catch(err) {
        console.log(err);
        await pool.end()
    }
}

module.exports = {
    addNewVisitor,
    listVisitors,
    deleteVisitor,
    updateVisitor,
    viewVisitor,
    deleteAllVisitors
}