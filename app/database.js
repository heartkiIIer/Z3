const Pool = require('pg').Pool
const pool = new Pool({
    user: 'edelmonaco',
    host: 'localhost',
    database: 'sleephealth',
    password: 'sleephealthrox1234',
    port: 5432,
})

//User management
const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY user_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//Caffeine entry

//Add a caffeine entry

//Remove a caffeine entry

//Modify a caffeine entry

//Exercise Entry

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