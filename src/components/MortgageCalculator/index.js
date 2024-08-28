"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import "./style.scss";

const MortgageCalculator = ({ ...props }) => {
	const formRef = useRef(null);

	const [mortgageAmount, setMortgageAmount] = useState('');

    const [mortgageTerm, setMortgageTerm] = useState('');

    const [interestRate, setInterestRate] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(formRef.current);
		const data = Object.fromEntries(formData.entries());
		console.log(data);
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
		</form>
	);
};

export default MortgageCalculator;
