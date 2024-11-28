import React, { useEffect, useState } from 'react';
import './MenuManagement.css';

const MenuManagement = () => {
  const [menuSections, setMenuSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchMenuSections = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost/backend/ManageMenu.php?page=${page}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      if (data.success) {
        setMenuSections(data.data);
        setTotalPages(data.totalPages);
      } else {
        setError(data.message || 'Failed to fetch menu sections');
      }
    } catch (err) {
      setError(`Error fetching data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuSections(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost/backend/DeleteMenuItem.php?id=${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        alert('Item deleted successfully');
        fetchMenuSections(currentPage); // Refresh the list
      } else {
        alert(result.message || 'Failed to delete item');
      }
    } catch (err) {
      alert('Error deleting item: ' + err.message);
    }
  };

  const openUpdateModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/backend/UpdateMenuItem.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedItem),
      });

      const result = await response.json();
      if (result.success) {
        alert('Item updated successfully');
        closeModal();
        fetchMenuSections(currentPage); // Refresh the list
      } else {
        alert(result.message || 'Failed to update item');
      }
    } catch (err) {
      alert('Error updating item: ' + err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedItem({ ...selectedItem, [name]: value });
  };

  if (loading) return <div className="menu-container">Loading...</div>;
  if (error) return <div className="menu-container">{error}</div>;

  return (
    <div className="menu-container">
      <h1>Menu Sections</h1>
      <table className="menu-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Food Type</th>
            <th>Food Category</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Vegan</th>
            <th>Rating</th>
            <th>Time</th>
            <th>Product Image</th>
            <th>Offers</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuSections.map((section) => (
            <tr key={section.Id}>
              <td>{section.Id}</td>
              <td>{section.FoodType}</td>
              <td>{section.food_category}</td>
              <td>{section.name}</td>
              <td>{section.description}</td>
              <td>{section.price}</td>
              <td>{section.vegan ? 'Yes' : 'No'}</td>
              <td>{section.rating}</td>
              <td>{section.time}</td>
              <td>
                {section.product_image ? (
                  <img
                    src={`data:image/jpeg;base64,${section.product_image}`}
                    alt="Product"
                    className="product-image"
                  />
                ) : (
                  'No Image'
                )}
              </td>
              <td>{section.Offers ? 'Yes' : 'No'}</td>
              <td>{section.quantity}</td>
              <td>
                <button
                  className="action-button delete-button"
                  onClick={() => handleDelete(section.Id)}
                >
                  Delete
                </button>
                <button
                  className="action-button update-button"
                  onClick={() => openUpdateModal(section)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-buttons">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
          Next
        </button>
      </div>


{showModal && selectedItem && (
  <div className="modal">
      <h2>Update Menu Item</h2>
    <div className="modal-content">
      <form onSubmit={handleUpdate}>
        {/* First Row */}
        <div className="form-row">
          <label>
            Food Type:
            <input
              type="text"
              name="FoodType"
              value={selectedItem.FoodType}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Food Category:
            <input
              type="text"
              name="food_category"
              value={selectedItem.food_category}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Name:
            <input
              type="text"
              name="name"
              value={selectedItem.name}
              onChange={handleInputChange}
            />
          </label>
        </div>

        {/* Second Row */}
        <div className="form-row">
         
          <label>
            Description:
            <textarea
              name="description"
              value={selectedItem.description}
              onChange={handleInputChange}
            ></textarea>
          </label>
       
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={selectedItem.price}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Vegan:
            <select
              name="vegan"
              value={selectedItem.vegan}
              onChange={handleInputChange}
            >
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </label>
        </div>

        {/* Fourth Row */}
        <div className="form-row">
          <label>
            Rating:
            <input
              type="number"
              step="0.1"
              name="rating"
              value={selectedItem.rating}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Time:
            <input
              type="time"
              name="time"
              value={selectedItem.time}
              onChange={handleInputChange}
            />
          </label>
       
          <label>
            Offers:
            <select
              name="Offers"
              value={selectedItem.Offers}
              onChange={handleInputChange}
            >
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </label>


        </div>

        {/* Product Image Upload */}
        <div className="form-row">


        <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              value={selectedItem.quantity}
              onChange={handleInputChange}
            />
          </label>


          <label>
            Product Image:
            <input
              type="file"
              name="product_image"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setSelectedItem({ ...selectedItem, product_image: reader.result });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>
          {selectedItem.product_image && (
            <img
              src={`data:image/jpeg;base64,${selectedItem.product_image}`}
              alt="Preview"
              className="image-preview"
            />
          )}
        </div>

        <div className="form-row">
          <button type="submit" className="action-button update-button">
            Save
          </button>
          <button
            type="button"
            className="action-button delete-button"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default MenuManagement;
