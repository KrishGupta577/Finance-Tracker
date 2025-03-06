import { motion } from 'framer-motion';
import { Edit, Trash2, UserCheck, UserX } from 'lucide-react';
import { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import axios from 'axios';
import { StoreContext } from "../../../context/StoreContext";
import './UsersList.css'; 

function UsersList() {
  const { register, watch, handleSubmit, formState: { errors } } = useForm();
  const { url, token, users, refreshUsers } = useContext(StoreContext); 
  const [showAddUser, setShowAddUser] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const sortBy = watch('sortBy');
  const sortOrder = watch('sortOrder');

  const sortedUsers = () => {
    const sortedData = [...users]; 
    if (sortBy && sortOrder) {
      sortedData.sort((a, b) => {
        const fieldA = a[sortBy];
        const fieldB = b[sortBy];

        if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
        if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortedData;
  };

  const handleUserDelete = async (id) => {
    try {
      const response = await axios.post(url + "/api/user/delete", { id }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        refreshUsers();
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete user");
    }
  };

  const handleToggleUserStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      const response = await axios.post(
        url + "/api/user/updateStatus", 
        { id, status: newStatus }, 
        { headers: { token } }
      );
      
      if (response.data.success) {
        toast.success(`User ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
        refreshUsers();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update user status");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="users-container"
    >
      {showAddUser && <AddUser setShowAddUser={setShowAddUser} />}

      <div className="users-header">
        <h1 className="users-title">User Management</h1>
        <div className="sort-controls">
          <div className="sort-group">
            <label htmlFor="sortBy" className="sort-label">
              Sort by:
            </label>
            <select
              id="sortBy"
              name='sortBy' 
              {...register('sortBy')}
              className="sort-select"
            >
              <option value="createdAt">Registration Date</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="role">Role</option>
              <option value="status">Status</option>
            </select>
          </div>
          <div className="sort-group">
            <label htmlFor="sortOrder" className="sort-label">
              Order:
            </label>
            <select
              id="sortOrder"
              name='sortOrder'  
              {...register('sortOrder')}
              className="sort-select"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
        <button className="add-user-button" onClick={() => setShowAddUser(true)}>
          Add User
        </button>
      </div>
      <div className="users-table-container">
        <div className="users-table-wrapper">
          <table className="users-table">
            <thead className="users-table-header">
              <tr>
                <th className="table-header-cell">Name</th>
                <th className="table-header-cell">Email</th>
                <th className="table-header-cell">Role</th>
                <th className="table-header-cell">Registration Date</th>
                <th className="table-header-cell">Status</th>
                <th className="table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody className="users-table-body">
              {sortedUsers().map((user, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ backgroundColor: '#F9FAFB' }}
                  className="user-row"
                >
                  <td className="table-cell name-cell">
                    {user.name}
                  </td>
                  <td className="table-cell email-cell">
                    {user.email}
                  </td>
                  <td className="table-cell role-cell">
                    <span className={`role-badge ${user.role.toLowerCase()}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="table-cell date-cell">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="table-cell status-cell">
                    <span className={`status-badge ${user.status.toLowerCase()}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="table-cell action-cell">
                    <div className="action-buttons">
                      <button
                        className="status-button"
                        onClick={() => handleToggleUserStatus(user._id, user.status)}
                        title={user.status === 'active' ? "Deactivate user" : "Activate user"}
                      >
                        {user.status === 'active' ? (
                          <UserX size={16} className="deactivate-icon" />
                        ) : (
                          <UserCheck size={16} className="activate-icon" />
                        )}
                      </button>
                      <button
                        className="edit-button"
                        onClick={() => setEditUserId(user._id)}
                        title="Edit user"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleUserDelete(user._id)}
                        title="Delete user"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {editUserId && (
        <EditUser
          setShowEditUser={() => setEditUserId(null)}
          id={editUserId}
        />
      )}
    </motion.div>
  );
}

export default UsersList;