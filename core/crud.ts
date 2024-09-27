import fs from "fs";
const DB_FILE_PATH = "./core/db";

interface Todo {
  date: string;
  content: string;
  done: boolean;
  id: string;
}

function create(content: string, id: string) {
  const todo: Todo = {
    date: new Date().toISOString(),
    content,
    done: false,
    id,
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
  return content;
}

function update(id: string, new_content: string) {
  const todoList = read();
  const todo = todoList.find((todo) => todo.id === id);

  if (!todo) {
    throw new Error("Todo not found");
  }

  const updated_todo = {
    ...todo,
    content: new_content,
    date: new Date().toISOString(),
  };

  const updated_todo_list = todoList.map((todo) =>
    todo.id === id ? updated_todo : todo
  );

  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify({ todoList: updated_todo_list }, null, 2)
  );
}

function read(): Array<Todo> {
  const db_content_String = fs.readFileSync(DB_FILE_PATH, "utf-8");
  const db_content = JSON.parse(db_content_String || "{}");

  if (!db_content.todoList) return [];
  return db_content.todoList;
}

function CLEAR_DB() {
  fs.writeFileSync(DB_FILE_PATH, "");
}

CLEAR_DB();
create("Hello World", "1");
create("Hello World", "2");
update("1", "Hello World 2");

console.log(read());
