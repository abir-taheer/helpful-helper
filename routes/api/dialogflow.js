const User = require("../../models/user");
const router = require("express").Router();

function getText(schedule){
    for(let x = 0; x < schedule.items.length ; x++){
        let current_data = schedule.items[x];
        let start_time = new Date(current_data.start_time);
        let end_time = new Date(current_data.end_time);

        let now = new Date();

        if(end_time > now){
            if(start_time < now && now < end_time ){
                let seconds_remaining = Math.floor((end_time.getTime() - now.getTime()) / 1000);
                let h = Math.floor(seconds_remaining / 3600);
                let m = Math.floor((seconds_remaining % 3600) / 60);
                let s = seconds_remaining % 60;
                return `The current event, ${current_data.name} will end in ${h} hours  and ${m} minutes`;
            }

            if(start_time > now){
                let seconds_remaining = Math.floor(( start_time.getTime() - now.getTime()) / 1000);
                let h = Math.floor(seconds_remaining / 3600);
                let m = Math.floor((seconds_remaining % 3600) / 60);
                let s = seconds_remaining % 60;
                return `The next event ${current_data.name} will start in ${h} hours and ${m} minutes`;
            }
        }
    }
}

router.post("/api/dialogflow", async (req, res) => {
    let todos = await User.getDefaultTodos("l2qovo5d");
    todos = todos.filter(i => !Boolean(i.complete));
    let schedule = await User.getTodaySchedule("l2qovo5d");
    let text = getText(schedule);
    let response = {
        "fulfillmentText": `You have ${todos.length} tasks to complete. The first of which is ${todos[0].content}. Today you have a special schedule titled ${schedule.name}. ${text}. Have a great day!`
    };

    res.send(JSON.stringify(response));
});

module.exports =router;