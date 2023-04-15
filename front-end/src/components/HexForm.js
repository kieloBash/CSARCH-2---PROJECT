import React, { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

import Error from "../components/Error";

export default function HexForm({ handleHexInput }) {

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  let inputValues = {
    sign: "",
    exponent: "",
    combination: "",
    fraction: "",
  }

  let [output, setOutput] = useState("")
  let [output2, setOutput2] = useState("")

  const handleDownload = () => {
    
         const link = document.createElement("a");
         const content = output;
         const file = new Blob([content], { type: 'text/plain' });
         link.href = URL.createObjectURL(file);
         link.download = "sample.txt";
         link.click();
         URL.revokeObjectURL(link.href);

    //alert("Initiating Download");
  };

  const [toggleAnswer, setToggleAnswer] = useState(false);

  const [toggleInvalid, setToggleInvalid] = useState(false);

  const [error, setError] = useState("");

  const BinarytoDecimal = (Binary) => {
    let i
    let b = 1
    let total = 0
    for (i = Binary.length - 1; i >= 0; i--) {
      if (Binary[i] == '1') {
        total += b
      }
      b *= 2
    }

    return total
  }

  const BCDtoDecimal = (BCD) => {
    let Decimal

    let first
    let second
    let third

    let config
    let config2

    if (BCD[6] == '0') {
      Decimal = "" + BinarytoDecimal(BCD.substring(0, 3)) + BinarytoDecimal(BCD.substring(3, 6)) + BinarytoDecimal(BCD.substring(7, 10))
    }
    else {
      config = "" + BCD[7] + BCD[8]
      config2 = "" + BCD[3] + BCD[4]

      switch (config) {
        case "00":
          first = "0" + BCD.substring(0, 3)
          second = "0" + BCD.substring(3, 6)
          third = "100" + BCD[9]

          break;

        case "01":
          first = "0" + BCD.substring(0, 3)
          second = "100" + BCD[5]
          third = "0" + BCD[3] + BCD[4] + BCD[9]

          break;

        case "10":
          first = "100" + BCD[2]
          second = "0" + BCD.substring(3, 6)
          third = "0" + BCD[0] + BCD[1] + BCD[9]

          break;

        case "11":
          switch (config2) {
            case "00":
              first = "100" + BCD[2]
              second = "100" + BCD[5]
              third = "0" + BCD[0] + BCD[1] + BCD[9]

              break;

            case "01":
              first = "100" + BCD[2]
              second = "0" + BCD[0] + BCD[1] + BCD[5]
              third = "100" + BCD[9]

              break;

            case "10":
              first = "0" + BCD.substring(0, 3)
              second = "100" + BCD[5]
              third = "100" + BCD[9]

              break;

            case "11":
              first = "100" + BCD[2]
              second = "100" + BCD[5]
              third = "100" + BCD[9]

          }
          break;

      }

      first = BinarytoDecimal(first)
      second = BinarytoDecimal(second)
      third = BinarytoDecimal(third)

      Decimal = "" + first + second + third
    }

    return Decimal
  }

  const handleSubmit = (e) => {
    e.preventDefault();


    setError("")
    handleHexInput(inputValue);
    //setInputValue('');
    let tempValues;
    tempValues = hex2bin(inputValue);
    if (inputValue.length != 8) {
      setError("Input must be 8-bit.");
    }
    else if (tempValues == "") {
      setError("Input is invalid.");
    }
    else {
      inputValues.sign = tempValues[0];
      inputValues.combination = tempValues.slice(1, 6);
      inputValues.exponent = tempValues.slice(6, 12);
      inputValues.fraction = tempValues.slice(12, 32);

      console.log("hello", inputValues);

      let final = ""
      let multiplier = " x 10^"
      let exponent = "" + inputValues.combination[0] + inputValues.combination[1]
      //Combination Field
      let msd
      if (inputValues.combination[0] == 1 && inputValues.combination[1] == 1) {
        msd = "100" + inputValues.combination[4]
        exponent = "" + inputValues.combination[2] + inputValues.combination[3]
      }
      else {
        msd = "0" + inputValues.combination[2] + inputValues.combination[3] + inputValues.combination[4]
        exponent = "" + inputValues.combination[0] + inputValues.combination[1]
      }

      msd = BinarytoDecimal(msd)

      let cc
      cc = "" + BCDtoDecimal(inputValues.fraction.substring(0, 10)) + BCDtoDecimal(inputValues.fraction.substring(10, 20))

      final = "" + msd + cc


      if (inputValues.sign == "1") {
        final = "-" + final
      }

      exponent = "" + exponent + inputValues.exponent

      console.log("Exponent = " + exponent)
      exponent = BinarytoDecimal(exponent) - 101

      multiplier = multiplier + exponent

      final = final + multiplier

      setOutput(final)
      console.log(final)
      
      output2 = parseInt(final)

      let i 
      for(i = 0;i < parseInt(exponent);i++) {
        output2 *= 10
      }

      setOutput2(output2)

      setToggleAnswer(true)

    }

  };

  const hex2bin = (inputValue) => {
    inputValue = inputValue.replace("0x", "").toUpperCase();
    var out = "";
    var flag = false;
    for (var c of inputValue) {

      if (c > 'F') {
        flag = true;
      }
      switch (c) {
        case '0': out += "0000"; console.log("WADADASD");break;
        case '1': out += "0001"; break;
        case '2': out += "0010"; break;
        case '3': out += "0011"; break;
        case '4': out += "0100"; break;
        case '5': out += "0101"; break;
        case '6': out += "0110"; break;
        case '7': out += "0111"; break;
        case '8': out += "1000"; break;
        case '9': out += "1001"; break;
        case 'A': out += "1010"; break;
        case 'B': out += "1011"; break;
        case 'C': out += "1100"; break;
        case 'D': out += "1101"; break;
        case 'E': out += "1110"; break;
        case 'F': out += "1111"; break;
        default: return ""; 
      }

    }
    if (flag) {
      setToggleInvalid(true);
    }
    else {
      setToggleInvalid(false);
    }


    return out;
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray" className='text-center'>
        Hexadecimal Input
      </Typography>
      <Typography color="gray" className="mt-1 font-normal text-center">
        Enter a 8-bit
      </Typography>
      <div className="mb-8 mx-auto flex items-center justify-center">
        {error ? <Error text={error} /> : <></>}
      </div>

      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-2">
          <Input size="sm" label="Hex" name="hex"
            value={inputValue}
            onChange={handleInputChange} />
        </div>
        <Button className="mt-6 bg-indigo-500" fullWidth onClick={handleSubmit}>
          Convert
        </Button>
      </form>

      <dl className="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-14 lg:mt-14">
        {toggleAnswer ? (
          <>
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-indigo-600 text-gray-200">
              <div className="px-6 py-4">
                <div className="container ">
                  <div className="font-bold text-xl mb-2 ">Answer: </div>
                  Float: {output}
                  <br></br>
                  <br></br>
                  Fixed: {output2}
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </dl>
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

    </Card>
  );
}
