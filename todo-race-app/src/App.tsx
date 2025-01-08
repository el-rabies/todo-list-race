import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Timer from "./Timer";
import Todos, { DisplayTodo } from "./Todos";
import closeIcon from "./icons/reset-icon.webp";
import resetIcon from "./icons/reload-icon.png";

const GlobalStyles = createGlobalStyle`
html,
body {
  background-color: #f8f8f8;
  color: #000;
}

a {
    color: inherit;
    text-decoration: none;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}
`;

const PageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: white;
  border: 1px solid lightgray;
  padding: 24px;
`;

const PageBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 90%;
  min-height: 70vh;
  height: 100%;
  padding: 16px;
  gap: 16px;
  background-color: white;
  border: 1px solid lightgray;
`;

const PageTitle = styled.div`
  font-size: 45px;
  font-weight: 600;
`;

const WinPopup = styled.div`
  min-width: fit-content;
  width: 25%;
  background-color: forestgreen;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 25%;
  bottom: auto;
  border-radius: 5px;
  border: 4px solid darkgreen;
  padding: 16px;
  gap: 8px;
`;

const LosePopup = styled.div`
  min-width: fit-content;
  width: 25%;
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
  padding: 16px;
  gap: 8px;
`;

const Button = styled.button`
  filter: grayscale(100%) brightness(0%);
  border: 0px;
  background: transparent;
`;

function App() {
  //[flag, timerWin, timerLoss]
  const [winFlags, setWinFlags] = useState([false, false, false]);
  const [timer, setTimer] = useState(0);
  const [started, setStarted] = useState(false);
  const [todos, setTodos] = useState<DisplayTodo[]>([]);

  let winSong = new Audio("./audio/happy-logo.wav");
  let loseSong = new Audio("./audio/violin-lose.wav");

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
        setStarted(false);
        winSong.play();
      } else if (winFlags[0] && timer === 0) {
        setWinFlags([false, false, true]);
        setStarted(false);
        loseSong.play();
      }
    }
  }, [timer]);

  const reset = () => {
    setWinFlags([false, false, false]);
    setTodos([]);
    setTimer(0);
  };

  return (
    <>
      <GlobalStyles />
      <PageBox>
        {winFlags[1] && (
          <WinPopup>
            You Win!
            <Button onClick={() => setWinFlags([false, false, false])}>
              <img src={closeIcon} height={40} width={40} alt="close" />
            </Button>
            <Button onClick={reset}>
              <img src={resetIcon} height={40} width={40} alt="reset" />
            </Button>
          </WinPopup>
        )}
        {winFlags[2] && (
          <LosePopup>
            You Lose!
            <Button onClick={() => setWinFlags([false, false, false])}>
              <img src={closeIcon} height={40} width={40} alt="close" />
            </Button>
            <Button onClick={reset}>
              <img src={resetIcon} height={40} width={40} alt="reset" />
            </Button>
          </LosePopup>
        )}
        <PageHeader>
          <PageTitle>Task Race!</PageTitle>
        </PageHeader>
        <PageBody>
          <Timer
            timer={timer}
            setTimer={setTimer}
            started={started}
            setStarted={setStarted}
          />
          <Todos todos={todos} setTodos={setTodos} />
        </PageBody>
      </PageBox>
    </>
  );
}

export default App;
