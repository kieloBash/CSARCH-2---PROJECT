import Card from "../components/Card";
import Error from "../components/Error";

import React, { useState } from "react";
import classNames from "classnames";
export default function Home() {
  const [toggleRound, setToggleRound] = useState(false);
  const [toggleAnswer, setToggleAnswer] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  

  // *****************************************************************************  CODE FUNCTIONALITY CONVERTER HERE //
  const convertToFloatingPoint = (decimal,exponent) => {
    console.log(decimal)
    console.log(exponent)
    setToggleAnswer(true);
  }

  // *****************************************************************************  CODE FUNCTIONALITY DOWNLOADER HERE //
  const handleDownload = () => {
    alert("Initiating Download");
  };

  const handleInputChange = (event) => {
    if(event.target.value === ''){
      setError("");
    }else{
      setInputValue(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      let input = inputValue.split("x");
      let decimal = Number(input[0]);

      const [wholePart, decimalPart] = decimal.toString().split('.');
      const leftDigits = wholePart.length;
      const rightDigits = decimalPart ? decimalPart.length : 0;

      let base_exponent = input[1].split("^");
      let base = Number(base_exponent[0]);
      let exponent = Number(base_exponent[1]);

      // *****************************************************************************  ERROR INPUTS //
      if (exponent + 101 > 191) {                                                 // exponent out of range ERROR       
        setError("Invalid Exponent");
        setToggleAnswer(false);
      }
      else if(!base){                                                             // no base given ERROR
        setError("No Base Given");
        setToggleAnswer(false);
      }else if(base !== 10){
        setError("Invalid Base");                                                 // invalid base ERROR
        setToggleAnswer(false);
      }else if(!decimal){
        setError("Invalid Decimal");  
      }else if(leftDigits + rightDigits > 7 && !toggleRound){        // should be round off ERROR
        setError("Over 7 Digits; Toggle Round-Off"); 
        setToggleAnswer(false);
      }
      

      // *****************************************************************************  VALID INPUTS //
      else if(!exponent){                                                         // no exponent so understood as 1 
        exponent = 1
        setError("");
        convertToFloatingPoint(decimal,exponent);
      }
      else {
        setError("");
        convertToFloatingPoint(decimal,exponent);
      }


    } catch (error) {
      setError("No Base Given");
    }
  };

  return (
    <div className="bg-white py-16 sm:py-20 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
        {/* TITLE PAGE */}
        <div className="mx-auto max-w-5xl lg:text-center ">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            IEEE-754
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Decimal-32 floating-point converter
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 ">
            Designed to help you quickly and accurately convert Decimal-32
            floating-point numbers to and from their binary representation. So
            why wait? Try our Decimal-32 floating-point converter today and
            simplify your work with numerical data!
          </p>
        </div>
        {/* BODY */}
        <div className="mx-auto mt-10 max-w-2xl sm:mt-14 lg:mt-14 lg:max-w-4xl ">
        <div className="mb-2 mx-auto flex items-center justify-center">{error ? <Error text={error} /> : <></>}</div>
          {/* INPUT OF DECIMAL */}
          <form
            className="w-full max-w-lg mx-auto pb-0.5 "
            onSubmit={handleSubmit}
          >
            <div className="flex items-center border-b border-indigo-600 py-2">
              <input
                className="appearance-none bg-transparent border-none w-3/6 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Decimal to Convert (+/-Sx10^E)"
                onChange={handleInputChange}
              />

              <button
                className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-400 border-indigo-600 hover:border-indigo-400 text-sm border-4 text-white py-1 px-2 rounded mr-2"
                type="submit"
              >
                Calculate
              </button>
              <div className="flex items-center">
                <span
                  className={classNames(
                    "text-md leading-8 text-gray-600 mr-2 ml-5 transition-all duration-500",
                    {
                      "text-indigo-600": toggleRound,
                    }
                  )}
                >
                  Round-off
                </span>
                <div
                  onClick={() => setToggleRound(!toggleRound)}
                  className={classNames(
                    "flex w-12 h-5 bg-gray-600 rounded-full cursor-pointer transition-all duration-500",
                    {
                      "bg-indigo-600": toggleRound,
                    }
                  )}
                >
                  <span
                    className={classNames(
                      "h-5 w-6 bg-white rounded-full transition-all duration-500",
                      {
                        "ml-6": toggleRound,
                      }
                    )}
                  ></span>
                </div>
              </div>
            </div>
          </form>
          
          <dl className="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-14 lg:mt-14">
            {toggleAnswer? (
              <>
                <Card type={"query"} />
                <Card
                  type={"answer"}
                  sign={"1"}
                  combinationField={"11010"}
                  exponentConti={"010001"}
                  coefficientConti={"11111001011000110010"}
                  hex={"0xCD000012"}
                />
              </>
            ) : (<></>)}
            
          </dl>
        </div>

        {/* DOWNLOAD BUTTON */}
        {toggleAnswer? (
          <div className="mx-auto max-w-7xl lg:px-8  flex justify-end mt-4">
          <button
            onClick={() => handleDownload()}
            className="bg-gray-300 hover:bg-indigo-600 hover:text-white text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center transition-all duration-300"
          >
            <svg
              className="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
            <span>Download</span>
          </button>
        </div>
        ) : (<></>)}
        
      </div>
    </div>
  );
}
