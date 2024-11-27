import React, { useState } from "react";
import styled from "styled-components";

export interface DisplayTodo {
  complete: boolean;
  text: string;
  id: number;
}

const TodoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const TodoInput = styled.input`
  border-radius: 5px;
  border: 1px solid black;
  padding: 0 4px 0 4px;
  min-height: 25px;
  min-width: 200px;

  font-family: "Times New Roman", Times, serif;
  font-size: 16px;
  color: black;
`;

const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const TodoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 200px;
  padding: 4px;
  border-radius: 10px;
  border: 1px solid black;

  align-items: center;
  justify-content: flex-start;
  gap: 8px;

  &:hover {
    background-color: lightgray;
  }
`;

const CompleteButton = styled.button<{ $filled: boolean }>`
  border: 0.5;
  border-radius: 25px;
  width: 25px;
  height: 25px;
  background-color: ${(props) => (props.$filled ? "black" : "transparent")};
`;

interface TodoProps {
  todo: DisplayTodo;
  onComplete: (todo: DisplayTodo) => void;
  onDelete: (todo: DisplayTodo) => void;
  onEdit: (todo: DisplayTodo) => void;
}

interface TodosProps {
  todos: DisplayTodo[];
  setTodos: React.Dispatch<React.SetStateAction<DisplayTodo[]>>;
}

const Todo = ({ todo, onComplete }: TodoProps) => {
  return (
    <TodoWrapper>
      <CompleteButton
        $filled={todo.complete}
        onClick={() => onComplete(todo)}
      />
      <div>{todo.text}</div>
    </TodoWrapper>
  );
};

const Todos = ({ todos, setTodos }: TodosProps) => {
  const [id, setId] = useState<number>(0);
  const [text, setText] = useState("");
  const [seed, setSeed] = useState<number>(0);

  const reset = () => {
    setSeed(Math.random());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(text);
  };

  const addTodo = (text: string) => {
    console.log("Text: ", text);

    const newTodo: DisplayTodo = {
      complete: false,
      text: text,
      id: id,
    };

    setId(id + 1);
    let newTodos = todos;
    newTodos.push(newTodo);
    setTodos(newTodos);
    setText("");
  };

  const editTodo = (todo: DisplayTodo) => {
    let i = todos.findIndex((value) => value.id === todo.id);
    let tempTodos = todos;
  };

  const deleteTodo = (todo: DisplayTodo) => {};

  const toggleCompleteTodo = (todo: DisplayTodo) => {
    let i = todos.findIndex((value) => value.id === todo.id);
    let tempTodos = todos;
    tempTodos[i].complete = !tempTodos[i].complete;

    if (!tempTodos[i].complete) {
      tempTodos.unshift(tempTodos.splice(i, 1)[0]);
    } else {
      tempTodos.push(tempTodos.splice(i, 1)[0]);
    }

    setTodos(tempTodos);
    reset();
  };

  return (
    <TodoBox>
      <form onSubmit={handleSubmit}>
        <TodoInput
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Enter Task..."
        />
      </form>
      <TodoContainer>
        {todos.map((todo) => (
          <Todo
            todo={todo}
            onComplete={toggleCompleteTodo}
            onEdit={editTodo}
            onDelete={deleteTodo}
            key={todo.id + seed}
          />
        ))}
      </TodoContainer>
    </TodoBox>
  );
};

export default Todos;
