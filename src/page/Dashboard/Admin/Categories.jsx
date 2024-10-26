import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(2);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter(category =>
    category.categoryName.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Handle delete action
  const handleDelete = async (id) => {
    // console.log(id);
    try {
      await axios.delete(`http://localhost:5000/category/${id}`);
      setCategories(categories.filter(category => category._id !== id));
      toast.success('Delete Category Successfull.');
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="mt-10 p-10">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search categories..."
          className="border p-2 rounded"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">SN#</th>
            <th className="py-2 px-4 border">Category Name</th>
            <th className="py-2 px-4 border">Slug</th>
            {/* <th className="py-2 px-4 border">Description</th> */}
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCategories.length > 0 ? (
            currentCategories.map((category, index) => (
              <tr key={category._id}>
                <td className="py-2 px-4 border">{index + 1 + (currentPage - 1) * categoriesPerPage}</td>
                <td className="py-2 px-4 border">{category.categoryName}</td>
                <td className="py-2 px-4 border">{category.slug}</td>
                {/* <td className="py-2 px-4 border">{category.description}</td> */}
                <td className="py-2 px-4 border flex justify-center">
                  <Link to={category._id}><button className="bg-blue-500 text-white px-4 py-1 rounded mr-2">Edit</button></Link>
                  <button className="bg-red-500 text-white px-4 py-1 rounded" onClick={() => handleDelete(category._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-2 px-4 border text-center">No categories found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center">
        <div className="flex justify-center">
          <button
            className="mx-1 px-3 py-1 border rounded bg-blue-500 text-white"
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            Previous
          </button>
          <div>
            {Array.from({ length: Math.ceil(filteredCategories.length / categoriesPerPage) }, (_, index) => (
              <button
                key={index + 1}
                className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            className="mx-1 px-3 py-1 border rounded bg-blue-500 text-white"
            disabled={currentPage === Math.ceil(filteredCategories.length / categoriesPerPage)}
            onClick={() => paginate(currentPage + 1)}
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
};

export default Categories;
