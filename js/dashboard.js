function checkBudget() {
  const budget = document.getElementById("budgetInput").value;
  const spent = "";
  const warning = document.getElementById("budgetWarningMessage");

  if (budget === "") {
    alert("Please enter a budget amount!");
    return;
  }

  if (spent > budget) {
    warning.textContent =
      "🚨 You are overspending! Spent $" + spent + " of $" + budget;
    warning.style.color = "red";
  } else if (spent > budget * 0.7) {
    warning.textContent = "⚠️ Warning! Spent $" + spent + " of $" + budget;
    warning.style.color = "orange";
  } else {
    warning.textContent = "✅ On track! Spent $" + spent + " of $" + budget;
    warning.style.color = "green";
  }
}

document.getElementById("setBudgetBtn").onclick = checkBudget;
