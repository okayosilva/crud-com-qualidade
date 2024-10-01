import { TodoController } from "@ui/controller/todo";
import { GlobalStyles } from "@ui/theme/GlobalStyles";
import { useEffect, useState } from "react";
import { Todo } from "./@types/todo";

const bg = "https://mariosouto.com/cursos/crudcomqualidade/bg";
const { get } = TodoController;

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    get().then(setTodos);
  }, [todos]);

  return (
    <main>
      <GlobalStyles />
      <header
        style={{
          backgroundImage: `url('${bg}')`,
        }}
      >
        <div className="typewriter">
          <h1>O que fazer hoje?</h1>
        </div>
        <form>
          <input type="text" placeholder="Correr, Estudar..." />
          <button type="submit" aria-label="Adicionar novo item">
            +
          </button>
        </form>
      </header>

      <section>
        <form>
          <input type="text" placeholder="Filtrar lista atual, ex: Dentista" />
        </form>

        <table border={1}>
          <thead>
            <tr>
              <th align="left">
                <input type="checkbox" disabled />
              </th>
              <th align="left">Id</th>
              <th align="left">Conteúdo</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {todos.map((currentTodo) => (
              <tr key={currentTodo.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{currentTodo.id.substring(0, 5)}</td>
                <td>{currentTodo.content}</td>
                <td align="right">
                  <button data-type="delete">Apagar</button>
                </td>
              </tr>
            ))}

            {/* <tr>
              <td colSpan={4} align="center" style={{ textAlign: "center" }}>
                Carregando...
              </td>
            </tr>

            <tr>
              <td colSpan={4} align="center">
                Nenhum item encontrado
              </td>
            </tr> */}

            <tr>
              <td colSpan={4} align="center" style={{ textAlign: "center" }}>
                <button data-type="load-more">
                  Carregar mais{" "}
                  <span
                    style={{
                      display: "inline-block",
                      marginLeft: "4px",
                      fontSize: "1.2em",
                    }}
                  >
                    ↓
                  </span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}
