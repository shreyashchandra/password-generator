/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const [alert, setalert] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!!@@$$&&--__";

    for (let i = 1; i <= length; i++) {
      let randomIdx = Math.floor(Math.random() * str.length + 1);
      let randomChar = str[randomIdx];
      // pass += randomChar;
      pass += str.charAt(randomIdx);
    }
    setPassword(pass);
  }, [charAllowed, numberAllowed, length, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(passwordRef.current.value);
    setalert(true);
    setTimeout(() => {
      setalert(false);
    }, 3000);
  }, []);

  useEffect(() => {
    passwordGenerator();
  }, [charAllowed, numberAllowed, length, passwordGenerator]);

  return (
    <>
      <div>
        <div className="w-96 p-5">{alert ? <Passalert /> : ""}</div>
        <div className="mt-52 w-[430px] h-64 md:w-[550px] mx-auto shadow-md rounded-lg px-6 py-6 my-8 text-sky-700 bg-slate-800">
          <h1 className=" text-blue-100 text-center text-4xl p-5">
            Generate Passwords
          </h1>
          <div className="flex shadow rounded-lg overflow-hidden md-4 mb-4">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3 text-lg font-semibold"
              placeholder="password"
              readOnly
              ref={passwordRef}
            />
            <button
              className="outline-none bg-sky-600 text-blue-100 px-3 py-0.5 shrink-0 hover:bg-sky-500"
              onClick={copyPasswordToClipboard}
            >
              Copy
            </button>
          </div>
          <div className="flex text-sm gap-x-4 text-blue-100">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label className="font-semibold">Length:{length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label className="font-semibold">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="charInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label className="font-semibold">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Passalert() {
  return (
    <>
      <div
        className="flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
        role="alert"
      >
        <svg
          className="flex-shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">Info alert!</span> Password is copied
          successfully
        </div>
      </div>
    </>
  );
}

export default App;
