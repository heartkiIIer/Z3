
// dayofweek value 0-6 where 0 = Sunday, 1 = Monday, and so on
let code0 = {
    dayofweek: 1,
    subject: "Try to Reach Your Sleep Goal",
    message: "Your sleep goal is listed in Settings (If you have not set a sleep goal, you can set it in Settings). Try to reach that this week to improve your sleep health! "
};
let code1_1 = {
    dayofweek: 1,
    subject: "Manage Your Stress",
    message: "When you feel stressed try taking a walk to give your mind a break and get light exercise. "
};
let code1_2 = {
    dayofweek: 4,
    subject: "Manage Your Stress",
    message: "Avoiding alcohol, nicotine, and caffeine can help reduce stress. Alcohol is generally a depressant but can act as a stimulant in smaller quantities, which is not helpful for your sleep health. "
};
let code1_3 = {
    dayofweek: 1,
    subject: "Manage Your Stress",
    message: "Yoga is a great way to relax and decrease your stress levels. "
};
let code1_4 = {
    dayofweek: 4,
    subject: "Manage Your Stress",
    message: "Exercise for 30 minutes at least 3 to 5 times per week has been proven to reduce stress and allow for better sleep. "
};
let code1_5 = {
    dayofweek: 1,
    subject: "Manage Your Stress",
    message: "Stress can be caused by being overwhelmed. To help with this, keep a running to-do list that you can prioritize. "
};
let code1_6 = {
    dayofweek: 4,
    subject: "Manage Your Stress",
    message: "Mindfulness is a skill that can reduce stress. Try taking soothing, deep breaths whenever you are tense. "
};
let code1_7 = {
    dayofweek: 1,
    subject: "Manage Your Stress",
    message: "Eating a healthy, well-balanced diet can reduce stress. Try to fill your plate evenly with fruits, vegetables, protein and whole grains!"
};
let code1_8 = {
    dayofweek: 4,
    subject: "Manage Your Stress",
    message: "When you need a break, try listening to your favorite music. "
};
let code1_9 = {
    dayofweek: 1,
    subject: "Manage Your Stress",
    message: "Taking time for self-care is important to lead a lower stress life. Make time for your hobbies each day!"
};
let code1_10 = {
    dayofweek: 4,
    subject: "Manage Your Stress",
    message: "One of the best ways to reduce stress is to talk about your problems and what is causing the stress with the people in your life. "
};
let code2_1 = {
    dayofweek: 1,
    subject: "Remember Your Sleep Goal",
    message: "Remember your sleep goal and try to reach that every night! Make sure you plan ahead! "
};
let code2_2 = {
    dayofweek: 2,
    subject: "Keep In Mind Sleep and Academics",
    message: "All-nighters and caffeine consumption can throw off your sleep schedule and are correlated with lower GPAs. "
};
let code3_1 = {
    dayofweek: 0,
    subject: "Get Enough Sleep",
    message: "The National Sleep Foundation recommends 8-10 hours per night of sleep."
};
let code4_1 = {
    dayofweek: 3,
    subject: "Compare Your Sleep",
    message: "Your average sleep per night can be viewed in the Reports. Compare that to the recommended average which is at least 8 hours per night."
};
let code5_1 = {
    dayofweek: 3,
    subject: "Protect Your Sleep Quality",
    message: "Using electronics in the hour before bed as well as daytime caffeine consumption after 5pm can negatively affect your sleep quality."
};
let code6_1 = {
    dayofweek: 1,
    subject: "Set a Bedtime",
    message: "It is important to go to bed at a reasonable time each night! Do not forget your sleep goal!"
};
let code6_2 = {
    dayofweek: 4,
    subject: "Set a Bedtime",
    message: "Try to reach that sleep goal tonight by setting a reasonable bed time for yourself based on when you have to wake up the next morning."
};
let code6_3 = {
    dayofweek: 5,
    subject: "Maintain That Sleep",
    message: "Having a different weekend sleep schedule can be detrimental to your sleep health. This weekend, try to wake up and go to bed at approximately the same time as you would during the week. "
};
let code7_1 = {
    dayofweek: 2,
    subject: "Watch Your Sleep Schedule",
    message: "You are a night owl, so make sure to watch your sleep schedule and go to bed at a reasonable time for the rest of this week. "
};


let messageTable = {
    code0: [code0],
    code1: [code1_1, code1_2, code1_3, code1_4, code1_5, code1_6, code1_7, code1_8, code1_9, code1_10],
    code2: [code2_1, code2_2],
    code3: [code3_1],
    code4: [code4_1],
    code5: [code5_1],
    code6: [code6_1, code6_2, code6_3],
    code7: [code7_1]
};

/**
 *
 * Retrieves a list of codes for that matches the given chronotype and personality type
 *
 * @param chrono chronotype resutls value
 * @param o personality openenss value
 * @param c personality consciousness value
 * @param e personality extraversion value
 * @param a personality agreeableness value
 * @param n persnality neuroticism value
 */
function getMessage(chrono, o, c, e, a, n) {
    let date = new Date();
    let day = date.getDay();

    // Get all messages that fits given personality and chronotype values
    let messageList = [];
    if (n < 10 || a > 1 || o === 5 || c === 5 || e === 5)
        messageList = addToArray(messageList, messageTable.code0);
    if(n === 10)
        messageList = addToArray(messageList, messageTable.code1);
    if(c === 10)
        messageList = addToArray(messageList, messageTable.code2);
    if(o === 1)
        messageList = addToArray(messageList, messageTable.code3);
    if(a === 1)
        messageList = addToArray(messageList, messageTable.code4);
    if(e === 1 || chrono > 44)
        messageList = addToArray(messageList, messageTable.code5);
    if(c === 1 || o === 10)
        messageList = addToArray(messageList, messageTable.code6);
    if(chrono < 22)
        messageList = addToArray(messageList, messageTable.code7);

    // filter out messages based on current day of the week
    let filteredList = messageList.filter(code => code.dayofweek === day);

    // if day doesn't match up with any of the messages in the list
    // filter for previous day's messages
    let xDay = 1;
    while(filteredList.length === 0){
        let preDay = day-xDay;
        if(preDay < 0)
            preDay = 7+preDay;
        filteredList = messageList.filter(code => code.dayofweek === preDay);
        xDay++;
        if(preDay === day)
            break;
    }

    // randomly select a message to return
    return filteredList[Math.floor(Math.random()*filteredList.length)];
}

function addToArray(arr1, arr2){
    if(arr1.length === 0)
        return arr2;
    else
        return arr1.concat(arr2);
}

module.exports = {getMessage};