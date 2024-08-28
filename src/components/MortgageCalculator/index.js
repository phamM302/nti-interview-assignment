"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import "./style.scss";

const MortgageCalculator = ({ ...props }) => {
	const formRef = useRef(null);
	const [mortgageAmount, setMortgageAmount] = useState('');
    const [mortgageTerm, setMortgageTerm] = useState('');
    const [interestRate, setInterestRate] = useState('');
	const [calculationType, setCalculationType] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(formRef.current);
		const data = Object.fromEntries(formData.entries());
		if (calculationType === 'optionRepayment') {
            console.log('Repayment Calculation:', data);
        } else if (calculationType === 'optionInterest') {
            console.log('Interest Only Calculation:', data);
		}
	};
	return (
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
					value = {mortgageAmount}
					onChange = {(e) => setMortgageAmount(e.target.value)}
				/>
			</label>

			<label>
				Mortgage Term (years): 
				<input 
					type = "number"	
					value = {mortgageTerm}
					onChange = {(e) => setMortgageTerm(e.target.value)}
				/>
			</label>

			<label>
				Interest Rate (%): 
				<input 
					type = "number"	
					value = {interestRate}
					onChange = {(e) => setInterestRate(e.target.value)}
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
						value="optionInterest"
						checked={calculationType === 'optionInterest'}
                        onChange={() => setCalculationType('optionInterest')} 
					/>
				</label>
			</div>
		</form>
	);
};

export default MortgageCalculator;
