"use client";

import React, { useState } from "react";

interface AmountSliderProps {
  min?: number;
  max?: number;
  step?: number;
  currency?: string;
  initialValue?: number;
  onChange: (value: number) => void;
}

export default function AmountSlider({
  min = 0,
  max = 1000,
  step = 10,
  currency = "$",
  initialValue = 1000,
  onChange,
}: AmountSliderProps) {
  const [value, setValue] = useState<number>(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="w-full mt-1 max-w-lg bg-white rounded-lg flex gap-3">
      <div className="flex justify-between items-center mb-4 w-[100px]">
        <label className="text-gray-700 font-medium">Price:</label>
        <span className="text-green-600 font-bold text-lg pl-2">
          {currency}{value.toLocaleString()}
        </span>
      </div>
      
      <div className="w-[200px]">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-full bg-gray-200 mt-1 rounded-lg appearance-none cursor-pointer accent-green-600 focus:outline-none focus:ring-2 focus:ring-green-500/50"
      />
      <div className="flex justify-between text-xs text-gray-400">
        <span>{currency}{min.toLocaleString()}</span>
        <span>{currency}{max.toLocaleString()}</span>
      </div>
      </div>
    </div>
  );
}