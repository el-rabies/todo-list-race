import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Timer from "./Timer";
import Todos, { DisplayTodo } from "./Todos";

const PageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  gap: 16px;
`;

const PageTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

const WinPopup = styled.div`
  width: 25%;
  height: 50%;
  background-color: forestgreen;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 25%;
  bottom: auto;
  border-radius: 5px;
  border: 4px solid darkgreen;
`;

const LosePopup = styled.div`
  width: 25%;
  height: 50%;
  background-color: crimson;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  justify-self: center;
  top: 25%;
  bottom: auto;
  border-radius: 5px;
  border: 4px solid darkred;
`;

function App() {
  //[flag, timerWin, timerLoss]
  const [winFlags, setWinFlags] = useState([false, false, false]);
  const [timer, setTimer] = useState(0);
  const [started, setStarted] = useState(false);
  const [todos, setTodos] = useState<DisplayTodo[]>([]);

  //Handle Time Ending
  useEffect(() => {
    if (todos.length !== 0) {
      if (timer === 1) {
        setWinFlags([true, false, false]);
      }

      if (
        todos.filter((todo) => todo.complete).length === todos.length &&
        todos.length > 0
      ) {
        setWinFlags([true, false, false]);
      }

      if (
        winFlags[0] &&
        todos.filter((todo) => todo.complete).length === todos.length
      ) {
        setWinFlags([false, true, false]);
        setStarted(false)
      } else if (winFlags[0] && timer === 0) {
        setWinFlags([false, false, true]);
        setStarted(false)
      }
    }
  }, [timer]);

  const reset = () => {
    setWinFlags([false, false, false]);
    setTodos([]);
    setTimer(0);
  };

  return (
    <PageBox>
      {winFlags[1] && (
        <WinPopup>
          You Win!
          <button onClick={() => setWinFlags([false, false, false])}>
            close
          </button>
          <button onClick={reset}>Reset?</button>
        </WinPopup>
      )}
      {winFlags[2] && (
        <LosePopup>
          You Lose!
          <button onClick={() => setWinFlags([false, false, false])}>
            Close
          </button>
          <button onClick={reset}>Reset?</button>
        </LosePopup>
      )}
      <PageTitle>Task Race</PageTitle>
      <Timer
        timer={timer}
        setTimer={setTimer}
        started={started}
        setStarted={setStarted}
      />
      <Todos todos={todos} setTodos={setTodos} />
    </PageBox>
  );
}

export default App;
