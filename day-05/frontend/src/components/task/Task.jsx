import React from "react";
import "./task.css";
const Task = () => {
  return (
    <>
      <div className="tasks">
        <div className="input">
          <form action="">
            <div className="border-effect">
              <input
                className="write"
                type="text"
                placeholder="Enter your today's task"
              />
              <input className="response" type="submit" value="Add" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Task;
