"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import calculateMortgage from "./calculateMortgage";
import MortgageResult from "./mortgageResult";
import "./style.scss";

const MortgageCalculator = ({ ...props }) => {
	const formRef = useRef(null);
	//added the variables needed to calculate
	const [calculationType, setCalculationType] = useState('');
	const [formData, setFormData] = useState({});
	const memoizedData = useMemo(() => {
		return calculateMortgage(formData);
	}, [formData]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(formRef.current);
		const data = Object.fromEntries(formData.entries());
		setFormData(data);
	};
	return (
		<div>
			<form
				className="mortgage-calculator d-flex flex-column flex-md-row bg-white rounded-4 w-100"
				ref={formRef}
				onSubmit={handleSubmit}
			>
				{/* TAKE IT AWAY! */}
				<div className="calculation">
					<h1 style={{ fontFamily: 'bold' }}> Mortgage Calculator</h1>
					<label>
						<h2>Mortgage Amount</h2>
						<input
							type="number"
							name="mortgageAmount"
						/>
					</label>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<label>
							<h2>Mortgage Term</h2>
							<input
								type="number"
								name="mortgageTerm"
							/>
						</label>
	
						<label>
							<h2>Interest Rate</h2>
							<input
								type="number"
								name="interestRate"
							/>
						</label>
					</div>
					<h2>Mortgage Type</h2>
					<label style={{ display: 'flex' }}>
						<input
							type="radio"
							name="calculationType"
							value="optionRepayment"
							checked={calculationType === 'optionRepayment'}
							onChange={() => setCalculationType('optionRepayment')}
						/>
						<span style={{ fontFamily: 'bold' }}>Repayment </span>
					</label>
					<label style={{ display: 'flex' }}>
						<input
							type="radio"
							name="calculationType"
							value="optionInterest"
							checked={calculationType === 'optionInterest'}
							onChange={() => setCalculationType('optionInterest')}
						/>
						<span style={{ fontFamily: 'bold' }}>Interest Only </span>
					</label>
					<div className="calculation">
						<button
							type="submit">
							<img src={`/images/calculatebutton.svg`}
								alt="Calculate Button"
							/>

						</button>
					</div>
				</div>
				<MortgageResult result={memoizedData.result} resultTerm={memoizedData.resultTerm} />
			</form>

		</div>
	);
};

export default MortgageCalculator;
