import React, { useEffect, useState } from "react";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", image: "" });

  // Fetch all users 
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/user/get");
      const data = await res.json();
      if (res.ok && data.users) {
        setUsers(data.users);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // handle delete user 
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/user/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        // alert("User deleted");
        fetchUsers();
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Handle open edit modal
  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, image: user.image });
  };

  // Handle update input changes
 const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === "image") {
    setFormData((prev) => ({ ...prev, image: files[0] }));
  } else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
};

const handleUpdate = async (e) => {
  e.preventDefault();
  // e.target.preventDefault();
  const {name, email, image} = formData;
  
  

  const formDataToSend = new FormData();
  formDataToSend.append("name", name);
  formDataToSend.append("email", email);


  if (formData.image instanceof File) {
    formDataToSend.append("image", image);
  }

  try {
    const res = await fetch(
      `http://localhost:5000/api/user/update/${editingUser._id}`,
      {
        method: "PUT",
        body: formDataToSend, // no headers here, browser sets them automatically
      }
    );

    if (res.ok) {
      alert("User updated");
      setEditingUser(null);
      fetchUsers();
    } else {
      console.error("Update failed:", await res.json());
    }
  } catch (err) {
    console.error("Update error:", err);
  }
};

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        User List
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No users found 
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                   <td className="py-3 px-4">
                    <img
                      src={user.image}
                      alt="User"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                 
                  <td className="py-3 px-4 space-x-2">
                    <button
                      onClick={() => openEditModal(user)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit User Popup */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => setEditingUser(null)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">Edit User</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image URL
                </label>
              <input
  id="image"
  type="file"
  name="image"
  onChange={handleChange}
  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
/>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}
   
    </div>
  );
}
