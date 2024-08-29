"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import "./style.scss";

const MortgageCalculator = ({ ...props }) => {
	const formRef = useRef(null);
	//added the variables needed to calculate
	const [mortgageAmount, setMortgageAmount] = useState('');
    const [mortgageTerm, setMortgageTerm] = useState('');
    const [interestRate, setInterestRate] = useState('');
	const [calculationType, setCalculationType] = useState('');
	const [result, setResult] = useState(null);

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
	};
	return (
		<div>
			<form
				className="mortgage-calculator d-flex flex-column flex-md-row bg-white rounded-4 w-100"
				ref={formRef}
				onSubmit={handleSubmit}
			>
				{/* TAKE IT AWAY! */}
				<label> 
					Mortgage Amount:
					<input 
						type = "number"	
						name = "mortgageAmount"
					/>
				</label>

				<label>
					Mortgage Term (years): 
					<input 
						type = "number"	
						name = "mortgageTerm"
					/>
				</label>

				<label>
					Interest Rate (%): 
					<input 
						type = "number"	
						name = "interestRate"
					/>
				</label>
				<div className="radio">
					<label>
						Repayment
						<input 
							type= "radio"
							name="calculationType" 
							value="optionRepayment" 
							checked={calculationType === 'optionRepayment'}
							onChange={() => setCalculationType('optionRepayment')} 
						/>
					</label>
				</div>
				<div className="radio">
					<label>
						Interest Only
						<input 
							type="radio"
							name="calculationType" 
							value="optionInterest"
							checked={calculationType === 'optionInterest'}
							onChange={() => setCalculationType('optionInterest')} 
						/>
					</label>
				</div>

				<button 
					type="submit">
					Calculate
				</button>

			</form>
			
			{result && (
				<div className="result">
					<h4>Calculated {calculationType === 'optionRepayment' ? 'Repayment' : 'Interest Only'}:</h4>
					<p>${result} per month</p>
				</div>
			)}
		</div>
	);
};

export default MortgageCalculator;
