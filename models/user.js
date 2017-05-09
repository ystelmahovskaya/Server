var connection = require('../connection');

function Users() {
  this.get = function(res) {
    connection.acquire(function(err, con) {

      con.query('SELECT * FROM users' , function(err, result) {
          con.release();
          res.send(result);
      });
    });
  };


    this.searchUser = function(id,str,res) {
        connection.acquire(function(err, con) {

            con.query("SELECT UserID, avatarURL, userName FROM users WHERE userName LIKE '%"+str+"%' and userID  !="+id+" and UserID not in(select userFollowing from subscribers where userFollower = "+id+"); ",  function(err, result) {
                console.log(result);
                con.release();
                res.send(result);
            });
        });
    };

    this.verificate = function(email,passwd,res) {
        connection.acquire(function(err, con) {
            con.query("SELECT UserID, avatarURL, userName FROM users WHERE userEmail='"+email+ "'and userPassword='"+passwd+"';", function(err, result) {
                console.log(result);
                con.release();
                res.send(result);
            });
        });
    };



    this.info = function(str,res) {
        connection.acquire(function(err, con) {
            console.log(str);
            con.query("SELECT COUNT(*)as cnt,(Select Count(*)  from subscribers where subscribers.userFollowing=userPosting )as sub FROM posts WHERE userPosting = ?", str, function(err, result) {
                console.log(result);
                con.release();
                res.send(result);
            });
        });
    };

  this.create = function(user, res) {
    connection.acquire(function(err, con) {
      con.query('INSERT INTO users SET ?', user, function(err, result) {
        con.release();
        if (err) {
          console.log(err);
          res.send({status: 1, message: 'user creation failed'});
        } else {
          console.log('user created successfully');
          res.send({status: 0, message: 'user created successfully'});
        }
      });
    });
  };
}

module.exports = new Users();