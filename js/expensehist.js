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
                <button class="edit-btn" onclick="openEditModal(${expense.id})">
                    Edit
                </button>

                <button class="delete-btn" onclick="deleteExpense(${expense.id})">
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

    const matchesDate = selectedDate === "" || expense.date === selectedDate;

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
  const updatedExpenses = expenses.filter((expense) => expense.id !== id);
  localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

  location.reload();
}

//Edit Modal
function openEditModal(id) {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  const expense = expenses.find((expense) => expense.id === id);

  if (!expense) return;

  document.getElementById("edit-id").value = expense.id;

  document.getElementById("edit-amount").value = expense.amount;

  document.getElementById("edit-description").value = expense.description;

  document.getElementById("edit-category").value = expense.category;

  document.getElementById("edit-date").value = expense.date;

  document.getElementById("edit-modal").style.display = "flex";
}

document.getElementById("close-modal-btn").addEventListener("click", () => {
  document.getElementById("edit-modal").style.display = "none";
});

// save changes

document.getElementById("save-edit-btn").addEventListener("click", () => {
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  const id = Number(document.getElementById("edit-id").value);

  const expense = expenses.find((expense) => expense.id === id);

  if (!expense) return;

  expense.amount = Number(document.getElementById("edit-amount").value);

  expense.description = document.getElementById("edit-description").value;

  expense.category = document.getElementById("edit-category").value;

  expense.date = document.getElementById("edit-date").value;

  localStorage.setItem("expenses", JSON.stringify(expenses));

  location.reload();
});

// Initial data
displayExpenses(expenses);
