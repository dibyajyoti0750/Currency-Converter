const btn = document.querySelector("#convert-btn");
let result = document.querySelector("#result");
const currSymbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  CAD: "$",
  AUD: "$",
  CHF: "Fr",
  MXN: "$",
  AED: "د.إ",
  JPY: "¥",
  CNY: "¥",
  SGD: "$",
  HKD: "$",
  NZD: "$",
  BRL: "R$",
  ZAR: "R",
  RUB: "₽",
  KRW: "₩",
  SAR: "ر.س",
  TRY: "₺",
  PKR: "₨",
  BDT: "৳",
};

btn.addEventListener("click", async () => {
  let amount = document.querySelector("#amount").value;
  let fromCurr = document.querySelector("#from-currency").value;
  let toCurr = document.querySelector("#to-currency").value;

  if (!amount || isNaN(amount) || amount <= 0) {
    result.innerText = "Enter a valid amount";
    return;
  }

  btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i>`;
  try {
    let data = await getRes(fromCurr);
    if (data && data[toCurr]) {
      result.innerText = `${currSymbols[toCurr]}${(
        amount * data[toCurr]
      ).toFixed(2)}`;
    } else {
      result.innerText = "Invalid currency selection";
    }
  } catch (error) {
    console.log(error);
    alert("Failed to fetch data. Please try again.");
  } finally {
    btn.innerHTML = "Convert";
  }
});

async function getRes(curr) {
  let url = `https://v6.exchangerate-api.com/v6/2f88d202d448cb949629fed1/latest/${curr}`;
  try {
    let res = await axios.get(url);
    return res.data.conversion_rates;
  } catch (error) {
    console.log(error);
    result.innerText = "Error fetching exchange rates";
    return {};
  }
}
