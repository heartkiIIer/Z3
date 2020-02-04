const Pool = require('pg').Pool
const pool = new Pool({
    user: 'edelmonaco',
    host: 'localhost',
    database: 'sleephealth',
    password: 'sleephealthrox1234',
    port: 5432,
})

//User management

//Test function, gets all users
function getUsers(req, res) {
    pool.query('SELECT * FROM users ORDER BY user_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(results.rows);
    });
}

//Caffeine entry
//Get all caffeine entries for a given user
function getCaffeineEntriesById(req, res, id) {
    pool.query('SELECT * FROM CaffeineEntry WHERE user_id ='+ id +';' , (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(results.rows);
    });
}

//Add a caffeine entry

//Remove a caffeine entry

//Modify a caffeine entry

//Exercise Entry
//Get all exercise entries for a given user
function getExerciseEntriesById(req, res, id) {
    pool.query('SELECT * FROM ExerciseEntry WHERE user_id ='+ id +';' , (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(results.rows);
    });
}

//Add a exercise entry

//Remove a exercise entry

//Modify a exercise entry

//Sleep Entry

//Add a sleep entry

//Remove a sleep entry

//Modify a sleep entry

//Create user

//Test Result

//Add a test result

//Bedtime Routine Task

//Add a task

//Remove a task

//Modify a task

module.exports = {
    getUsers,
}