import React, { useState, useEffect } from 'react';
import './UserManagementStyle.css';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost/backend/getUser.php');
      const data = await response.json();
      if (data.success) {
        setUsers(data.data);
      } else {
        setError(data.message || 'Failed to fetch users');
      }
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    const dataToSend = {
      user_id: selectedUser.user_id,
      username: updatedData.username || selectedUser.username,
      email: updatedData.email || selectedUser.email,
      phone: updatedData.phone || selectedUser.phone,
      address: updatedData.address || selectedUser.address,
      bio: updatedData.bio || selectedUser.bio,
      password: updatedData.password || selectedUser.password,
      role: updatedData.role || selectedUser.role,
      profile_img: updatedData.profile_img || selectedUser.profile_img,
    };

    try {
      const response = await fetch('http://localhost/backend/updateUser.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        alert('Error updating user: ' + text);
        return;
      }

      if (data.success) {
        alert('User updated successfully!');
        setShowUpdateForm(false);
        setUpdatedData({});
        setSelectedUser(null);
        fetchUsers();
      } else {
        alert('Error updating user: ' + data.message);
      }
    } catch (err) {
      alert('Error updating user');
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost/backend/deleteUser.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: userId }),
        });

        const data = await response.json();
        if (data.success) {
          alert('User deleted successfully!');
          fetchUsers();
        } else {
          alert('Error deleting user');
        }
      } catch (err) {
        alert('Error deleting user');
      }
    }
  };

  return (
    <div className="user-table-container">
      <h2>User List</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          {/* Modal: Update Form */}
          {showUpdateForm && selectedUser && (
            <div className="modal-overlay">
              <div className="update-form-modal">
                <h3>Update User</h3>
                <form onSubmit={handleUpdateSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Username:</label>
                      <input
                        type="text"
                        name="username"
                        value={updatedData.username || selectedUser.username || ''}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email:</label>
                      <input
                        type="email"
                        name="email"
                        value={updatedData.email || selectedUser.email || ''}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone:</label>
                      <input
                        type="tel"
                        name="phone"
                        value={updatedData.phone || selectedUser.phone || ''}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Address:</label>
                      <input
                        type="text"
                        name="address"
                        value={updatedData.address || selectedUser.address || ''}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Bio:</label>
                      <textarea
                        name="bio"
                        value={updatedData.bio || selectedUser.bio || ''}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label>Profile Image:</label>
                      <input
                        type="file"
                        name="profile_img"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setUpdatedData((prev) => ({
                                ...prev,
                                profile_img: reader.result.split(',')[1],
                              }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </div>
                  </div>

                  <button type="submit">Update User</button>
                  <button type="button" onClick={() => setShowUpdateForm(false)}>
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* User Table */}
          <table className="user-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Bio</th>
                <th>Profile Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.user_id}>
                  <td>{user.user_id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <td>{user.bio}</td>
                  <td>
                    {user.profile_img ? (
                      <img
                        src={`data:image/jpeg;base64,${user.profile_img}`}
                        alt={`${user.username}'s profile`}
                        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setShowUpdateForm(true);
                      }}
                    >
                      Update
                    </button>
                    <button onClick={() => handleDeleteUser(user.user_id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default UserTable;
