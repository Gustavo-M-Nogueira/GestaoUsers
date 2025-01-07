const UserItem = ({ user, onEdit, onDelete }) => {
    return (
      <tr>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
          <button className="btn btn-warning" onClick={() => onEdit(user)}>
            Editar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => onDelete(user.id)}
          >
            Eliminar
          </button>
        </td>
      </tr>
    );
  };
  
  export default UserItem;
  