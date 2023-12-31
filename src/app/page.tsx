"use client";
import Image from "next/image";
import { KeyboardEvent, useEffect, useState } from "react";
import _ from "lodash";
import { lineSolve, oneSolve, testSolve, twoSolve } from "../../common";

export default function Home() {
  const [mapMax, setMapMax] = useState(5);
  const [map, setMap] = useState<number[][]>(Array(5).fill(Array(5).fill(0)));
  const [hint, setHint] = useState("");
  const [hintRow, setHintRow] = useState<number[][]>([]);
  const [hintCol, setHintCol] = useState<number[][]>([]);

  const handleSettingMap = (number: number) => {
    setMap(Array(number).fill(Array(number).fill(0)));
    setMapMax(number);
    setHint("");
    setHintRow([]);
    setHintCol([]);
  };

  const handleReset = () => {
    setHint("");
    setHintRow([]);
    setHintCol([]);
    setMap(Array(mapMax).fill(Array(mapMax).fill(0)));
  };

  useEffect(() => {
    const handleAnswer = () => {
      let di = 0;

      let tempMap = Array(mapMax).fill(Array(mapMax).fill(0));
      let state = 0;

      while (1) {
        // console.log(di);
        if (state === 0) {
          tempMap = _.map(hintRow, (row: any, idx) =>
            lineSolve(mapMax, row, tempMap[idx])
          );
          state = 1;
        } else {
          let originalArray = _.map(hintCol, (col: any, idx) =>
            lineSolve(
              mapMax,
              col,
              _.map(tempMap, (item) => item[idx])
            )
          );
          let rotatedArray: any = [];
          for (let i = 0; i < originalArray[0].length; i++) {
            rotatedArray[i] = [];
            for (let j = 0; j < originalArray.length; j++) {
              rotatedArray[i][j] = originalArray[j][i];
            }
          }
          tempMap = rotatedArray;
          state = 0;
        }

        let isValuePresent = _.some(tempMap, (row) => _.includes(row, 0));

        if (!isValuePresent) break;

        di++; ////보험
        if (di > 500) break;
      }
      setMap(tempMap);
    };
    if (hintRow.length === mapMax && hintCol.length === mapMax) {
      handleAnswer();
    }
  }, [hintRow, hintCol, mapMax]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex gap-10 mb-5">
        <div>
          <label>
            5{" "}
            <input
              type="radio"
              defaultChecked
              onChange={() => {
                handleSettingMap(5);
              }}
              name="mapset"
            />
          </label>
        </div>
        <div>
          <label>
            10{" "}
            <input
              type="radio"
              onChange={() => {
                handleSettingMap(10);
              }}
              name="mapset"
            />
          </label>
        </div>
        <div>
          <label>
            15{" "}
            <input
              type="radio"
              onChange={() => {
                handleSettingMap(15);
              }}
              name="mapset"
            />
          </label>
        </div>
      </div>
      <div className="flex">
        <input
          type="text"
          disabled={hintRow.length === mapMax && hintCol.length === mapMax}
          onChange={(e) => {
            setHint(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (hintRow.length !== mapMax) {
                setHintRow([
                  ..._.map(hintRow, (item) => item),
                  (e.target as HTMLInputElement).value.split(" ").map(Number),
                ]);
              } else {
                setHintCol([
                  ..._.map(hintCol, (item) => item),
                  (e.target as HTMLInputElement).value.split(" ").map(Number),
                ]);
              }

              setHint("");
            }
          }}
          value={hint}
          className="border p-2 text-xl font-medium"
        />
        {/* <button
          className="rounded-sm bg-sky-700 px-4 text-white"
          onClick={handleAnswer}
        >
          정답
        </button> */}
        <button
          className="rounded-sm ml-8 bg-red-700 px-4 text-white"
          onClick={handleReset}
        >
          리셋
        </button>
      </div>
      <div className="pt-40">
        <div className="flex items-end relative">
          <div className="absolute right-full top-0">
            {_.map(hintRow, (item, idx) => (
              <div
                className={
                  "flex items-center h-8 pr-2 text-right justify-end whitespace-nowrap"
                }
                key={idx}
              >
                {item.join(" ")}
              </div>
            ))}
          </div>

          <div className="flex border-b flex-col border-slate-300 relative">
            <div className="flex items-end absolute bottom-full left-0">
              {_.map(hintCol, (item, idx) => (
                <div className={"w-8 text-center"} key={idx}>
                  {_.map(item, (h, hidx) => (
                    <div key={hidx}>{h + ""}</div>
                  ))}
                </div>
              ))}
            </div>
            {_.map(map, (row, idx) => (
              <div className="flex" key={idx}>
                {_.map(row, (column, colIdx) => (
                  <div
                    className={
                      "w-8 h-8 border border-b-0 border-slate-300 text-center pt-1" +
                      (mapMax - 1 === colIdx ? " border-r" : " border-r-0") +
                      (column === 1 ? " bg-slate-700" : "")
                    }
                    key={idx + "" + colIdx}
                  >
                    {column === -1 && "❌"}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
