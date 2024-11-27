import React, { useEffect, useState } from "react";
import styled from "styled-components";

const TimerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 5px;
  border: 1px solid black;
`;

const TimeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const TimeInput = styled.input`
  border: 0px;
  padding: 0px;
  width: min-content;
  cursor: default;
  font-family: "Times New Roman", Times, serif;

  &&& {
    font-size: 24px;
    font-weight: 600;
  }
`;

const SpacerText = styled.div`
  font-size: 24;
  font-weight: 600;
`;

const StartButton = styled.button``;

const getTimeString = (timeNum: number) => {
  let hours = Math.floor(timeNum / 3600);
  let minutes = Math.floor((timeNum - hours * 3600) / 60);
  let seconds = timeNum - hours * 3600 - minutes * 60;
  return (
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0")
  );
};

const getSeconds = (timeStr: string) => {
  let hours = parseInt(timeStr.split(":")[0]);
  let minutes = parseInt(timeStr.split(":")[1]);
  let seconds = parseInt(timeStr.split(":")[2]);

  return hours * 3600 + minutes * 60 + seconds;
};

interface TimerProps {
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  started: boolean;
  setStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const Timer = ({ timer, setTimer, started, setStarted }: TimerProps) => {
  const [timeString, setTimeString] = useState(getTimeString(timer));

  useEffect(() => {
    let interval: number | undefined | NodeJS.Timer;
    if (started && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [started]);

  useEffect(() => {
    setTimeString(getTimeString(timer));

    if (timer === 0 && started) {
      setStarted(false);
    }
  }, [timer]);

  const onReset = () => {
    setTimer(0);
    setTimeString("00:00:00");
  };

  const SetHours = (newHours: number) => {
    let hours = Math.floor(timer / 3600);
    setTimer(timer - hours * 3600 + newHours * 3600);
  };

  const SetMinutes = (newMinutes: number) => {
    let hours = Math.floor(timer / 3600);
    let minutes = Math.floor((timer - hours * 3600) / 60);

    setTimer(timer - minutes * 60 + newMinutes * 60);
  };

  const SetSeconds = (newSeconds: number) => {
    let hours = Math.floor(timer / 3600);
    let minutes = Math.floor((timer - hours * 3600) / 60);
    let seconds = timer - hours * 3600 - minutes * 60;

    setTimer(timer - seconds + newSeconds);
  };

  return (
    <TimerBox>
      {started ? (
        <div>
          {timeString}
          <button onClick={() => setStarted(false)}>stop</button>
          <button onClick={onReset}>reset</button>
        </div>
      ) : (
        <TimeContainer>
          <TimeInput
            type="number"
            className="hours"
            value={timeString.split(":")[0]}
            onChange={(e) => SetHours(parseInt(e.target.value))}
            max={99}
            min={0}
          />
          <SpacerText>:</SpacerText>
          <TimeInput
            type="number"
            className="minutes"
            value={timeString.split(":")[1]}
            onChange={(e) => SetMinutes(parseInt(e.target.value))}
            max={60}
            min={0}
          />
          <SpacerText>:</SpacerText>
          <TimeInput
            type="number"
            className="seconds"
            value={timeString.split(":")[2]}
            onChange={(e) => SetSeconds(parseInt(e.target.value))}
            max={60}
            min={0}
          />
          <StartButton onClick={() => setStarted(true)}>Go!</StartButton>
        </TimeContainer>
      )}
    </TimerBox>
  );
};

export default Timer;
