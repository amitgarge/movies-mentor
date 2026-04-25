import { useState } from "react";

const Demo = () => {
  const [text, setText] = useState("");
  return (
    <div className="m-4 p-2 w-96 h-96 border-black">
      <input className="border border-black w-72 px-2"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

export default Demo;
