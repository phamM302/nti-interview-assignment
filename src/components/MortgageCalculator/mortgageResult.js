import React, { useMemo } from "react";

const MortgageResult = ({ result, resultTerm }) => {
    {
        if (result) {
            const memoizedResult = useMemo(() => {
                return (
                    <div className="result">
                        <h5>Your monthly repayments</h5>
                        <h1>${result}</h1>
                        <h5>Total you'll repay over the term</h5>
                        <h4>${resultTerm}</h4>
                    </div>

                );
            }, [result, resultTerm]);

            return (
                <div className="result">
                    <h4 style={{ fontFamily: 'bold' }}> Your Results</h4>
                    <p>
                        Your results are shown below based on the information you provided.
                        To adjust the results, edit the form and click "calculate repayments" again.
                    </p>
                    {result && memoizedResult}
                </div>
            );
        }
        else {
            return (
                <div className="resultEmpty">
                    <img src={`/images/illustration-empty.svg`}
                        alt="Empty Result"></img>
                    <h4> Results shown here</h4>
                    <p>
                        Complete the form and click "calculate repayments" to see what your monthly
                        repayments would be.
                    </p>
                    {result && memoizedResult}
                </div>
            );
        }
    }
};

export default MortgageResult;
