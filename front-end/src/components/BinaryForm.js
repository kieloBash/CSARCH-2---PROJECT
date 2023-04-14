import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";

export default function BinaryForm({ handleBinaryInputs }) {
  const [inputValues, setInputValues] = useState({
    sign: "",
    exponent: "",
    combination: "",
    fraction: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputValues);
    handleBinaryInputs(inputValues)


    let clear = {
      sign: "",
      exponent: "",
      combination: "",
      fraction: "",
    };
    setInputValues(clear);
  };
  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray" className="text-center">
        Binary Input
      </Typography>
      <Typography color="gray" className="mt-1 font-normal text-center">
        Enter a 32-bit
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-2">
          <Input
            size="sm"
            label="Sign"
            name="sign"
            value={inputValues.sign}
            onChange={handleInputChange}
          />
          <Input
            size="sm"
            label="Exponent"
            name="exponent"
            value={inputValues.exponent}
            onChange={handleInputChange}
          />
          <Input
            size="sm"
            label="Combination Field"
            name="combination"
            value={inputValues.combination}
            onChange={handleInputChange}
          />
          <Input
            size="sm"
            label="Fraction"
            name="fraction"
            value={inputValues.fraction}
            onChange={handleInputChange}
          />
        </div>
        <Button className="mt-6 bg-indigo-500" fullWidth onClick={handleSubmit}>
          Convert
        </Button>
      </form>
    </Card>
  );
}
