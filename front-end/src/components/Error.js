import React from "react";

export default function Error({text}) {
  return (
    <div
      class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 h-3 flex items-center mt-2"
      role="alert"
    >
      <span class="font-bold">Warning:</span><span className="ml-5">{text}</span>
    </div>
  );
}
