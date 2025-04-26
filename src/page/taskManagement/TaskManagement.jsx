import React, { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTask, editTask } from "../../store/managementSlice";

const TaskManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { task } = useSelector((state) => state);
  console.log("task: ", task);
  const [sortOrder, setSortOrder] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("complete");

  const handleDelete = (value) => {
    dispatch(deleteTask(value.id));
  };
  // Sort tasks
  let sortedTasks = [...task.task].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  // Filter tasks
  //   if (statusFilter === "complete") {
  //     console.log('statusFilter: ~~', statusFilter);
  //     sortedTasks = sortedTasks.filter((item) => item.status === true);
  //   } else if (statusFilter === "incomplete") {
  //     sortedTasks = sortedTasks.filter((item) => item.status === false);
  // }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center p-2">
        <Button onClick={() => navigate("/create")}>Create Task</Button>

        <div className="d-flex gap-2">
          <Form.Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{ width: "180px" }}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </Form.Select>

          <Form.Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ width: "180px" }}
          >
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
          </Form.Select>
        </div>
      </div>

      <div className="p-4">
        <h2>Management List</h2>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>id</th>
              <th>User name</th>
              <th>description</th>
              <th>Due date</th>
              <th>status</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {sortedTasks.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.task}</td>
                  <td>{item.description}</td>
                  <td>{item.dueDate}</td>
                  <td>{item.status}</td>
                  {/* <td
                    onClick={() => handleToggleStatus(item)}
                    style={{
                      cursor: "pointer",
                      color: item.status ? "green" : "red",
                    }}
                  >
                    {item.status ? "Complete" : "Incomplete"}
                  </td> */}
                  <td style={{ display: "flex", gap: "5px" }}>
                    <Button onClick={() => navigate(`/${item.id}`)}>
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(item)}>Delete</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TaskManagement;
