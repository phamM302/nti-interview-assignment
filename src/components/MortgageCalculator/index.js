"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import "./style.scss";

const MortgageCalculator = ({ ...props }) => {
	const formRef = useRef(null);
	//added the variables needed to calculate
	const [calculationType, setCalculationType] = useState('');
	const [result, setResult] = useState(null);
	const [resultTerm, setResultTerm] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		//calculates based on option selected
		const formData = new FormData(formRef.current);
		const data = Object.fromEntries(formData.entries());
		const principal = parseFloat(data.mortgageAmount);
		const years = parseFloat(data.mortgageTerm);
		const rate = parseFloat(data.interestRate) / 100; //percent to decimal
		const calculationType = data.calculationType;
		//answer to be displayed
		console.log("Parsed Values:", { principal, years, rate });
		let calculationResult = 0; 
		if (calculationType === 'optionRepayment') {
			calculationResult = (principal * rate / 12) / (1 - Math.pow(1 + rate/12, years * -12));
            console.log('Repayment Calculation:', data);
		} else if (calculationType === 'optionInterest') {
				calculationResult = principal * (rate/12);
				console.log('Interest Only Calculation:', data);
		}
		setResult(calculationResult.toFixed(2));
		let resultTotal = calculationResult * years
		setResultTerm(resultTotal.toFixed(2));
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
							type = "text"	
							name = "mortgageAmount"
							pattern="\d*"
						/>
					</label>
				</div>
				<div className="section">
					<label>
						<h2>Mortgage Term</h2> 
						<input 
							type = "text"	
							name = "mortgageTerm"
							pattern="\d*"
						/>
					</label>
					<label>
						<h2>Interest Rate</h2> 
						<input 
							type = "text"	
							name = "interestRate"
							pattern="\d*"
						/>
					</label>
				</div>
				<div className="section">
					<h2>Mortgage Type</h2>
					<label>
						<h3>Repayment</h3>
						<input 
							type= "radio"
							name="calculationType" 
							value="optionRepayment" 
							checked={calculationType === 'optionRepayment'}
							onChange={() => setCalculationType('optionRepayment')} 
						/>
					</label>
					<label>
						<h3>Interest Only</h3>
						<input 
							type="radio"
							name="calculationType" 
							value="optionInterest"
							checked={calculationType === 'optionInterest'}
							onChange={() => setCalculationType('optionInterest')} 
						/>
					</label>
				</div>
				<div className="submit">
					<button 
						type="submit">
						Calculate
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
