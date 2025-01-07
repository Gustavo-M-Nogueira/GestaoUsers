import React, { useState } from "react";
import UserList from "./components/userList";
import UserForm from "./components/userForm";
import { addUser, updateUser, deleteUser } from "./services/api";

const App = () => {
  const [editingUser, setEditingUser] = useState(null);

  const handleSave = async (user) => {
    if (user.id) {
      await updateUser(user.id, user);
    } else {
      await addUser(user);
    }
    window.location.reload();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente eliminar este utilizador?")) {
      await deleteUser(id);
      window.location.reload();
    }
  };

  return (
    <div className="container">
      <h1>Gestor de Utilizadores</h1>
      <UserForm onSave={handleSave} initialData={editingUser} />
      <UserList onEdit={setEditingUser} onDelete={handleDelete} />
    </div>
  );
};

export default App;
