import React, { useState } from "react";
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";

export default function HexForm({handleHexInput}) {

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleHexInput(inputValue)
    setInputValue('');
  };

  return (
    <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray" className='text-center'>
          Hexadecimal Input
        </Typography>
        <Typography color="gray" className="mt-1 font-normal text-center">
          Enter a 8-bit
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-2">
            <Input size="sm" label="Hex" name="hex"
            value={inputValue}
            onChange={handleInputChange}/>
          </div>
          <Button className="mt-6 bg-indigo-500" fullWidth onClick={handleSubmit}>
            Convert
          </Button>
        </form>
      </Card>
  );
}
