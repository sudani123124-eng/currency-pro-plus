// 💱 Currency Pro - Basic Working Version

const API = "https://api.exchangerate.host/latest";

let rates = {};

// 📡 تحميل أسعار العملات
async function loadRates() {
  const res = await fetch(API);
  const data = await res.json();
  rates = data.rates;

  fillCurrencies();
}

// 🔽 تعبئة القوائم
function fillCurrencies() {
  const from = document.getElementById("fromCurrency");
  const to = document.getElementById("toCurrency");

  Object.keys(rates).forEach(currency => {
    from.innerHTML += `<option value="${currency}">${currency}</option>`;
    to.innerHTML += `<option value="${currency}">${currency}</option>`;
  });

  from.value = "USD";
  to.value = "EUR";
}

// 🔄 تحويل العملات
function convert() {
  const amount = document.getElementById("amount").value;
  const from = document.getElementById("fromCurrency").value;
  const to = document.getElementById("toCurrency").value;

  const result = (amount / rates[from]) * rates[to];

  document.getElementById("result").innerText =
    `النتيجة: ${result.toFixed(2)} ${to}`;
}

// 🔘 تشغيل الزر
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("convertBtn").addEventListener("click", convert);
  loadRates();
});
