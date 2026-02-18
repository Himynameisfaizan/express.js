import React, { useEffect, useState } from "react";
import axios from "axios";
import "./todo.css";
import Task from "../task/Task";
const Todo = () => {
  const [data, setData] = useState([]);

  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  function fetchedNotes() {
    axios
      .get("https://dynamic-todo-1cly.onrender.com/todo")
      .then((res) => {
        setData(res.data.todo);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchedNotes();
  }, []);

  function editTodo(title, id) {
    setInput(title);
    setEditId(id);
  }

  const formHandling = (e) => {
    e.preventDefault();
    const { title } = e.target.elements;

    if(input == ""){
      alert("Please add task first!")
      return
    }

    if (editId) {
      axios
        .patch(`https://dynamic-todo-1cly.onrender.com/todo/${editId}`, {
          title: title.value,
        })
        .then((res) => {
          setEditId(null)
          setInput("")
          console.log(`this ${editId} todo modified successfully`);
          fetchedNotes();
        });
    } else {
      axios
        .post("https://dynamic-todo-1cly.onrender.com/todo", {
          title: title.value,
        })
        .then((res) => {
          console.log("todo created successfully");
          setInput("")
          fetchedNotes();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function deleteTodo(id) {
    axios.delete(`https://dynamic-todo-1cly.onrender.com/todo/${id}`).then((res) => {
      console.log("todo delete successfully");
      fetchedNotes();
    });
  }

  return (
    <>
      <div className="parent">
        <div className="heading">
          <div className="head">
            <h2>Todo List</h2>
          </div>
        </div>

        <div className="tasks">
          <div className="input">
            <form onSubmit={formHandling}>
              <div className="border-effect">
                <input
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                  value={input}
                  name="title"
                  className="write"
                  type="text"
                  placeholder="Enter your today's task"
                />
                <input
                  className="response"
                  type="submit"
                  value={editId ? "Update" : "Add"}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="results">
          {data.map((item) => {
            return (
              <div key={item._id} className="result">
                <div className="tick">
                  <img src="/icons/verified.svg" alt="" />
                </div>
                <div className="title">
                  <p>{item.title}</p>
                </div>
                <div className="trash">
                  <button
                    onClick={() => {
                      deleteTodo(item._id);
                    }}
                  >
                    <img src="/icons/trash.svg" alt="" />
                  </button>
                  <button
                    onClick={() => {
                      editTodo(item.title, item._id);
                    }}
                  >
                    <img className="edit" src="/icons/edit2.svg" alt="" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Todo;
