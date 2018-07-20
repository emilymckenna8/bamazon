var mysql = require("mysql");
var inquirer = require("inquirer");

//creating the connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user:"root",
    password: "Drumline1!",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connection successful");
    displayInventory();
});

//function to display total inventory
function displayInventory(){
connection.query("SELECT * FROM products", function(err, results){
    if (err) throw err;
    var itemList = "";
    console.log("Available Items: \n");
    for (i = 0; i< results.length; i++) {
        var itemList = " ";
        itemList += "ID: " + results[i].item_id;
        itemList += " Item Name: " + results[i].product_name;
        itemList += " Price: " + results[i].price + "\n";
        console.log(itemList) 
    }
   start(); 
});    
}
//start prompts to customer
function start() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "Please type the ID of the item you would like to purchase"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to purchase"
            }
        ])                  
        .then(function(answer) {
            var userID = answer.id;
         // get the info for the chosen item 
         connection.query("SELECT * FROM products WHERE ?",{item_id:userID}, function(err, results) {
           if ( answer.quantity<= results[0].stock_quantity) {
               //update the database when purchase was successful
               connection.query(
                   "UPDATE products SET ? WHERE ?",
                   [
                       {
                           stock_quantity: (results[0].stock_quantity - answer.quantity)
                       },
                       {
                           item_id: userID
                       }
                   ],
                   function(error) {
                       if (error) throw err;
                       console.log("Purchase was successful!");
                       console.log("Your total is $" + (results[0].price * answer.quantity));
                       start();
                   }
                );
            }           
           else {
               console.log("The item amount you selected is more than we have in stock");
               start();
           }
           
        });
    
    });
}