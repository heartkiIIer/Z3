const Pool = require('pg').Pool
const pool = new Pool({
    user: 'edelmonaco',
    host: 'localhost',
    database: 'sleephealth',
    password: 'sleephealthrox1234',
    port: 5432,
})

function checkQuery(string){
    if(string.includes(";")){
        throw new Error("Forbidden character")
    }
}

//Test function, gets all users
function getUsers(req, res) {
    pool.query('SELECT * FROM users ORDER BY user_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(results.rows);
    });
}

//Get a single user/add them
function getUser(req, res, id, first) {
    checkQuery(id);
    checkQuery(first);
    pool.query('SELECT * FROM users WHERE google_id='+id+';', (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows);
        if(results.rows.length == 0){
            addUser(req, res, id, first);
        }
        res.send(results.rows);
    });
}

//Add a new user
function addUser(req, res, id, first) {
    checkQuery(id);
    checkQuery(first);
    console.log("INSERT INTO Users(google_id, first_name, last_name) VALUES("+id+", " + first+", );");
    pool.query("INSERT INTO Users(google_id, first_name, last_name) VALUES("+id+", " + first+", NULL);" , (error, results) => {
        if (error) {
            throw error
        }
    });
}

//Caffeine entry
//Get all caffeine entries for a given user
function getCaffeineEntriesById(req, res, id) {
    const promise = promiseBuildergoogleIdtoInternal(id);
    promise
        .then(function(internalId) {
            pool.query('SELECT * FROM CaffeineEntry WHERE user_id ='+ internalId +';' , (error, results) => {
                if (error) {
                    throw error
                }
                console.log(results.rows);
                res.status(200).send(results.rows);
            });
        }).catch(function(error){
        console.log(error)
    })
}

//Add a caffeine entry
function addCaffeineEntriesById(req, res, id, cups, size) {
    const promise = promiseBuildergoogleIdtoInternal(id);
    promise
        .then(function(internalId) {
            pool.query('INSERT INTO CaffeineEntry(user_id, date, cups, size) VALUES('+internalId+', current_timestamp,' + cups+', '+size+');' , (error, results) => {
                if (error) {
                    throw error
                }
                console.log(results.rows);
                res.status(200).send(results.rows);
            });
        }).catch(function(error){
        console.log(error)
    })
}

//Remove a caffeine entry
function deleteCaffeineEntriesById(req, res, id) {
    pool.query('DELETE FROM CaffeineEntry WHERE entry_id ='+ id +';' , (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(results.rows);
    });
}

//Exercise Entry
//Get all exercise entries for a given user
function getExerciseEntriesById(req, res, id) {
    const promise = promiseBuildergoogleIdtoInternal(id);
    promise
        .then(function(internalId) {
            pool.query('SELECT * FROM ExerciseEntry WHERE user_id ='+ internalId +';' , (error, results) => {
                if (error) {
                    throw error
                }
                console.log(results.rows);
                res.status(200).send(results.rows);
            });
        }).catch(function(error){
        console.log(error)
    })
}

//Add a exercise entry
function addExerciseEntriesById(req, res, id, minutes, intensity) {
    const promise = promiseBuildergoogleIdtoInternal(id);
    promise
        .then(function(internalId) {
            pool.query('INSERT INTO ExerciseEntry(user_id, date, minutes, intensity) VALUES('+internalId+', current_timestamp,' + minutes+', ' + intensity+');' , (error, results) => {
                if (error) {
                    throw error
                }
                console.log(results.rows);
                res.status(200).send(results.rows);
            });
        }).catch(function(error){
        console.log(error)
    })
}

//Remove a exercise entry
function deleteExerciseEntriesById(req, res, id) {
    pool.query('DELETE FROM ExerciseEntry WHERE entry_id ='+ id +';' , (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(results.rows);
    });
}
//Sleep Entry

//Add a sleep entry

//Remove a sleep entry

//Modify a sleep entry

//Create user

//Test Result

//Add a test result

//Bedtime Routine Task
//builds a promise that converts id
function promiseBuildergoogleIdtoInternal(googleid){
    var promise = new Promise(function(resolve, reject){
        pool.query('SELECT * FROM users WHERE google_id='+googleid+';', (error, results) => {
            if (error) {
                reject();
            }
            resolve(results);
        });
    });
    return promise;
}
//retrieve bedtime routine by id
function getBedtimeRoutineById(req, res, id) {
    const promise = promiseBuildergoogleIdtoInternal(id);
    promise
        .then(function(internalId) {
            console.log(internalId.rows[0].user_id);
            pool.query('SELECT * FROM BedtimeRoutineTask WHERE user_id =' + internalId.rows[0].user_id + ';', (error, results) => {
                if (error) {
                    throw error
                }
                console.log(results.rows);
                res.status(200).send(results.rows);
            });
        }).catch(function(error){
            console.log(error)
        })
}

//Add a task
function addBedtimeRoutineById(req, res, id, minutes, task) {
    checkQuery(task)
    const promise = promiseBuildergoogleIdtoInternal(id);
    promise
        .then(function(internalId) {
            pool.query("INSERT INTO BedtimeRoutineTask(user_id, minutes, title) VALUES("+internalId.rows[0].user_id+", " + minutes +", '" + task+"');" , (error, results) => {
                if (error) {
                    throw error
                }
                console.log(results.rows);
                res.status(200).send(results.rows);
            });
        }).catch(function(error){
        console.log(error)
    })
}

//Remove a task
function deleteBedtimeRoutinesById(req, res, id) {
    pool.query('DELETE FROM BedtimeRoutineTask WHERE task_id ='+ id +';' , (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(results.rows);
    });
}

//Chronotype functions
//Get chronotype results
function getChronotypeById(req, res, id) {
    const promise = promiseBuildergoogleIdtoInternal(id);
    promise
        .then(function(internalId) {
            pool.query('SELECT * FROM chronotype WHERE user_id =' + internalId.rows[0].user_id + ';', (error, results) => {
                if (error) {
                    throw error
                }
                console.log(results.rows);
                res.status(200).send(results.rows);
            });
        }).catch(function(error){
        console.log(error)
    })
}

function putChronotypeById(req, res, id, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13) {
    const promise = promiseBuildergoogleIdtoInternal(id);
    promise
        .then(function(internalId) {
            pool.query('INSERT INTO chronotype(user_id, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13) VALUES('+internalId.rows[0].user_id+', ' + q1+', ' + q2+ ', ' + q3+ ', ' + q4+ ', ' + q5+ ', ' + q6+ ', ' + q7+ ', ' + q8+ ', ' + q9+ ', ' + q10+ ', ' + q11+ ', ' + q12+ ', ' + q13+');', (error, results) => {
                if (error) {
                    throw error
                }
                console.log(results.rows);
                res.status(200).send(results.rows);
            });
        }).catch(function(error){
        console.log(error)
    })
}

//Weekly report
function getWeekById(req, res, id){
    const promise = promiseBuildergoogleIdtoInternal(id);
    promise
        .then(function(internalId) {
            pool.query('SELECT * FROM chronotype WHERE user_id =' + internalId.rows[0].user_id + ';', (error, results) => {
                if (error) {
                    throw error
                }
                console.log(results.rows);
                res.status(200).send(results.rows);
            });
        }).catch(function(error){
        console.log(error)
    })
}

module.exports = {
    getUsers,
    deleteCaffeineEntriesById,
    deleteExerciseEntriesById,
    addCaffeineEntriesById,
    addExerciseEntriesById,
    addUser,
    getCaffeineEntriesById,
    getExerciseEntriesById,
    getUser,
    getBedtimeRoutineById,
    addBedtimeRoutineById,
    deleteBedtimeRoutinesById,
    getChronotypeById,
    putChronotypeById,
    getWeekById,
}