import React, {useMemo} from "react";

const MortgageResult = ({ result, resultTerm }) => {
    const memoizedResult = useMemo(() => {
        return (
            <div className="result">
                <h2>Your monthly repayments</h2>
                <p>${result}</p>
                <h2>Total you'll repay over the term</h2>
                <p>${resultTerm}</p>
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
};

export default MortgageResult;
