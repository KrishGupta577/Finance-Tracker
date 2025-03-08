import { motion } from 'framer-motion';
import { Edit, Trash2 } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { StoreContext } from "../../Context/StoreContext";
import './UsersList.css';

function UsersList() {
  const { users, transactions, url, refreshUsers } = useContext(StoreContext);

  const token = localStorage.getItem('token')

  const transactionCount = (id) => {
    return transactions
      .filter(transaction => { return transaction.userId == id })
      .length
  }

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="users-container"
    >

      <div className="users-header">
        <h1 className="users-title">User Management</h1>
      </div>
      <div className="users-table-container">
        <table className="users-table">
          <thead className="users-table-header">
            <tr>
              <th className="table-header-cell">Name</th>
              <th className="table-header-cell">Email</th>
              <th className="table-header-cell">Username</th>
              <th className="table-header-cell">Registration Date</th>
              <th className="table-header-cell">Total Transactions</th>
              <th className="table-header-cell">Actions</th>
            </tr>
          </thead>
          <tbody className="users-table-body">
            {users && users.map((user, index) => (
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
                  {user.username}
                </td>
                <td className="table-cell date-cell">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="table-cell status-cell">
                  {transactionCount(user._id)}
                </td>
                <td className="table-cell action-cell">
                  <div className="action-buttons">
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
    </motion.div>
  );
}

export default UsersList;