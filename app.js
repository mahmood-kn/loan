const form = document.querySelector("#loan-form");
const loading = document.querySelector("#loading");
const result = document.querySelector("#result");

loading.style.display = "none";
result.style.display = "none";

form.addEventListener("submit", calculate);

function calculate(e) {
  // Variables
  const amount = document.querySelector("#amount");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");
  const monthlyPayment = document.querySelector("#monthly-payment");
  const totalPayment = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    result.style.display = "none";
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    loading.style.display = "block";
    setTimeout(() => {
      loading.style.display = "none";
      result.style.display = "block";
    }, 2000);
  } else {
    showError("Please check your numbers");
  }

  e.preventDefault();
}

function showError(error) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "alert alert-danger";

  // get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  errorDiv.appendChild(document.createTextNode(error));

  card.insertBefore(errorDiv, heading);

  setTimeout(() => {
    errorDiv.style.display = "none";
  }, 3000);
}
