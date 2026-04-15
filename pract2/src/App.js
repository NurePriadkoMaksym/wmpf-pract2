import React, { useEffect, useState } from "react";

const translations = {
  ua: {
    title: "Список завдань",
    all: "Всі",
    completed: "Завершені",
    active: "Незавершені",
    loading: "Завантаження...",
    error: "Помилка завантаження",
    randomFact: "Випадковий факт"
  },
  en: {
    title: "Todo List",
    all: "All",
    completed: "Completed",
    active: "Active",
    loading: "Loading...",
    error: "Error loading",
    randomFact: "Random Fact"
  }
};

export default function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [lang, setLang] = useState("ua");
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then(res => res.json())
      .then(data => {
        setTodos(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });

    fetch("https://catfact.ninja/fact")
      .then(res => res.json())
      .then(data => setFact(data.fact))
      .catch(() => setFact("Error"));
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  const checkJSON = (text) => {
    try {
      JSON.parse(text);
      alert("Дійсний JSON");
    } catch {
      alert("Недійсний JSON");
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>{translations[lang].title}</h1>

      <div>
        <button onClick={() => setLang("ua")}>UA</button>
        <button onClick={() => setLang("en")}>EN</button>
      </div>

      <hr />

      <div>
        <button onClick={() => setFilter("all")}>{translations[lang].all}</button>
        <button onClick={() => setFilter("completed")}>{translations[lang].completed}</button>
        <button onClick={() => setFilter("active")}>{translations[lang].active}</button>
      </div>

      {loading && <p>{translations[lang].loading}</p>}
      {error && <p>{translations[lang].error}</p>}

      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            {todo.title} {todo.completed ? "(завершено)" : "(незавершено)"}
          </li>
        ))}
      </ul>

      <hr />

      <h2>{translations[lang].randomFact}</h2>
      <p>{fact}</p>

      <hr />

      <h3>Перевірка JSON</h3>
      <textarea id="jsonInput" rows="4" cols="50" />
      <br />
      <button onClick={() => {
        const value = document.getElementById("jsonInput").value;
        checkJSON(value);
      }}>
        Перевірити JSON
      </button>
    </div>
  );
}
