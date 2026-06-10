// Get expense from local storage
const expenses = JSON.parse(localStorage.getItem("expense")) || [];

// Table body
const expenseList = document.getElementById("expense-list");

// Summary elements
const totalExpenses = document.getElementById("total-expenses");
const totalRecords = document.getElementById("total-records");

//Display expenses
function displayExpenses() {
  expenseList.innerHTML = "";

  let total = 0;
  expenses.forEach((expense) => {
    total += expense.amount;

    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${expense.date}</td>
            <td>${expense.description}</td>
            <td>${expense.category}</td>
            <td>${expense.amount.toFixed(2)}</td>

            <td>
                <button class="delete-btn" onclick="deleteExpenses(${expense.id})">
                    Delete
                </button>
            </td> `;
    expenseList.appendChild(row);
  });

  totalExpenses.textContent = `€${total.toFixed(2)}`;
  totalRecords.textContent = expenses.length;
}

// Delete expense
function deleteExpense(id) {
  const updateExpenses = expenses.filter((expense) => expense.id !== id);

  localStorage.setItem("expenses", JSON.stringify(updateExpenses));

  location.reload();
}

// Initial data
displayExpenses();
