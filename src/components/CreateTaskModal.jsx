import { useState } from "react";
import "../styles/CreateTaskModal.css";

export default function CreateTaskModal({
  open,
  onClose,
  onCreate,
}) {
  const [description, setDescription] = useState("");
  const [clearance, setClearance] = useState("LEVEL_1");

  if (!open) return null;

  const handleSubmit = () => {
    if (!description.trim()) return;

    onCreate({
      description,
      clearanceRequired: clearance,
    });

    setDescription("");
    setClearance("LEVEL_1");
    onClose();
  };

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>Create New Task</h2>

        <div className="form-field">
          <label>Description</label>

          <textarea
            rows="4"
            placeholder="Enter task description..."
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />
        </div>

        <div className="form-field">
          <label>Clearance Level</label>

          <select
            value={clearance}
            onChange={(e) =>
              setClearance(e.target.value)
            }
          >
            <option>LEVEL_1</option>
            <option>LEVEL_2</option>
            <option>LEVEL_3</option>
          </select>
        </div>

        <div className="modal-buttons">
          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="create-btn"
            onClick={handleSubmit}
          >
            Create Task
          </button>
        </div>

      </div>

    </div>
  );
}