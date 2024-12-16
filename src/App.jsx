import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [updateId, setUpdateId] = useState(null);
  const [deletePrompt, setDeletePrompt] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showEmptyPrompt, setShowEmptyPrompt] = useState(false);  // For the empty todo prompt
  const [showEmoji, setShowEmoji] = useState(false); // State for emoji
  const [clickCount, setClickCount] = useState(0);
  const [emptyTodosPrompt, setEmptyTodosPrompt] = useState(false);



  // Save to Local Storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleChange = (e) => {
    setTodo(e.target.value);
    setAlert({ message: "", type: "" });
  };
  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") { // Check if the pressed key is Enter
      handleAdd(); // Trigger handleAdd function
    }
  };

  const showAlert = (message, type) => {

    setAlert({ message, type });
    setTimeout(() => setAlert({ message: "", type: "" }), 3000);
  };

  const handleAdd = () => {
    if (!todo.trim()) {
      setShowEmptyPrompt(true);
      return;
    }

    if (updateId) {
      setTodos(
        todos.map((item) =>
          item.id === updateId ? { ...item, todo } : item
        )
      );
      setUpdateId(null);
      showAlert("Todo updated successfully!", "success");
    } else {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      showAlert("Todo added successfully!", "success");
    }
    setTodo("");
  };

  const handleDeletePrompt = (id) => {
    setDeletePrompt(true);
    setDeleteId(id);
  };

  const handleDelete = (confirm) => {
    if (confirm) {
      setTodos(todos.filter((item) => item.id !== deleteId));
      showAlert("Todo deleted successfully!", "success");
    }
    setDeletePrompt(false);
    setDeleteId(null);
  };

  // const handleEmptyTodos = () => {
  //   setTodos([]);
  //   showAlert("All todos have been deleted!", "error");
  // };
  const handleEmptyTodos = (confirm) => {
    if (confirm) {
      setTodos([]);
      showAlert("All todos have been deleted!", "error");
    }
    setEmptyTodosPrompt(false); // Close the prompt
  };

  const handleEdit = (id) => {
    const itemToUpdate = todos.find((item) => item.id === id);
    setTodo(itemToUpdate.todo);
    setUpdateId(id);
  };

  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((item) =>
        item.id === id
          ? { ...item, isCompleted: !item.isCompleted }
          : item
      )
    );
  };

  const handleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  const filteredTodos = showCompleted
    ? todos.filter((item) => item.isCompleted)
    : todos;

  const hasCompletedTodos = todos.some((item) => item.isCompleted);
  // Handle Yes/No response to empty todo prompt
  const handleEmptyTodoResponse = (response) => {
    if (response === "yes") {
      setShowEmptyPrompt(false);  // Close prompt if 'Yes' clicked
    } else {
      setClickCount((prevCount) => prevCount + 1); // Increment click count
      setTimeout(() => setClickCount(0), 4000); // Reset click count after 3 seconds
    }
  };
  return (
    <>
      <Navbar />
      <div>
        <div className="flex items-center justify-center bg-teal-lightest font-sans">
          <div className="bg-white border rounded shadow-md mt-7 p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
            {/* Todo List Heading */}
            <h1 className="text-grey-darkest text-2xl mb-4">Todo List</h1>

            {/* Alerts Below Heading */}
            {alert.message && (
              <div
                className={`p-4 mb-4 font-semibold text-sm rounded-lg ${alert.type === "success"
                  ? "text-green-800 bg-green-50 animate-pulse "
                  : "text-red-800 bg-red-50 animate-pulse "
                  } transition-opacity duration-500 ease-in-out`}
                role="alert"
              >
                {alert.message}
              </div>
            )}

            {/* Input */}
            <div className="flex mt-4">
              <input
                onChange={handleChange}
                value={todo} onKeyDown={handleKeyPress}
                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                placeholder="Add or Update Todo"
              />
              <button
                onClick={handleAdd}
                className="p-2 border-2 rounded text-white bg-teal-950 hover:border-teal-950"
              >
                {updateId ? "Update" : "Add"}
              </button>
            </div>

            {/* Show Completed Todos Checkbox */}
            {/* {hasCompletedTodos && (
              <div className="mt-4">
                <label className="flex items-center gap-2 text-gray-700">
                  <input
                    type="checkbox"
                    onChange={handleShowCompleted}
                    checked={showCompleted}
                  />
                  Show All Completed Todos
                </label>
              </div>
            )} */}
            {hasCompletedTodos && (
              <button

                className="mt-4 p-2 border-2 rounded text-white bg-slate-800 hover:bg-slate-900"
              >
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={handleShowCompleted}
                    checked={showCompleted}
                  />
                  Show All Completed Todos
                </label>
              </button>
            )}

            {todos.length > 0 && (
              <button
                onClick={() => setEmptyTodosPrompt(true)}
                className="mt-4 p-2 border-2 rounded text-white bg-red-600 hover:bg-red-700"
              >
                Empty Todo List
              </button>

            )}
            {/* Empty Todo List Confirmation Prompt */}
            {emptyTodosPrompt && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                <div className="bg-white p-6 rounded shadow-md">
                  <h2 className="text-xl mb-4 font-semibold text-gray-800">
                    Are you sure you want to delete all todos?
                  </h2>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEmptyTodos(true)}
                      className="p-2 px-4 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => handleEmptyTodos(false)}
                      className="p-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Empty Todo Prompt */}
            {showEmptyPrompt && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                <div className="bg-white p-6 rounded shadow-md">
                  <h2 className="text-xl mb-4 font-semibold text-gray-800">
                    Todo cannot be empty, understood?
                  </h2>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEmptyTodoResponse("yes")}
                      className="p-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => handleEmptyTodoResponse("no")}
                      className="p-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                      No
                    </button>
                  </div>
                </div>
                {/* Funny Emoji when "No" is clicked */}
                {clickCount > 0 && (
                  <div className="emoji-container text-4xl ">
                    {Array.from({ length: clickCount }, (_, index) => (
                      <span key={index} role="img" aria-label="emoji" className="">
                        <big className="text-8xl">😜  </big>
                      </span>
                    ))}
                    <br />🖕
                  </div>
                )}
              </div>
            )}

            {/* Todos */}
            {filteredTodos.map((item) => (
              <div
                className="flex mt-4 justify-between items-center gap-2"
                key={item.id}
              >
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={item.isCompleted}
                    onChange={() => handleToggleComplete(item.id)}
                    className="w-4 h-4"
                  />
                  <h3
                    className={
                      item.isCompleted
                        ? "line-through text-gray-500"
                        : ""
                    }
                  >
                    {item.todo}
                  </h3>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="p-2 border-2 rounded text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePrompt(item.id)}
                    className="p-2 border-2 rounded text-white bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Prompt */}
      {deletePrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl mb-4 font-semibold text-gray-800">
              Are you sure you want to delete this todo?
            </h2>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleDelete(true)}
                className="p-2 px-4 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={() => handleDelete(false)}
                className="p-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
