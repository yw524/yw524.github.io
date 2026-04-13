(function () {
  "use strict";

  // Assignment-provided conversion constants and tax rate.
  var EUR_PER_USD = 0.95;
  var INR_PER_USD = 85;
  var TAX_RATE = 0.11;

  var form = document.getElementById("tip-form");
  var billInput = document.getElementById("bill-total");
  var taxExempt = document.getElementById("tax-exempt");
  var totalWithTaxInput = document.getElementById("total-with-tax");
  var currencySelect = document.getElementById("currency");
  var tipSlider = document.getElementById("tip-slider");
  var tipPercentOut = document.getElementById("tip-percent-display");
  var convertedTipInput = document.getElementById("converted-tip");
  var convertedTotalInput = document.getElementById("converted-total");
  var billError = document.getElementById("bill-error");

  // Parse and validate bill input from the text field.
  function parseBill(raw) {
    var s = String(raw).trim();
    if (s === "") return { ok: true, value: 0 };
    var n = Number(s);
    if (!Number.isFinite(n)) return { ok: false, message: "Enter a valid number for the bill total." };
    if (n < 0) return { ok: false, message: "Bill total cannot be negative." };
    return { ok: true, value: n };
  }

  // Convert from USD to the selected display currency.
  function rateFor(code) {
    if (code === "USD") return 1;
    if (code === "EUR") return EUR_PER_USD;
    if (code === "INR") return INR_PER_USD;
    return 1;
  }

  function symbolFor(code) {
    if (code === "USD") return "$";
    if (code === "EUR") return "\u20AC";
    if (code === "INR") return "\u20B9";
    return "$";
  }

  // Paint slider track so the left side reflects the chosen percent.
  function updateRangeTrackFill() {
    var pct = Number(tipSlider.value);
    var max = Number(tipSlider.max) || 100;
    var p = max > 0 ? (pct / max) * 100 : 0;
    tipSlider.style.setProperty("--tip-pct", p + "%");
  }

  function formatConverted(amount, code) {
    return symbolFor(code) + amount.toFixed(2);
  }

  // Reset all computed fields to zero state.
  function resetOutputs() {
    var code = currencySelect.value;
    totalWithTaxInput.value = (0).toFixed(2);
    tipPercentOut.value = String(Number(tipSlider.value));
    convertedTipInput.value = formatConverted(0, code);
    convertedTotalInput.value = formatConverted(0, code);
  }

  // Recalculate outputs on every form input/change event.
  function compute() {
    updateRangeTrackFill();

    var parsed = parseBill(billInput.value);
    if (!parsed.ok) {
      billError.hidden = false;
      billError.textContent = parsed.message;
      resetOutputs();
      return;
    }
    billError.hidden = true;

    var bill = parsed.value;
    var exempt = taxExempt.checked;
    var tipPct = Number(tipSlider.value);
    tipPercentOut.value = String(tipPct);

    if (bill === 0) {
      resetOutputs();
      return;
    }

    // Tax is excluded only when the tax-exempt checkbox is checked.
    var totalWithTaxUsdDisplay;
    if (exempt) {
      totalWithTaxUsdDisplay = bill;
    } else {
      totalWithTaxUsdDisplay = bill * (1 + TAX_RATE);
    }

    // Class example expects tip based on the taxed subtotal.
    var tipUsd = totalWithTaxUsdDisplay * (tipPct / 100);
    var totalUsdWithTipAndTax = totalWithTaxUsdDisplay + tipUsd;

    totalWithTaxInput.value = totalWithTaxUsdDisplay.toFixed(2);

    var code = currencySelect.value;
    var r = rateFor(code);

    convertedTipInput.value = formatConverted(tipUsd * r, code);
    convertedTotalInput.value = formatConverted(totalUsdWithTipAndTax * r, code);
  }

  form.addEventListener("input", compute);
  form.addEventListener("change", compute);

  updateRangeTrackFill();
  compute();
})();
