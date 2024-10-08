/* eslint-disable no-console */
import fs from "fs";
import { v4 as uuid } from "uuid";

const DB_FILE_PATH = "./core/db";

function create(content: string) {
  const todo: Todo = {
    id: uuid(),
    date: new Date().toISOString(),
    content,
    done: false,
  };

  const todoList: Array<Todo> = [...read(), todo];

  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify(
      {
        todoList,
      },
      null,
      2
    )
  );
  return todo;
}

function getTodoList(): Array<Todo> {
  return read();
}

function update(id: UUID, new_content: Partial<Todo>): Todo {
  let todoUpdated;
  const todoList = getTodoList();
  todoList.forEach((currentTodoUpdated) => {
    const isTodoUpdated = currentTodoUpdated.id === id;

    if (isTodoUpdated) {
      todoUpdated = Object.assign(currentTodoUpdated, new_content);
    }
  });

  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify(
      {
        todoList,
      },
      null,
      2
    )
  );

  if (!todoUpdated) {
    throw new Error("Please, provide another todo id");
  }

  return todoUpdated;
}

function updateContentTodoById(id: UUID, newContent: string) {
  const todoUpdated = update(id, { content: newContent });
  return todoUpdated;
}

function deleteTodoById(id: UUID) {
  const todoList = getTodoList();

  const isTodoValid = todoList.map((todo) => todo.id === id);

  if (!isTodoValid) {
    throw new Error("No todo found");
  }

  const todoListUpdated = todoList.filter((todo) => todo.id !== id);

  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify(
      {
        todoList: todoListUpdated,
      },
      null,
      2
    )
  );
}

export function read(): Array<Todo> {
  const db_content_String = fs.readFileSync(DB_FILE_PATH, "utf-8");
  const db_content = JSON.parse(db_content_String || "{}");

  if (!db_content.todoList) return [];
  return db_content.todoList;
}

function CLEAR_DB() {
  fs.writeFileSync(DB_FILE_PATH, "");
}

CLEAR_DB();
create("Hello World 1");
create("Hello World 2");

const todo3 = create("Hello World 3");
const todo4 = create("Hello World 4");

update(todo3.id, { content: "Hello World 3 updated", done: true });
updateContentTodoById(todo4.id, "Hello World 4 updated");

deleteTodoById(todo3.id);
console.log(read());
