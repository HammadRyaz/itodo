![HAMMAD RIAZ](https://raw.githubusercontent.com/HammadRyaz/wonrd__counter/refs/heads/gh-pages/site-logo-white.png "HAMMAD RIAZ")
## -----------[https://hammadryaz.github.io/itodo/](https://hammadryaz.github.io/itodo/)------------

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Todo List Application

This is a simple and interactive Todo List application built with React. The app allows users to add, `edit`, `delete`, and mark `todos as completed`. It features `local storage integration `to persist todos across page reloads.

## Features
- **Add and Update Todos**: Add new todos and edit existing ones.
- **Delete Todos**: Delete individual todos with a confirmation prompt.
- **Show Completed Todos**: Filter and view only completed todos.
- **Local Storage Integration**: Todos are saved in local storage to persist between sessions.
- **Alerts and Prompts**: Informative alerts for actions like add, edit, and delete.
- **Fun Emoji Interaction**: After trying to add an empty todo, an emoji prompt appears.

## Technologies Used
- React + Vite (for building the user interface)
- Tailwind CSS (for styling)
- UUID (for generating unique IDs for todos)
- LocalStorage (for saving todos across sessions)

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/todo-list.git
2. Navigate into the project directory:

	```bash
	cd todo-list
	Install dependencies:
	```
	```bash
	npm install
	Start the application:
	```
	```bash
	Copy code
	npm start 
	```
## Usage
- `Add Todo:` Type your todo in the input field and click the "Add" button.
- `Edit Todo:` Click the "Edit" button next to a todo to modify it.
- `Complete Todo:` Mark a todo as completed by clicking the checkbox next to it.
- `Delete Todo:` Click the "Delete" button to remove a todo with confirmation.
- `View Completed Todos:` Use the "Show All Completed Todos" checkbox to filter completed tasks.
- `Empty Todo List:` Clear the entire todo list with the "Empty Todo List" button.
## Notes
- This application stores todos locally in the browser using localStorage, so they will persist even after a page reload.
- Todos are identified by unique IDs generated using the uuid package.
- Empty todos cannot be added, and a prompt will appear if the user tries to do so.

## -----------[https://hammadryaz.github.io/itodo/](https://hammadryaz.github.io/itodo/)------------
