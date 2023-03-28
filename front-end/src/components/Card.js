import React from "react";

export default function Card(props) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        {props.type === "query" ? (
            <div className="container">
                <div className="font-bold text-xl mb-2">Query</div>
                <div>
                    <div>Significand in Decimal? <span>YES</span></div>
                    <div>Base-10? <span>YES</span></div>
                    <div>Normalized? <span>YES</span></div>
                    <div>MSD <span>8 (1000)</span></div>
                    <div>Sign bit <span>1 (-)</span></div>
                    <div>e' <span>81 (01 010001)</span></div>
                </div>
            </div>
            ) : (
            <div className="container">
                <div className="font-bold text-xl mb-2">Answer</div>
                <div>
                    <div>Sign <span>{props.sign}</span></div>
                    <div>Combination field <span>{props.combinationField}</span></div>
                    <div>Exponent continuation <span>{props.exponentConti}</span></div>
                    <div>Coeffiecient continuation <span>{props.coefficientConti}</span></div>
                    <div>Hexadecimal Representation <span>{props.hex}</span></div>
                </div>
            </div>
            )
        }
        
      </div>

    </div>
  );
}
