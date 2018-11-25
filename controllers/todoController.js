var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://flouren:koham6cipeczek@ds157809.mlab.com:57809/todo31',{ useNewUrlParser: true });

//create a schema for data
var todoSchema = new mongoose.Schema({
    item:String
});

//todo model type. Variable Todo and model name Todo will be stored as a collection on mongodb
var Todo = mongoose.model('Todo', todoSchema);

//test not in use for now
// var item1 = Todo({item:'Get flowers'}).save(function(err){
//     if(err) throw err;
//     console.log('item saved!');
// });


//var data = [{item:'get milk'},{item:'walk dog'},{item:'code a litte'}];

var urlencodedParser = bodyParser.urlencoded({extended:false});
//controller which handle routes, rendering views, passing data to views
module.exports = function(app){
    app.get('/todo',function(req,res){
        //get data from mongodn and pass to view
        Todo.find({},function(err,data){
            if(err)throw err;
            res.render('todo',{todos:data});
        }) // empty means all, find this item in Todo collection
        
    });

    app.post('/todo',urlencodedParser,function(req,res){
        //get data from view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err,data){
            if(err)throw err;
            res.json(data);
        });


        //adding to array back to frontend ( comented when making db use)
        // data.push(req.body);
        // res.json(data);
    });

    app.delete('/todo/:item',function(req,res){
        //delete the requested item from mongodb
        Todo.find({item:req.params.item.replace(/\-/g, " ")}).deleteOne(function(err,data){
            if(err)throw err;
            res.json(data);
        });

        
        // data = data.filter(function(todo){
        //     return todo.item.replace(/ /g, '-') !== req.params.item;
        // });
        // res.json(data);
    });
};