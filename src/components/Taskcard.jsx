import { useState,useEffect } from "react";


import "../styles/Taskcard.css";


export default function TaskCard({ tasks, taskNumber,onDelete }) {
  
   const [timeLeft, setTimeLeft] = useState("");

   useEffect(() => {
    const updateTimer = () =>{
      const remaining = tasks.expirationTimestamp - Date.now();

      if(remaining <=0 ){
        setTimeLeft("00:00");
        return;
      }

      const minutes = Math.floor(remaining/60000);
      const seconds = Math.floor((remaining/60000)/1000);

      setTimeLeft(
        `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`
      );
    };

    updateTimer();

    const interval = setInterval(updateTimer,1000);
    return() => clearInterval(interval);

   }, [tasks.expirationTimestamp]);

  
  return (
    <div className="task-card">

      <div className="task-top">
        <span className="task-id">Task #{taskNumber}</span>

        <span className={`badge ${tasks.clearanceRequired}`}>
          {tasks.clearanceRequired}
        </span>
      </div>

      <p className="task-desc">
        {tasks.description}
      </p>

      <div className="task-bottom">
        <span className="timer">
          ⏱  {timeLeft}
        </span>

        <button
          className="delete-btn"
          onClick={() => onDelete(tasks.id)}
        >
          Delete
        </button>
      </div>

    </div>
  );
}