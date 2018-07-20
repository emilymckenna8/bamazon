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
    displayInventory();
});

//function to display total inventory
function displayInventory(){
connection.query("SELECT * FROM products", function(err, results){
    if (err) throw err;
    var itemList = "";
    for (i = 0; i<results.length; i++) {
        var itemList = "ID: " + results[i].item_id + "Item Name: " + results[i].product_name+
        "Price: " + results[i].price + "\n";
    }
    return itemList
})

    start();
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
            var chosenItem = "";
         // get the info for the chosen item 
           for (i=0; i< results.length; i++){
               if (results[i].item_id === answer.id) {
                   chosenItem = results[i];
               }
           }
           //if there is enough, update the table the quanitity
           if (chosenItem.stock_quantity >= parseInt(answer.quantity)) {
               connection.query(
                   "UPDATE products SET ? WHERE ?",
                   [
                       {
                           stock_quantity: stock_quantity - parseInt(answer.quantity)
                       },
                       {
                           item_id: chosenItem.item_id
                       }
                   ],
                   function(error) {
                       if (error) throw err;
                       console.log("Purchase was successful");
                       start();
                   }
               );
           }
           else {
               console.log("The item amount you selected is more than we have in stock");
           }
           start();
        });
}