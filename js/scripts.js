const currencyForm = document.getElementById("currency-form");
const resultElement = document.getElementById("result");
const loader = document.getElementById("loader");

currencyForm.addEventListener("submit", function (event) {
  event.preventDefault();
  loader.style.display = "block";
  const formData = new FormData(currencyForm);
  const selectedCurrency = formData.get("currency");
  const amount = parseFloat(formData.get("amount"));

  if (isNaN(amount) || amount <= 0) {
    resultElement.innerHTML =
      '<span class="error">Wprowadź prawidłową kwotę, większą od 0</span>';
    loader.style.display = "none";
    return;
  }

  fetch(
    `https://api.nbp.pl/api/exchangerates/rates/a/${selectedCurrency}/?format=json`
  )
    .then((response) => response.json())
    .then((data) => {
      const rate = data.rates[0].mid;
      const convertedAmount = (amount * rate).toFixed(2);
      resultElement.innerText = `${amount} ${selectedCurrency} = ${convertedAmount} PLN`;
      loader.style.display = "none";
    })
    .catch((error) => {
      resultElement.innerText =
        "Wystąpił błąd podczas pobierania kursu waluty.";
      loader.style.display = "none";
    });
});
