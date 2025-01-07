import React, { useState } from "react";

const UserForm = ({ onSave, initialData }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Preencha todos os campos!");
      return;
    }
    onSave({ id: initialData?.id, name, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Nome:</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Email:</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Salvar
      </button>
    </form>
  );
};

export default UserForm;
