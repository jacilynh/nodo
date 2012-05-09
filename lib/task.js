/**
 * Task model
 */

var database = require('../lib/database');

var Task = function(){};

/**
 * Get all the tasks with their respective list names
 * @param {Function} callback
 * @api public
 */
Task.prototype.getToDo = function(callback){
    var query = 'SELECT lists.name as listName, tasks.name, tasks.id FROM tasks, lists ';
    query += 'WHERE tasks.done=0 AND tasks.deleted=0 AND tasks.list_id=lists.id ';
    query += 'ORDER BY lists.id';
    database.all(query, function(err, rows){
        if (err){
            return callback(err);
        }
        else{
            var result = {};
            result.rows = rows;
            return callback(null, result);
        }
    });
};

/**
 * Get all the done not deleted tasks with their list names
 * @param {Integer} limit the number of most recent done tasks
 * @param {Function} callback
 * @api public
 */
Task.prototype.getDone = function(limit, callback){
    var query = 'SELECT lists.name as listName, tasks.* FROM tasks, lists WHERE done=1 ';
    query += 'AND tasks.deleted=0 AND tasks.list_id=lists.id ORDER BY tasks.done_date DESC';
    if (limit){
        query += ' LIMIT ' + limit;
    }
    database.all(query, function(err, rows){
        if (err){
            return callback(err);
        }
        else{
            var result = {};
            result.rows = rows;
            return callback(null, result);
        }
    });
};

/**
 * Get all the deleted tasks
 * @param {Function} callback
 * @api public
 */
Task.prototype.getDeleted = function(limit, callback){
    var query = 'SELECT * FROM tasks WHERE deleted=1';
    if (limit){
        query += ' LIMIT ' + limit;
    }
    database.all(query, function(err, rows){
        if (err){
            return callback(err);
        }
        else{
            var result = {};
            result.rows = rows;
            return callback(null, result);
        }
    });
};

/**
 * Get a task and its list name with the given id
 * @param {Integer} taskId the id of the task to retrieve
 * @api public
 */
Task.prototype.get = function(taskId, callback){
    var query = 'SELECT lists.name as listName, tasks.* FROM tasks, lists ';
    query += 'WHERE tasks.id=? AND lists.id=tasks.list_id';
    database.get(query, taskId, function(err, row){
        if (err){
            return callback(err);
        }
        else{
            var result = {};
            result.row = row;
            return callback(null, result);
        }
    });
};

/**
 * Adds a new task
 * @param {Object} task the new task to be added
 * @param {Function} callback
 * @api public
 */
Task.prototype.add = function(task, callback){
    var that = this;
    database.get('SELECT id FROM lists WHERE name=?', task.list, function(err, result){
        if (err){
            return callback(err);
        }
        var query = 'INSERT INTO tasks (name, list_id, date) values(?, ?, ?)';
        that.db.run(query, [task.name, row.id, task.dueDate], function(err){
            if (err){
                return callback(err);
            }
            else{
                var result = {};
                result.lastId = this.lastID;
                return callback(null, result);
            }
        });
        return true; // understand why?
    });
};

/**
 * Marks a task with the given id as deleted 
 * @param {Integer} taskId the id of the task to mark as deleted
 * @param {Function} callback
 * @api public
 */
Task.prototype.remove = function(taskId, callback){
    var query = 'UPDATE tasks SET deleted=1 WHERE id=?';
    database.run(query, taskId, function(err){
        if (err){
            return callback(err);
        }
        else{
            var result = {};
            result.affected = this.changes;
            return callback(null, result);
        }
    });
};

/**
 * Mark a task with the given id as done
 * @param {Integer} taskId the id of the task to mark as done
 * @param {Function} callback
 * @api public
 */
Task.prototype.setDone = function(taskId, callback){
    // convert to unix timestamp
    var doneDate = Date.now()/1000;
    var query = 'UPDATE tasks SET done=1, date=? WHERE id=?';
    database.run(query, [doneDate, taskId], function(err){
        if (err){
            return callback(err);
        }
        else{
            var result = {};
            result.affected = this.changes;
            return callback(null, result);
        }
    });
};

module.exports = Task;