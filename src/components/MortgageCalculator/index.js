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
	const [errors, setErrors] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(formRef.current);
		const data = Object.fromEntries(formData.entries());
		setFormData(data);

		const newErrors = {};
		if (!data.mortgageAmount) newErrors.mortgageAmount = "This field is required";
		if (!data.mortgageTerm) newErrors.mortgageTerm = "This field is required";
		if (!data.interestRate) newErrors.interestRate = "This field is required";
		if (!calculationType) newErrors.calculationType = "This field is required";

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		setErrors({});
	};
	const handleClearAll = useCallback(() => {
		if (formRef.current) {
			formRef.current.reset();
		}
		setCalculationType('');
		setErrors({});
	}, []);;
	return (
		<div>
			<form
				className="mortgage-calculator d-flex flex-column flex-md-row bg-white rounded-4 w-100"
				ref={formRef}
				onSubmit={handleSubmit}
			>
				{/* TAKE IT AWAY! */}
				<div className="cointainer">
					<div class="row">
						<div className="col-md-6 col-12 d-flex flex-column">
							<div className="box flex-grow-1">
								<div className="head" style={{ display: 'flex', alignItems: 'center' }}>
									<h4>Mortgage Calculator</h4>
									<button
										type="button" onClick={handleClearAll}
										style={{ marginLeft: 'auto' }}>
										<img src={`/images/clearall.svg`}
											alt="Clear Button"
										/>
									</button>
								</div>
								<div className="mortgageAmount">
									<label>
										<h5>Mortgage Amount</h5>
										<input
											type="number"
											name="mortgageAmount"
										/>
									</label>
									<div className="error-container">
										{errors.mortgageAmount}
									</div>
								</div>
								<div className="mortgageTermInt" style={{ display: 'flex', alignItems: 'center' }}>
									<label>
										<h5>Mortgage Term</h5>
										<input
											type="number"
											name="mortgageTerm"
										/>
										<div className="error-container">
											{errors.mortgageTerm}
										</div>
									</label>
									<div className="interestRate" style={{ marginLeft: 'auto' }}>
										<label>
											<h5>Interest Rate</h5>
											<input
												type="number"
												name="interestRate"
											/>
										</label>
										<div className="error-container">
											{errors.interestRate}
										</div>
									</div>
								</div>
								<div className="mortgageType">
									<h5>Mortgage Type</h5>
									<label style={{ display: 'flex' }}>
										<input
											type="radio"
											name="calculationType"
											value="optionRepayment"
											checked={calculationType === 'optionRepayment'}
											onChange={() => setCalculationType('optionRepayment')}
										/>
										<span>Repayment </span>
									</label>
									<label style={{ display: 'flex' }}>
										<input
											type="radio"
											name="calculationType"
											value="optionInterest"
											checked={calculationType === 'optionInterest'}
											onChange={() => setCalculationType('optionInterest')}
										/>
										<span>Interest Only </span>
									</label>
									<div className="error-container">
										{errors.calculationType}
									</div>
								</div>
								<div className="calcButton">
									<button
										type="submit">
										<img src={`/images/calculatebutton.svg`}
											alt="Calculate Button"
										/>

									</button>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-12 d-flex flex-column">
							<div className="box flex-grow-1">
								<MortgageResult result={memoizedData.result} resultTerm={memoizedData.resultTerm} />
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default MortgageCalculator;
