# Todo App

Todo App is a simple yet powerful web application that helps users manage their daily tasks efficiently. Built with modern web technologies, it provides features such as adding, editing, filtering, and deleting tasks.

---

## Features

- Add new tasks with due dates.
- Edit existing tasks seamlessly.
- Filter tasks by specific dates or predefined periods like "Last 7 days" or "Last month."
- Delete tasks individually or in bulk.
- Responsive design for desktop and mobile devices.
- Local storage support to save tasks persistently.

---

## Installation and Setup

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or later)
- npm (comes bundled with Node.js)

### Steps to Set Up

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd Todo-App
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Application:**
   ```bash
   npm run dev
   ```

4. **Access the Application:**
   Open your browser and navigate to `http://localhost:5173`.

---

## Project Structure

```
Todo App/
├── public/
│   ├── icon.ico               # App icon
│   ├── vite.svg               # Vite logo
├── src/
│   ├── assets/                # Static assets
│   │   ├── close.png
│   │   ├── react.svg
│   │   ├── undraw_no-data_ig65.svg
│   │   ├── undraw_search_vimp.svg
│   │   └── undraw_searching_no1g.svg
│   ├── App.css                # App-wide styles
│   ├── App.jsx                # Main app component
│   ├── Card.css               # Styling for task cards
│   ├── Card.jsx               # Task card component
│   ├── Checkbox.jsx           # Checkbox filter component
│   ├── Chip.jsx               # Chips for applied filters
│   ├── DeleteAllTodos.jsx     # Component for bulk task deletion
│   ├── DeleteCard.jsx         # Popup for task deletion
│   ├── DisplayList.jsx        # List component for filtered tasks
│   ├── main.jsx               # App entry point
│   ├── NoData.jsx             # Component for "No tasks found" UI
│   ├── SearchBar.jsx          # Search bar component
│   ├── SearchDialog.jsx       # Dialog for searching tasks
│   ├── time.js                # Utility functions for time and date formatting
├── .gitignore                 # Files to be ignored by Git
├── index.html                 # App entry HTML
├── package.json               # Project metadata and dependencies
├── package-lock.json          # Dependency lock file
└── vite.config.js             # Vite configuration
```

---

## Dependencies

The project uses the following libraries:

- **React**: UI library for building user interfaces.
- **Material-UI**: Components for building responsive designs.
- **React-Datepicker**: A lightweight date picker component.
- **React-Icons**: A library of SVG icons.
- **Vite**: Build tool for faster development and optimized production builds.

Install all dependencies using:
```bash
npm install
```

---

## GIF Demonstrations

Below are some demonstrations of the application's functionality:

1. **Creating and Editing Todos:**
   ![Creating and Editing Todos](gifs/Creating%20and%20Editing%20Todos.gif)

2. **Delete Todos:**
   ![Delete Todos](gifs/Delete%20Todos.gif)

3. **Search Todos:**
   ![Search Todos](gifs/Search%20Todos.gif)

4. **Applying Filters:**
   ![Applying Filters](gifs/Applying%20Filters.gif)

---

## How to Use the Application

1. **Add a Task:**
   - Click on the "Add" button (floating action button).
   - Enter the task details in the popup and hit "Add."

2. **Filter Tasks:**
   - Use the filter options like "Today" or "Last 7 days."
   - Apply date filters using the date picker.

3. **Edit or Delete Tasks:**
   - Click on a task card to edit or delete the task.

4. **Delete All Tasks:**
   - Use the "Delete all" option for clearing the entire list of tasks.

---

## Future Enhancements

- Add user authentication for saving tasks across devices.
- Implement a cloud database for centralized task storage.
- Add notifications for task reminders.

---

## License

This project is licensed under the MIT License. Feel free to use and contribute.

