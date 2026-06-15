//Read Expense from local storage
const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const totalSpending = expenses.reduce(
  (sum, expense) => sum + expense.amount,
  0,
);

const currency = localStorage.getItem("currency") || "€";

document.getElementById("total-spending").textContent =
  `${currency}${totalSpending.toFixed(2)}`;

document.getElementById("total-transactions").textContent = expenses.length;

// Calculate Spending by Category

const categoryTotals = {};

expenses.forEach((expense) => {
  if (!categoryTotals[expense.category]) {
    categoryTotals[expense.category] = 0;
  }
  categoryTotals[expense.category] += expense.amount;
});

// Find Top category

let topCategory = "-";
let highestAmount = 0;

for (const category in categoryTotals) {
  if (categoryTotals[category] > highestAmount) {
    highestAmount = categoryTotals[category];

    topCategory = category;
  }
}

document.getElementById("top-category").textContent = topCategory;

// Create Pie Chart
new Chart(document.getElementById("pieChart"), {
  type: "pie",

  data: {
    labels: Object.keys(categoryTotals),

    datasets: [
      {
        data: Object.values(categoryTotals),
      },
    ],
  },
});

//Bar Chart

new Chart(document.getElementById("barChart"), {
  type: "bar",

  data: {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Spending by category",
        data: Object.values(categoryTotals),
      },
    ],
  },
});

//monthly Spending

const monthlyTotals = {};

expenses.forEach((expense) => {
  const month = expense.date.substring(0, 7);

  if (!monthlyTotals[month]) {
    monthlyTotals[month] = 0;
  }
  monthlyTotals[month] += expense.amount;
});

new Chart(document.getElementById("monthlyChart"), {
  type: "line",
  data: {
    labels: Object.keys(monthlyTotals),
    datasets: [
      {
        label: "Monthly Spending",
        data: Object.values(monthlyTotals),
        tension: 0.6,
      },
    ],
  },
});
