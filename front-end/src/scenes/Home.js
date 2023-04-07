import Card from "../components/Card";
import Error from "../components/Error";

import React, { useState } from "react";
import classNames from "classnames";
import Members from "../components/Members";
import Header from "../components/Header";
export default function Home() {
  const [toggleRound, setToggleRound] = useState(false);
  const [toggleAnswer, setToggleAnswer] = useState(false);
  let [output, setOutput] = useState({
    sign: "1",
    combinationField: "11010",
    exponentConti: "010001",
    coefficientConti: "11111001011000110010",
    hex: "0xCD000012",
  });
  let [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  // *****************************************************************************  CODE FUNCTIONALITY CONVERTER HERE //
  const convertToFloatingPoint = (decimal, exponent) => {
    console.log(decimal);
    console.log(exponent);
    setToggleAnswer(true);
    // reinitialize output here for displaying answer
    

  };

  const decimalTobinary = (purp, decimalNum) => {
    let converted = ""
    while(Math.trunc(decimalNum/2) != 0) {
      converted = (decimalNum % 2).toString() + converted
      decimalNum = Math.trunc(decimalNum/2)

    }

    converted = decimalNum.toString() + converted

    if(purp == "d")
      while(converted.length < 4) {
        converted = "0" + converted
      }
    else if (purp == "e") {
      while(converted.length < 8) {
        converted = "0" + converted
      }
    }
    else if (purp == "bcd") {
      while(converted.length < 3) {
        converted = "0" + converted
      }
    }
    return(converted)
  }
  
  const count1s = (num) => {
    let i
    let count = 0
    for(i = 0;i < num.length;i++) {
      if(num[i] == "1")
        count++;
    }

    return count
  }

  const BCDConvert = (num) => {
    let BCD = ""

    let  first = decimalTobinary("d", num[0])
    let  second = decimalTobinary("d", num[1])
    let  third = decimalTobinary("d", num[2])

    let config = "" + first[0] + second[0] + third[0]

    if(!config.includes(1)) {
      console.log("Here?")
      BCD += decimalTobinary("bcd", num[0])
      BCD += decimalTobinary("bcd", num[1])
      BCD += "0"
      BCD += decimalTobinary("bcd", num[2])
    }
    else {
      if(count1s(config) == 3) {
        BCD += "00"
        BCD += first[3];
        BCD += "11"
        BCD += second[3];
        BCD += "111"
        BCD += third[3];
      }
      else if(count1s(config) == 2) {
        switch(config.indexOf("0")) {
          case 0:
            BCD += first.substring(1);
            BCD += "10" + second[3]
            BCD += "111" + third[3]
            break;
          case 1:
            BCD += second.substring(1,3) + first[3]
            BCD += "01" + second[3]
            BCD += "111" + third[3]
            break;
          case 2:
            BCD += third.substring(1,3) + first[3]
            BCD += "00" + second[3]
            BCD += "111" + third[3]
            break;
        }
      }
      else {
        switch(config.indexOf("1")) {
          case 0:
            BCD += third.substring(1,3) + first[3]
            BCD += second.substring(1,3) + second[3]
            BCD += "110" + third[3]
            break;
          case 1:
            BCD += first.substring(1,3) + first[3]
            BCD += third.substring(1,3) + second[3]
            BCD += "101" + third[3]
            break;
          case 2:
            BCD += first.substring(1,3) + first[3]
            BCD += second.substring(1,3) + second[3]
            BCD += "100" + third[3]
            break;
        }
      }
    }
    return BCD
  }

  // *****************************************************************************  CODE FUNCTIONALITY DOWNLOADER HERE //
  const handleDownload = () => {
    alert("Initiating Download");
  };

  const handleInputChange = (event) => {
    if (event.target.value === "") {
      setError("");
    } else {
      setInputValue(event.target.value);
      console.log("input set")
      console.log(event.target.value)
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      let signBit = 0;
      if(inputValue[0] == "-") {
        signBit = 1
        inputValue = inputValue.substring(1)
        console.log(inputValue)
      }

      console.log("Input value = " + inputValue)
      
      let input = inputValue.split("x");
      let decimal = Number(input[0]);

      let [wholePart, decimalPart] = []

      if(decimal.toString().includes('.')) {
        [wholePart, decimalPart] = decimal.toString().split(".");
      }
      else {
        [wholePart, decimalPart] = [decimal, ""]
      }

      const leftDigits = wholePart.length;
      const rightDigits = decimalPart ? decimalPart.length : 0;
      const fullDigits = ""+wholePart+decimalPart

      let base_exponent = input[1].split("^");
      let base = Number(base_exponent[0]);
      let exponent = Number(base_exponent[1]);

      //Normalizing
      exponent -= rightDigits;

      let combinationBits = "";

      if(fullDigits[0] >= 8) {
        combinationBits = "11"
        if(exponent + 101 >= 64) 
          combinationBits += "01"
        else
          combinationBits += "00"
        
        if(fullDigits[0] % 2 == 1)
          combinationBits += "1"
        else
          combinationBits += "0"
      }
      else {
        if(exponent + 101 >= 64) 
          combinationBits += "01"
        else
          combinationBits += "00"
        
          combinationBits += decimalTobinary("d", fullDigits[0]).toString().substring(1)
      }

      let exponentCont = decimalTobinary("e", (exponent + 101)).substring(2)

      console.log(exponentCont)
  
      console.log("testing = " + BCDConvert(fullDigits.substring(1,4)))
      console.log("testing2 = " + BCDConvert(fullDigits.substring(4,8)))

      setOutput({
        sign: signBit,
        combinationField: combinationBits,
        exponentConti: exponentCont,
        coefficientConti: "" + BCDConvert(fullDigits.substring(1,4)) + " " + BCDConvert(fullDigits.substring(4,8))
      })

      // *****************************************************************************  ERROR INPUTS //
      if (exponent + 101 > 191) {
        // exponent out of range ERROR
        setError("Invalid Exponent");
        setToggleAnswer(false);
      } else if (!base) {
        // no base given ERROR
        setError("No Base Given");
        setToggleAnswer(false);
      } else if (base !== 10) {
        setError("Invalid Base"); // invalid base ERROR
        setToggleAnswer(false);
      } else if (!decimal) {
        setError("Invalid Decimal");
      } else if (leftDigits + rightDigits > 7 && !toggleRound) {
        // should be round off ERROR
        setError("Over 7 Digits; Toggle Round-Off");
        setToggleAnswer(false);
      }

      // *****************************************************************************  VALID INPUTS //
      else if (!exponent) {
        // no exponent so understood as 1
        exponent = 1;
        setError("");
        convertToFloatingPoint(decimal, exponent);
      } else {
        setError("");
        convertToFloatingPoint(decimal, exponent);
      }
    } catch (error) {
      setError("No Base Given");
      console.log(error)
    }
  };

  return (
    <div className="bg-white ">
      <Header />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-20 ">
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
          <div className="mb-2 mx-auto flex items-center justify-center">
            {error ? <Error text={error} /> : <></>}
          </div>
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
            {toggleAnswer ? (
              <>
                <Card type={"query"} />
                <Card
                  type={"answer"}
                  sign={output.sign}
                  combinationField={output.combinationField}
                  exponentConti={output.exponentConti}
                  coefficientConti={output.coefficientConti}
                  hex={output.hex}
                />
              </>
            ) : (
              <></>
            )}
          </dl>
        </div>

        {/* DOWNLOAD BUTTON */}
        {toggleAnswer ? (
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
        ) : (
          <></>
        )}
      </div>

      {toggleAnswer ? (
        <div>
          <hr className="my-12 h-0.5 border-t-0 bg-indigo-400 opacity-100 dark:opacity-50 w-11/12 mx-auto shadow-2xl" />
          <Members />
        </div>
      ) : (
        <div>
          <hr className="my-12 h-0.5 border-t-0 bg-indigo-400 opacity-100 dark:opacity-50 w-11/12 mx-auto shadow-2xl mt-60" />
          <Members />
        </div>
      )}
    </div>
  );
}
