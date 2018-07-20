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
        var itemList = "ID: " + results[i].id + "Item Name: " + results[i].product_name+
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
         //check to see if there is enouch of the product in the inventory  
           for (i=0; i<)
           //if there is 
            connection.query(

            )
        })
}