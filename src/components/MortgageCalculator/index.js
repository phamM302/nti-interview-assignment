"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import "./style.scss";

const MortgageCalculator = ({ ...props }) => {
	const formRef = useRef(null);
	//added the variables needed to calculate
	const [calculationType, setCalculationType] = useState('');
	const [result, setResult] = useState(null);
	const [resultTerm, setResultTerm] = useState(null);

	//memoized result
	const calculatedResult = useMemo(() => {
		//check for data
		if(!formRef.current) return {result: null, resultTerm: null};
		const formData = new FormData(formRef.current);
		const data = Object.fromEntries(formData.entries());
		const principal = parseFloat(data.mortgageAmount);
		const years = parseFloat(data.mortgageTerm);
		const rate = parseFloat(data.interestRate) / 100; //percent to decimal
		const calculationType = data.calculationType;

		let calculationResult = 0;
		//does not update on wrong inputs
		if (isNaN(principal) || isNaN(years) || isNaN(rate)) return { result: null, resultTerm: null };
		//calculates based on option selected
		if (calculationType === 'optionRepayment') {
			calculationResult = (principal * rate / 12) / (1 - Math.pow(1 + rate/12, years * -12));
            console.log('Repayment Calculation:', data);
		} else if (calculationType === 'optionInterest') {
				calculationResult = principal * (rate/12);
				console.log('Interest Only Calculation:', data);
		}
		const resultTotal = calculationResult * years
		return { result: calculationResult.toFixed(2), resultTerm: resultTotal.toFixed(2)};
	}, [calculationType]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setResult(calculatedResult.result);
		setResultTerm(calculatedResult.resultTerm);
	};
	return (
		<div>
			<form
				className="mortgage-calculator d-flex flex-column flex-md-row bg-white rounded-4 w-100"
				ref={formRef}
				onSubmit={handleSubmit}
			>
				{/* TAKE IT AWAY! */}
				<h1> Mortgage Calculator</h1>
				<div className="section">
					<label>
						<h2>Mortgage Amount</h2>
						<input 
							type = "number"	
							name = "mortgageAmount"
						/>
					</label>
				</div>
				<div className="section">
					<label>
						<h2>Mortgage Term</h2> 
						<input 
							type = "number"	
							name = "mortgageTerm"
						/>
					</label>
					<label>
						<h2>Interest Rate</h2> 
						<input 
							type = "number"	
							name = "interestRate"
						/>
					</label>
				</div>
				<div className="mortgageType">
					<h2>Mortgage Type</h2>
					<label>
						<input 
							type= "radio"
							name="calculationType" 
							value="optionRepayment" 
							checked={calculationType === 'optionRepayment'}
							onChange={() => setCalculationType('optionRepayment')} 
						/>
						Repayment
					</label>
					<label>
						<input 
							type="radio"
							name="calculationType" 
							value="optionInterest"
							checked={calculationType === 'optionInterest'}
							onChange={() => setCalculationType('optionInterest')} 
						/>
						Interest Only
					</label>
				</div>
				<div className="submit">
					<button 
						type="submit">
						Calculate Repayments
					</button>
				</div>

			</form>
			<div className ="results">
				<p>
					Your results are shown below based on the information you provided.
					To adjust the results, edit the form and click "calculate repayments"
					again.
				</p>
				{result && (
					<div className="result">
						<h2>Your monthly repayments</h2>
						<p>${result}</p>
						<h2>Total you'll repay over the term</h2>
						<p>${resultTerm}</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default MortgageCalculator;
