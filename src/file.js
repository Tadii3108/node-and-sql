"use strict"

require("dotenv").config();

const { Client, Pool } = require("pg");

let client = new Client({
    user: "tadiwa",
    host: "localhost",
    database: "db",
    password: "pass",
    port: 5432
});

client.connect()

const addNewVisitor = async(visitor_name, visitor_age, date_of_visit, time_of_visit, assistant, comments) => {
    let text, values, query;
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
        query = await client.query(text,values)

        await client.end()
        return query.rows
    } catch(err) {
        console.log(err);
        await client.end()
    }
}

addNewVisitor('Tadiwa Zingoni', 21, '09/02/2020', '14:20', 'John Doe', 'cool!')

