const calculateMortgage = (data) => {
	const principal = parseFloat(data.mortgageAmount);
	const years = parseFloat(data.mortgageTerm);
	const rate = parseFloat(data.interestRate) / 100; // percent to decimal
	const calculationType = data.calculationType;

	if (isNaN(principal) || isNaN(years) || isNaN(rate)) {
		return { result: null, resultTerm: null };
	}

	let calculationResult = 0;

	if (calculationType === "optionRepayment") {
		calculationResult = (principal * rate / 12) / (1 - Math.pow(1 + rate / 12, years * -12));
		console.log("Repayment Calculation:", data);
	} else if (calculationType === "optionInterest") {
		calculationResult = principal * (rate / 12);
		console.log("Interest Only Calculation:", data);
	}

	const resultTotal = calculationResult * years * 12;
	return { result: calculationResult.toFixed(2), resultTerm: resultTotal.toFixed(2) };
};

export default calculateMortgage;

