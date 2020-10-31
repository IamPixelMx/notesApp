import React, { useState } from "react";
import "./index.css";

function NotesApp() {
  const [toDoTasksObj, setToDoTasksObj] = useState({
    active: [],
    completed: [],
  });
  const [statusActive, setStatusActive] = useState("all");
  const [titleValue, setTitleValue] = useState("");
  const [statusValue, setStatusValue] = useState("");

  const defaultCategories = ["active", "completed"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setTitleValue(value);
        break;
      case "status":
        setStatusValue(value);
        break;
      default:
        break;
    }
  };

  const getTasksArr = (activeStatus) => {
    const status = activeStatus.toLowerCase();
    if (status !== "all") {
      return toDoTasksObj[status];
    } else {
      const tasks = [];
      const categoriesArr = Object.keys(toDoTasksObj);
      defaultCategories.forEach((categorie) => {
        if (toDoTasksObj[categorie].length > 0)
          tasks.push(...toDoTasksObj[categorie]);
      });
      categoriesArr.forEach((categorie) => {
        if (!defaultCategories.includes(categorie))
          tasks.push(...toDoTasksObj[categorie]);
      });
      return tasks;
    }
  };

  const handleCategoriesChange = (categorie) => {
    setStatusActive(categorie);
  };

  const addTask = () => {
    const newToDoTasksObj = { ...toDoTasksObj };
    const status = statusValue.toLowerCase();
    const task = { title: titleValue, status };
    if (toDoTasksObj[status]) {
      newToDoTasksObj[status].push(task);
    } else {
      newToDoTasksObj[status] = [task];
    }
    setToDoTasksObj(newToDoTasksObj);
    setTitleValue("");
    setStatusValue("");
  };

  return (
    <div className="layout-column align-items-center justify-content-start">
      <section className="layout-row align-items-center justify-content-center mt-30">
        <input
          name="title"
          data-testid="input-note-name"
          type="text"
          value={titleValue}
          className="large mx-8"
          placeholder="Note Title"
          onChange={handleInputChange}
        />
        <input
          name="status"
          data-testid="input-note-status"
          type="text"
          value={statusValue}
          className="large mx-8"
          placeholder="Note Status"
          onChange={handleInputChange}
        />
        <button className="" data-testid="submit-button" onClick={addTask}>
          Add Note
        </button>
      </section>

      <div className="mt-50">
        <ul className="tabs">
          <li
            className="tab-item slide-up-fade-in"
            data-testid="allButton"
            onClick={() => handleCategoriesChange("all")}
          >
            All
          </li>
          {Object.keys(toDoTasksObj).map((categorie, index) => (
            <li
              key={`${categorie}-${index}`}
              className="tab-item slide-up-fade-in"
              data-testid={`${categorie}Button`}
              onClick={() => handleCategoriesChange(categorie)}
            >
              {defaultCategories.includes(categorie)
                ? categorie.charAt(0).toUpperCase() + categorie.slice(1)
                : categorie}
            </li>
          ))}
        </ul>
      </div>
      <div className="card w-40 pt-30 pb-8">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody data-testid="noteList">
            {getTasksArr(statusActive).map((task, index) => (
              <tr key={`${task.status}-${index}`}>
                <td>{task.title}</td>
                <td>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NotesApp;
