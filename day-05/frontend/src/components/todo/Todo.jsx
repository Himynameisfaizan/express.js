import React, { useEffect, useState } from "react";
import axios from "axios";
import "./todo.css";
import Task from "../task/Task";
const Todo = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/todo")
      .then((res) => {
        setData(res.data.todo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="parent">
        <div className="heading">
          <div className="head">
            <h2>Todo List</h2>
          </div>
        </div>

        <Task />

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
                     <img src="/icons/trash.svg" alt="" />
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
