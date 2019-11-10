const db = require("../../../config/database");
const router = require("express").Router();

router.get("/api/todo/undo/:id", async (req, res) => {
    let todos = await db.promiseQuery("SELECT * FROM `todos` WHERE `id` = ?", [req.params.id]);
    if( todos.length ){
        let todo = todos[0];
        if(todo.user_id === req.session.user_id){
            // Mark it as complete because it belongs to the user
            await db.promiseQuery("UPDATE `todos` SET `complete` = 0 WHERE `id` = ?", [req.params.id]);
            return res.json({success: true});
        }

    }

    res.json({success: false});
});

module.exports = router;