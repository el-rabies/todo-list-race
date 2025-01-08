import React, { useState } from "react";
import styled from "styled-components";

export interface DisplayTodo {
  complete: boolean;
  text: string;
  id: number;
}

const TodoBox = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const TodoForm = styled.form`
  display: flex;
  flex-direction: row;
  min-width: 200px;

  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`;

const TodoInput = styled.input`
  border: 0px;
  border-bottom: 1px solid lightgray;
  padding-bottom: 4px;
  width: 100%;

  &:focus {
    outline: none;
  }
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
  min-width: 233px;
  border-bottom: 1px solid lightgray;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding-bottom: 4px;
  border-radius: 2px;
  padding: 1px;

  &:hover {
    background: lightgrey;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`;

const CompleteButton = styled.button<{ $filled: boolean }>`
  display: inline-block;
  height: 25px;
  width: 25px;
  border: 1px solid #999;
  border-radius: 3px;
  background: ${(props) => (props.$filled ? "darkgray" : "transparent")};

  &:hover {
    background: ${(props) => (props.$filled ? "darkgray" : "lightgray")};
  }
`;

const TodoText = styled.div`
  width: 90%;
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
      <TodoText>{todo.text}</TodoText>
    </TodoWrapper>
  );
};

const Todos = ({ todos, setTodos }: TodosProps) => {
  const [id, setId] = useState<number>(0);
  const [text, setText] = useState("");
  const [seed, setSeed] = useState<number>(0);
  const [isFilled, setIsFilled] = useState<boolean>(false);

  const reset = () => {
    setSeed(Math.random());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(text);
  };

  const addTodo = (text: string) => {
    if (text !== "") {
      console.log("Text: ", text);

      const newTodo: DisplayTodo = {
        complete: isFilled,
        text: text,
        id: id,
      };

      setId(id + 1);
      let newTodos = todos;
      newTodos.push(newTodo);
      setTodos(newTodos);
      setText("");
    }
  };

  const editTodo = (todo: DisplayTodo) => {};

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
      <InputWrapper>
        <CompleteButton
          $filled={isFilled}
          onClick={() => setIsFilled(!isFilled)}
        />
        <TodoForm onSubmit={handleSubmit}>
          <TodoInput
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Enter Task..."
          />
        </TodoForm>
      </InputWrapper>
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
