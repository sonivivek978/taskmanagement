import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addTask } from "../../store/managementSlice";
import { useNavigate } from "react-router-dom";

const EditTaskForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Math.random().toString(36).substr(2, 9);
    const newTask = { id, task, description, dueDate };
    console.log(newTask);
    dispatch(addTask(newTask));
    navigate("/");
    setTask("");
    setDescription("");
    setDueDate("");
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="task-form border p-4 rounded w-100"
      style={{ minWidth: "500px" }}
    >
      <Form.Group controlId="task">
        <Form.Label className="text-start w-100 mt-3">Create Task</Form.Label>

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

      <Button variant="primary" className="mt-3" type="submit">
        Add Task
      </Button>
    </Form>
  );
};

export default EditTaskForm;
