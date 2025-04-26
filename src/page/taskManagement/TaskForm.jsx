import React, { useEffect, useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../../store/managementSlice";
import { useNavigate, useParams } from "react-router-dom";

const TaskForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editId = useParams();
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("complete");
  const data = useSelector((state) => state.task);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Math.random().toString(36).substr(2, 9);
    const createdAt = new Date().toISOString();

    const newTask = { id, task, description, dueDate, createdAt, status };
    console.log(newTask, "NEW task");
    if (editId?.id) {
      dispatch(
        editTask({
          id: editId.id,
          data: { task, description, dueDate, status },
        })
      );
    } else {
      dispatch(addTask(newTask));
    }
    navigate("/");
    setTask("");
    setDescription("");
    setDueDate("");
  };

  useEffect(() => {
    if (editId?.id) {
      const EditData = data.task.find((x) => x.id == editId?.id);
      setTask(EditData?.task);
      setDescription(EditData?.description);
      setDueDate(EditData?.dueDate);
      setStatus(EditData?.status);
    }
  }, [editId?.id]);

  return (
    <Form
      onSubmit={handleSubmit}
      className="task-form border p-4 rounded w-100"
      style={{ minWidth: "500px" }}
    >
      <Form.Group controlId="task">
        <Form.Text
          className="text-start w-100 mt-3 fw-bold"
          style={{ fontSize: "20px" }}
        >
          {editId?.id ? "Edit" : "Add"} Task
        </Form.Text>

        <Form.Label className="text-start w-100 mt-3">Task</Form.Label>
        <Form.Control
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
          placeholder="Enter task name"
        />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label className="text-start w-100 mt-3">Description</Form.Label>
        <Form.Control
          as="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="Enter task description"
        />
      </Form.Group>

      <Form.Group controlId="dueDate">
        <Form.Label className="text-start w-100 mt-3">Due Date</Form.Label>
        <Form.Control
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="dueDate">
        <Form.Label className="text-start w-100 mt-3">Status</Form.Label>
        <Form.Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ width: "200px" }}
        >
          <option value="complete">Complete</option>
          <option value="inComplete">InComplete</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" className="mt-3" onClick={() => navigate("/")}>
        Back
      </Button>

      <Button variant="primary" className="mt-3 ms-2" type="submit">
        {editId?.id ? "Edit" : "Add"} Task
      </Button>
    </Form>
  );
};

export default TaskForm;
