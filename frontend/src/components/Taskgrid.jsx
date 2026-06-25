import TaskCard from "./Taskcard";

export default function TaskGrid({
  tasks,
  onDelete
}) {
  return (

    <div className="task-grid">

      {
        tasks.map((tasks,index) =>(
          <TaskCard

            key={tasks.id}

            tasks={tasks}
            taskNumber={index+1}

            onDelete={onDelete}

          />
        ))
      }

    </div>

  );
}