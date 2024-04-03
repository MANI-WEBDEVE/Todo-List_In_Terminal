import inquirer from 'inquirer';

async function main() {
    let todo: string[] = [];
    let condition = true;

    while (condition) {
        let todoList = await inquirer.prompt([
            {
                name: "inam",
                type: "input",
                message: "What do you want to add to the Todo List?"
            },
            {
                name: "addmore",
                type: "confirm",
                message: "Do you want to add more items?",
                default: false
            }
        ]);

        todo.push(todoList.inam);
        condition = todoList.addmore;
    }

    let todoes = todo.map((item, index) => `${index + 1}. ${item}`).join("\n");

    let alltodo = await inquirer.prompt([
        {
            name: "all",
            type: "confirm",
            message: "Do you want to see your todos?"
        },
        {
            name: "allItem",
            type: 'list',
            choices: ["Your Todo", "Add Todo", "Delete Todo"],
            message: "Select an option"
        }
    ]);

    if (alltodo.allItem === "Your Todo") {
        console.log(todoes);
    }
    else if (alltodo.allItem === "Delete Todo") {
        let deleteItem = await inquirer.prompt([
            {
                name: "itemToDelete",
                type: "list",
                choices: todo,
                message: "Select an item to delete"
            }
        ]);
        let indexToDelete = todo.indexOf(deleteItem.itemToDelete);
        if (indexToDelete !== -1) {
            todo.splice(indexToDelete, 1);
            console.log(`This Todo:[ ${deleteItem.itemToDelete} ✔] deleted successfully!`);
        } else {
            console.log("Item not found in the todo list.");
        }
    } else if (alltodo.allItem === "Add Todo") {
        let newTodo = await inquirer.prompt([
            {
                name: "newItem",
                type: "input",
                message: "Enter the new item to add to the Todo List"
            }
        ]);
        todo.push(newTodo.newItem);
        console.log("New item added successfully!");
    }
}

main();
