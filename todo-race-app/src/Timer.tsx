import React, { useEffect, useState } from "react";
import styled from "styled-components";
import pauseIcon from "./icons/Pause-Button-Transparent.png";
import playIcon from "./icons/play-button-icon.png"
import resetIcon from "./icons/reset-icon.webp"

const TimerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4px;
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

  &&& {
    font-size: 40px;
    font-weight: 600;
    color: #7b7b7b;
  }
`;

const SpacerText = styled.div`
  font-size: 40px;
  font-weight: 600;
  color: #7b7b7b;
`;

const TimerText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: 600;
  color: #7b7b7b;
`

const StartButton = styled.button`
  filter: grayscale(100%) brightness(0%);
  border: 0px;
  background: transparent;
`;

const StopButton = styled.button`
  filter: grayscale(100%) brightness(0%);
  border: 0px;
  background: transparent;
`

const ResetButton = styled.button`
  filter: grayscale(100%) brightness(0%);
  border: 0px;
  background: transparent;
`

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
  }, [started, setTimer, timer]);

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
        <TimerText>
          {timeString}
          <StopButton onClick={() => setStarted(false)}>
          <img src={pauseIcon} height={40} width={40} alt="stop"/>
          </StopButton>
          <ResetButton onClick={onReset}>
            <img src={resetIcon} height={40} width={40} alt="reset"/>
          </ResetButton>
        </TimerText>
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
          <StartButton onClick={() => setStarted(true)}>
            <img src={playIcon} height={40} width={40} alt="Go!"/>
          </StartButton>
        </TimeContainer>
      )}
    </TimerBox>
  );
};

export default Timer;
