// Get expenses from local storage
const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Table body
const expenseList = document.getElementById("expense-list");

// Summary elements
const totalExpenses = document.getElementById("total-expenses");
const totalRecords = document.getElementById("total-records");

//filter and search
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("category-filter");
const dateFilter = document.getElementById("date-filter");

//Display expenses
function displayExpenses(expensesToDisplay) {
  expenseList.innerHTML = "";

  let total = 0;

  expensesToDisplay.forEach((expense) => {
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
  totalRecords.textContent = expensesToDisplay.length;
}
//Display filter search
function filterExpenses() {
  const searchValue = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;
  const selectedDate = dateFilter.value;

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.description
      .toLowerCase()
      .includes(searchValue);

    const matchesCategory =
      selectedCategory === "" || expense.category === selectedCategory;

    const matchesDate =
      selectedDate === "" || expense.category === selectedDate;

    return matchesSearch && matchesCategory && matchesDate;
  });

  displayExpenses(filteredExpenses);
}

// listen for changes

searchInput.addEventListener("input", filterExpenses);
categoryFilter.addEventListener("change", filterExpenses);
dateFilter.addEventListener("change", filterExpenses);

// Delete expense
function deleteExpense(id) {
  const updateExpenses = expenses.filter((expense) => expense.id !== id);

  location.reload();
}

// Initial data
displayExpenses(expenses);
