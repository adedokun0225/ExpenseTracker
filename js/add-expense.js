// Get form
const form = document.getElementById("expense-form")

// When form submitted do not refresh
form.addEventListener("submit", function(e) {
    e.preventDefault();
    

    // Get values
   
    const amount = document.getElementById("amount").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;

    //  create
    const expense = {
        id: Date.now(),
        amount: Number(amount),
        description,
        category,
        date
    };

    // Get existing expense from local storage
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    // Add new expense
    expenses.push(expense);

    // Save back to local storage
    localStorage.setItem("expenses", JSON.stringify(expenses));

    // Reset form
    form.reset();

    alert("Expenses added successfully");
});
