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
    console.log('SELECT * FROM users WHERE firebase_id='+id+';');
    pool.query('SELECT * FROM users WHERE firebase_id='+id+';', (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows);
        if(results.rows.length === 0){
            addUser(req, res, id, first);
        }
        res.send(results.rows);
    });
}

//Add a new user
function addUser(req, res, id, first) {
    checkQuery(id);
    checkQuery(first);
    console.log("INSERT INTO Users(firebase_id, first_name, last_name) VALUES("+id+", " + first+", );");
    pool.query("INSERT INTO Users(firebase_id, first_name, last_name) VALUES("+id+", " + first+", NULL);" , (error, results) => {
        if (error) {
            throw error
        }
    });
}

function deleteUser(req, res, id){
    const promise = promiseBuildergoogleIdtoInternal(id);
    promise
        .then(function(internalId) {
            pool.query('DELETE FROM BedtimeRoutineTask WHERE user_id='+internalId.rows[0].user_id+';' +
                'DELETE FROM sleepEntry WHERE user_id='+internalId.rows[0].user_id+';' +
                'DELETE FROM personality WHERE user_id='+internalId.rows[0].user_id+';' +
                'DELETE FROM CaffeineEntry WHERE user_id='+internalId.rows[0].user_id+';' +
                'DELETE FROM chronotype WHERE user_id='+internalId.rows[0].user_id+';' +
                'DELETE FROM StressEntry WHERE user_id='+internalId.rows[0].user_id+';' +
                'DELETE FROM ExerciseEntry WHERE user_id='+internalId.rows[0].user_id+';' +
                'DELETE FROM users WHERE firebase_id='+id+';', (error, results) => {
                if (error) {
                    throw error
                }
                console.log(results.rows);
                res.status(200).send(results.rows);
            });
        }).catch(function(error){
        console.log(error)
    });

}

//Caffeine entry
//Get all caffeine entries for a given user
function getCaffeineEntriesById(req, res, id) {
    const promise = promiseBuildergoogleIdtoInternal(id);
    promise
        .then(function(internalId) {
            pool.query('SELECT * FROM CaffeineEntry WHERE user_id ='+ internalId.rows[0].user_id +';' , (error, results) => {
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
            pool.query('INSERT INTO CaffeineEntry(user_id, date, cups, avg_size) VALUES('+internalId.rows[0].user_id+', current_timestamp,' + cups+', '+size+');' , (error, results) => {
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
            pool.query('SELECT * FROM ExerciseEntry WHERE user_id ='+ internalId.rows[0].user_id +';' , (error, results) => {
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
            pool.query('INSERT INTO ExerciseEntry(user_id, date, minutes, avg_intensity) VALUES('+ internalId.rows[0].user_id +', current_timestamp,' + minutes+', ' + intensity+');' , (error, results) => {
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

//Add a exercise entry through fibit
function addFitbitExerciseEntriesById(req, res, id, minutes, intensity, timestamp) {
    const promise = promiseBuildergoogleIdtoInternal(id);
    promise
        .then(function(internalId) {
            pool.query('INSERT INTO ExerciseEntry(user_id, date, minutes, avg_intensity) VALUES('+ internalId.rows[0].user_id +", TO_TIMESTAMP('"+
                timestamp+"', 'YYYY/MM/DD HH24:MI:SS')," + minutes+', ' + intensity+')'
                + ' ON CONFLICT (user_id, date, avg_intensity) DO UPDATE SET minutes='+ minutes +';' , (error, results) => {
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

//Stress entry
//Get all stress entries for a given user
function getStressEntriesById(req, res, id) {
    const promise = promiseBuildergoogleIdtoInternal(id);
    promise
        .then(function (internalId) {
            pool.query('SELECT * FROM StressEntry WHERE user_id ='+ internalId.rows[0].user_id +';' , (error, results) => {
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

//Get all stress entries for a given user and past the given day
function getStressEntriesByDate(req, res, id, month, day, year) {
    const promise = promiseBuildergoogleIdtoInternal(id);
    promise
        .then(function (internalId) {
            pool.query('SELECT * FROM StressEntry WHERE user_id ='+ internalId.rows[0].user_id +
                'AND month >='+month+' AND day >='+day+' AND year >='+year+';' , (error, results) => {
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

//Add a stress entry
function addStressEntriesById(req, res, id, title, year, month, day, date, value) {
    let time = year + "/";
    if(month < 10){
        time += "0";
    }
    time += month + "/";
    if(day < 10){
        time += "0";
    }
    time += day;
    console.log(time);
    const promise = promiseBuildergoogleIdtoInternal(id);
    promise.then(
        function (internalId) {
            pool.query('INSERT INTO stressEntry(user_id, event, month, day, year, dayofweek, stress, date) VALUES('+ internalId.rows[0].user_id +', ' +
                "'" + title + "', " +  month + "," + day + "," + year + ", " + date + ", " + value + ", TO_TIMESTAMP('" + time + " 00:00:00', 'YYYY/MM/DD HH24:MI:SS')" +
                ") ON CONFLICT (user_id, event, month, day, year) DO UPDATE SET stress="+value+";", (error, results) => {
                if (error) {
                    throw error
                }
                console.log(results.rows);
                res.status(200).send(results.rows);
            });
        }
    ).catch(function(error){
        console.log(error)
    })
}

//Remove a stress entry
function deleteStressEntriesById(req, res, id) {
    pool.query('DELETE FROM StressEntry WHERE entry_id ='+ id +';' , (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(results.rows);
    });
}

//Sleep Entry
//Add a sleep entry
function addSleepEntryById(req, res, id) {
    const promise = promiseBuildergoogleIdtoInternal(id);
    promise
        .then(function(internalId) {
            pool.query("INSERT INTO SleepEntry(user_id, start_sleep) VALUES("+internalId.rows[0].user_id+', current_timestamp' +");" , (error, results) => {
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

function addFitbitSleepEntryById(req, res, id, start, end) {
    let starttime = "TO_TIMESTAMP('"+start+"', 'YYYY/MM/DD HH24:MI:SS')";
    let endtime = "TO_TIMESTAMP('"+end+"', 'YYYY/MM/DD HH24:MI:SS')";
    const promise = promiseBuildergoogleIdtoInternal(id);
    promise
        .then(function(internalId) {
            let uid = internalId.rows[0].user_id;
            pool.query("INSERT INTO SleepEntry(user_id, start_sleep, end_sleep) SELECT "+
                uid+", "+starttime+", "+endtime+ ' WHERE NOT EXISTS(SELECT 1 FROM sleepentry WHERE'+
                " start_sleep <= "+starttime+" AND end_sleep >= "+starttime+" AND user_id="+uid+" OR start_sleep >= "
                +starttime+" AND end_sleep <= "+endtime+" AND user_id="+uid+" OR start_sleep <= "
                +endtime+" AND end_sleep >= "+endtime+" AND user_id="+uid+");" , (error, results) => {
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

//Add wake to sleep entry
function getLatestSleepById(req, res, id) {
    const promise = promiseBuildergoogleIdtoInternal(id);
    promise
        .then(function(internalId) {
            const promise2 = promiseBuilderMaxEntry(internalId.rows[0].user_id);
            promise2.then(function(entry_id){
                pool.query("SELECT * FROM sleepentry WHERE entry_id ="+entry_id.rows[0].max+";" , (error, results) => {
                    if (error) {
                        throw error
                    }
                    console.log(results.rows);
                    res.status(200).send(results.rows);
                })
            }).catch(function(error){
                console.log(error)
            })
        }).catch(function(error){
        console.log(error)
    })
}

//Add wake to sleep entry
function addWakeById(req, res, id) {
    const promise = promiseBuildergoogleIdtoInternal(id);
    promise
        .then(function(internalId) {
            const promise2 = promiseBuilderMaxEntry(internalId.rows[0].user_id);
            promise2.then(function(entry_id){
                pool.query("UPDATE sleepentry SET end_sleep = CASE WHEN end_sleep IS NULL THEN current_timestamp ELSE end_sleep END WHERE entry_id ="+entry_id.rows[0].max+";" , (error, results) => {
                    if (error) {
                        throw error
                    }
                    console.log(results.rows);
                    res.status(200).send(results.rows);
                })
            }).catch(function(error){
                console.log(error)
            })
        }).catch(function(error){
            console.log(error)
        })
}

//Add wake to sleep entry of specific time
function addWakeByTime(req, res, id, time) {
    const promise = promiseBuildergoogleIdtoInternal(id);
    promise
        .then(function(internalId) {
            const promise2 = promiseBuilderMaxEntry(internalId.rows[0].user_id);
            promise2.then(function(entry_id){
                pool.query("UPDATE sleepentry SET end_sleep = CASE WHEN end_sleep IS NULL THEN TO_TIMESTAMP('"+ time +"', 'YYYY/MM/DD HH24:MI:SS') ELSE end_sleep END WHERE entry_id ="+entry_id.rows[0].max+";" , (error, results) => {
                    if (error) {
                        throw error
                    }
                    res.status(200).send(results.rows);
                })
            }).catch(function(error){
                console.log(error)
            })
        }).catch(function(error){
        console.log(error)
    })
}

function checkSavedState(req, res, id) {
    const promise = promiseBuildergoogleIdtoInternal(id);
    promise
        .then(function(internalId) {
            pool.query("SELECT * FROM sleepentry WHERE user_id ="+internalId.rows[0].user_id+");" , (error, results) => {
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

//Create user

//Test Result

//Add a test result

//Bedtime Routine Task
//builds a promise that converts id
function promiseBuildergoogleIdtoInternal(googleid){
    var promise = new Promise(function(resolve, reject){
        pool.query('SELECT * FROM users WHERE firebase_id='+googleid+';', (error, results) => {
            if (error) {
                reject();
            }
            resolve(results);
        });
    });
    return promise;
}

//builds a promise that gets the highest entry id sleep entry given a user id
function promiseBuilderMaxEntry(userid){
    var promise = new Promise(function(resolve, reject){
        pool.query('SELECT MAX(entry_id) FROM sleepentry WHERE user_id='+userid+';', (error, results) => {
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
            pool.query('SELECT * FROM BedtimeRoutineTask WHERE user_id =' + internalId.rows[0].user_id + ' ORDER BY task_id ASC;', (error, results) => {
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
            pool.query("INSERT INTO BedtimeRoutineTask(user_id, minutes, task_name) VALUES("+internalId.rows[0].user_id+", " + minutes +", '" + task+"');" , (error, results) => {
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

//Edit a task
function editBedtimeRoutinesById(req, res, id, task, minutes) {
    pool.query("UPDATE BedtimeRoutineTask SET task_name='" + task + "', minutes="+ minutes +" WHERE task_id ="+ id +';' , (error, results) => {
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
            pool.query('INSERT INTO chronotype(user_id, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, date) VALUES('+internalId.rows[0].user_id+', ' + q1+', ' + q2+ ', ' + q3+ ', ' + q4+ ', ' + q5+ ', ' + q6+ ', ' + q7+ ', ' + q8+ ', ' + q9+ ', ' + q10+ ', ' + q11+ ', ' + q12+ ', ' + q13+' , current_timestamp);', (error, results) => {
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

// get Sleep goal from db
function getSleepGoalById(req, res, id) {
    pool.query('SELECT sleepgoal FROM users WHERE firebase_id=' + id + ';', (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows);
        res.status(200).send(results.rows);
    });
}

// add sleep goal from db
function addSleepGoalById(req, res, id, goal) {
    pool.query("UPDATE users SET sleepgoal=" + goal + " WHERE firebase_id=" + id + ";", (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows);
        res.status(200).send(results.rows);
    });
}

// set boolean determing if user wants to use fitbit to grab sleep log
function addUseFitbit(req, res, id, fitbit) {
    pool.query("UPDATE users SET fitbit=" + fitbit + " WHERE firebase_id=" + id + ";", (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows);
        res.status(200).send(results.rows);
    });
}

// get boolean determining if user wants to use their Fitbit to store sleep
function getUseFitbit(req, res, id) {
    pool.query('SELECT fitbit FROM users WHERE firebase_id=' + id + ';', (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows);
        res.status(200).send(results.rows);
    });
}

// set boolean determing if to show popup about fitbit use
function setPopupFalse(req, res, id) {
    pool.query("UPDATE users SET popup=" + false + " WHERE firebase_id=" + id + ";", (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows);
        res.status(200).send(results.rows);
    });
}

// get boolean determining if to show popup about fitbit use
function getPopup(req, res, id) {
    pool.query('SELECT popup FROM users WHERE firebase_id=' + id + ';', (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows);
        res.status(200).send(results.rows);
    });
}

// set boolean determing if to show popup about fitbit already in use
function setPopupFalse2(req, res, id) {
    pool.query("UPDATE users SET popup2=" + false + " WHERE firebase_id=" + id + ";", (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows);
        res.status(200).send(results.rows);
    });
}

// get boolean determining if to show popup about fitbit already in use
function getPopup2(req, res, id) {
    pool.query('SELECT popup2 FROM users WHERE firebase_id=' + id + ';', (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows);
        res.status(200).send(results.rows);
    });
}

// set zip code of user
function addZipcode(req, res, id, zipcode) {
    pool.query("UPDATE users SET zipcode='" + zipcode + "' WHERE firebase_id=" + id + ";", (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows);
        res.status(200).send(results.rows);
    });
}

// get user's zip code
function getZipcode(req, res, id) {
    pool.query('SELECT zipcode FROM users WHERE firebase_id=' + id + ';', (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows);
        res.status(200).send(results.rows);
    });
}

// set boolean determining if user is asleep
function addAsleep(req, res, id, asleep) {
    pool.query("UPDATE users SET asleep=" + asleep +" WHERE firebase_id=" + id + ";", (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows);
        res.status(200).send(results.rows);
    });
}

// get boolean determining if user is asleep sleep
function getAsleep(req, res, id) {
    pool.query('SELECT asleep FROM users WHERE firebase_id=' + id + ';', (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows);
        res.status(200).send(results.rows);
    });
}

//Add personality scores
function putPersonalityById(req, res, id, open, cons, extra, agree, neuro) {
    const promise = promiseBuildergoogleIdtoInternal(id);
    promise
        .then(function(internalId) {
            pool.query('INSERT INTO personality(user_id, openness, conc, extraver, agree, neuro, date) VALUES('+internalId.rows[0].user_id+', ' + open +', ' + cons+', ' + extra+', ' + agree+', ' + neuro+', current_timestamp);' , (error, results) => {
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

//retrieve personality by id
function getPersonalityById(req, res, id) {
    const promise = promiseBuildergoogleIdtoInternal(id);
    promise
        .then(function(internalId) {
            console.log(internalId.rows[0].user_id);
            pool.query('SELECT * FROM personality WHERE user_id =' + internalId.rows[0].user_id + ';', (error, results) => {
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

//retrieve sleep entries by id
function getSleepEntryById(req, res, id) {
    const promise = promiseBuildergoogleIdtoInternal(id);
    promise
        .then(function(internalId) {
            console.log(internalId.rows[0].user_id);
            pool.query('SELECT * FROM sleepentry WHERE user_id =' + internalId.rows[0].user_id + ';', (error, results) => {
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
    getUser,
    getUsers,
    deleteUser,
    getChronotypeById,
    getStressEntriesById,
    getStressEntriesByDate,
    getBedtimeRoutineById,
    getCaffeineEntriesById,
    getExerciseEntriesById,
    addUser,
    addWakeById,
    addSleepEntryById,
    addFitbitSleepEntryById,
    addStressEntriesById,
    addBedtimeRoutineById,
    addCaffeineEntriesById,
    addExerciseEntriesById,
    addFitbitExerciseEntriesById,
    deleteStressEntriesById,
    deleteCaffeineEntriesById,
    deleteExerciseEntriesById,
    deleteBedtimeRoutinesById,
    editBedtimeRoutinesById,
    putChronotypeById,
    addSleepGoalById,
    getSleepGoalById,
    addUseFitbit,
    getUseFitbit,
    getPersonalityById,
    putPersonalityById,
    getAsleep,
    addAsleep,
    checkSavedState,
    getSleepEntryById,
    addZipcode,
    getZipcode,
    setPopupFalse,
    getPopup,
    setPopupFalse2,
    getPopup2,
    addWakeByTime,
    getLatestSleepById
}