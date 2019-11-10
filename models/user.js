const db = require("./../config/database");
const bcrypt = require("bcrypt");
const tools = require("./../config/tools");

const getByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.promiseQuery("SELECT * FROM `users` WHERE `user_email` = ? ", [email])
        .then((rows, err) => {
          if(err){
            reject(err);
          } else {
            resolve((rows.length ? rows[0] : false));
          }
        });
  });
};

const getById = (id) => {
  return new Promise((resolve, reject) => {
    db.promiseQuery("SELECT * FROM `users` WHERE `user_id` = ? ", [id])
        .then((rows, err) => {
          if(err){
            reject(err);
          } else {
            resolve((rows.length ? rows[0] : false));
          }
        });
  });
};

const hashPassword = (password) => {
  return new Promise((resolve, reject)=> {
    bcrypt.hash(password, 12, function(err, hash) {
      if(err) reject(err);
      resolve(hash);
    });
  });
};

const User = {
  getByEmail: getByEmail,
  testPassword: (password, hash) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err, valid) => {
        (err) ? reject(err) : resolve(valid);
      });
    });
  },
  getById: getById,
  newUser: (user_name, user_email, user_password) => {
    return new Promise((resolve, reject) => {
      try {
        (async () => {
          let email_check = await getByEmail(user_email);

          // There is no user with this email address, proceed creating the account
          if( ! email_check ){
            let password_hash = await hashPassword(user_password);
            let user_id_exists = true;
            let user_id = tools.genString(8);

            // Ensures that the user id that we've generated is unique.
            // Unlikely it'll need to run more than once, but just a precautionary measure
            for( let attempts = 0 ; user_id_exists && attempts < 5; attempts++ ){
              user_id_exists = await getById(user_id);
              if( user_id_exists ){
                user_id = tools.genString(8);
              }
            }

            if(user_id_exists) {
              reject("There was an error generating a unique user id. Please try again.");
            } else {
              await db.promiseQuery("INSERT INTO `users` (`user_id`, `user_name`, `user_email`, `user_password`) VALUES(?,?,?,?)",
                  [user_id, user_name, user_email, password_hash]);
              resolve(user_id);
            }

          } else {
            reject("There already exists a user with that email address");
          }

        })();
      } catch (er) {
        reject("There was an unknown error");
      }
    });
  },
  getVerifiedPhoneNumbers: (user_id) => {
    return new Promise(async resolve => {
      let phone_numbers = await db.promiseQuery("SELECT * FROM `phone_numbers` WHERE `user_id` = ? AND `verified` = 1", [user_id]);
      resolve(phone_numbers.map(i => i.phone_number));
    });
  },
  getTodaySchedule: (user_id) => {
    return new Promise(async resolve => {
      let date = new Date();
      let day = date.getDay();
      let schedule_options = await db.promiseQuery("SELECT * FROM `schedules` WHERE `active_days` LIKE ? AND `user_id` = ?", [`%${day}%`, user_id]);

      let current_schedule = {};
      if(schedule_options.length){
        schedule_options = {
          id: schedule_options[0].schedule_id,
          name: schedule_options[0].name,
          items: []
        };

        current_schedule.items = await db.promiseQuery("SELECT `name`, `start_time`, `end_time`, `name`, `item_id` FROM `schedule_items` WHERE `schedule_id` = ?", [current_schedule.id]);

      }

      resolve(current_schedule);

    });
  },
  getByPhone: (phone) => {
    return new Promise(async resolve => {
      let results = await db.promiseQuery("SELECT * FROM `phone_numbers` WHERE `phone_number` = ?", [phone]);
      if(results.length) resolve(results[0].user_id);
      else resolve(false);
    });
  },
  addTodo: (user_id, content, due_date) => {
    return new Promise(resolve => {
      let date = `${due_date.getFullYear()}-${due_date.getMonth() + 1}-${due_date.getDate()}`;
      db.promiseQuery("INSERT INTO `todos`(`user_id`, `content`, `due`) VALUES (?, ?, ?)", [user_id, content, date]);
      resolve();
    });
  }
};

module.exports = User;