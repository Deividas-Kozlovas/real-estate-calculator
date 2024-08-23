function calculateInvestment() {
    // Get form values
    const form = document.forms['investmentForm'];
    const housePrice = parseFloat(form['housePrice'].value);
    const downPaymentPercent = parseFloat(form['downPayment'].value);
    const rent = parseFloat(form['rent'].value);
    const taxPercent = parseFloat(form['tax'].value);
    const mortgageInterestPercent = parseFloat(form['mortgage'].value);
    const mortgagePeriod = parseInt(form['period'].value);

    // Calculations
    const downPayment = housePrice * (downPaymentPercent / 100);
    const loanAmount = housePrice - downPayment;
    const annualRent = rent * 12;
    const annualTax = annualRent * (taxPercent / 100);
    const afterTaxAnnualRentalIncome = annualRent - annualTax;

    // Mortgage payment calculation
    const monthlyInterestRate = (mortgageInterestPercent / 100) / 12;
    const numberOfPayments = mortgagePeriod * 12;
    const monthlyMortgagePayment = loanAmount * (monthlyInterestRate * Math.pow((1 + monthlyInterestRate), numberOfPayments)) / (Math.pow((1 + monthlyInterestRate), numberOfPayments) - 1);
    const annualMortgagePayments = monthlyMortgagePayment * 12;

    // Total mortgage payments over the period
    const totalMortgagePayments = monthlyMortgagePayment * numberOfPayments;
    const totalOverpayment = totalMortgagePayments - loanAmount;

    // Annual net income after mortgage payments
    const annualNetIncomeAfterMortgage = afterTaxAnnualRentalIncome - annualMortgagePayments;

    // ROI calculation based on house price
    const roiHouse = (afterTaxAnnualRentalIncome / housePrice) * 100;

    // ROI calculation based on down payment amount
    const roiDownPayment = (annualNetIncomeAfterMortgage / downPayment) * 100;

    // Net profit calculation
    const netProfit = afterTaxAnnualRentalIncome;

    // Recommended house price for 8% ROI
    const recommendedHousePriceFor8ROI = (afterTaxAnnualRentalIncome / 8) * 100;

    // Display the results for initial investment
    const resultDiv = document.getElementById('result');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <h3>Investment Results:</h3>
            <p>House Price: $${housePrice.toFixed(2)}</p>
            <p>Annual Rent: $${annualRent.toFixed(2)}</p>
            <p>Annual Rent Tax: $${annualTax.toFixed(2)}</p>
            <p>Net Profit: $${netProfit.toFixed(2)}</p>
            <p>Return on Investment (ROI): ${roiHouse.toFixed(2)}%</p>
        `;
    }

    // Display the down payment calculations
    const downPaymentResultsDiv = document.getElementById('downPaymentResults');
    if (downPaymentResultsDiv) {
        downPaymentResultsDiv.innerHTML = `
            <h3>Down Payment Calculation:</h3>
            <p>House Price: $${housePrice.toFixed(2)}</p>
            <p>Down Payment Percentage: ${downPaymentPercent.toFixed(2)}%</p>
            <p>Down Payment Amount: $${downPayment.toFixed(2)}</p>
            <p>Annual Rent: $${annualRent.toFixed(2)}</p>
            <p>Annual Rent Tax: $${annualTax.toFixed(2)}</p>
            <p>Annual Mortgage Payments: $${annualMortgagePayments.toFixed(2)}</p>
            <p>Net Profit: $${annualNetIncomeAfterMortgage.toFixed(2)}</p>
            <p>Down Payment ROI: ${roiDownPayment.toFixed(2)}%</p>
            <p>Total Overpayment over ${mortgagePeriod} years: $${totalOverpayment.toFixed(2)}</p>
        `;
    }

    // Recommendation based on ROI
    const recommendedDiv = document.getElementById('recommended');
    if (recommendedDiv) {
        recommendedDiv.innerHTML = `
            <h3>Recommendation:</h3>
            <p>To achieve an ROI of 8%, the house price should be approximately $${recommendedHousePriceFor8ROI.toFixed(2)}.</p>
        `;
    }
}
