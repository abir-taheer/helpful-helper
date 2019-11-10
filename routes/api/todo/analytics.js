const db = require("../../../config/database");
const router = require("express").Router();
const regression = require("regression");

router.get("/api/todo/analytics", async (req, res) => {
   if(req.session.signed_in){
       let all_todos = await db.promiseQuery("SELECT * FROM `todos` WHERE `user_id` = ? AND `complete` = 1", [req.session.user_id]);
       let points = [];
       let max_date = new Date(0);
       for(let x = 0 ; x < all_todos.length ; x++){
           let completion_date = new Date(all_todos[x].time_completed);
           if(completion_date.getTime() > max_date) max_date = completion_date;
           let date = completion_date.getDate();
           let time = completion_date.getHours();
           points.push([date, time]);
       }

       const result = regression.linear(points);

       let predictions = [];
       for(let x = max_date.getDate(); x < max_date.getDate(); x++){
            predictions.push([x, result.predict(x)]);
       }

       let data = {};
       data.success = true;
       data.original = points;
       data.accuracy = result.r2;
       data.predictions = predictions;
       res.json(predictions);

   } else {
       res.json({success: false});
   }

});

module.exports = router;