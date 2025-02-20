import React from "react";
import { Pencil, Plus, Trash2, View } from "lucide-react";

const Table = ({ totals, books, setShowAddForm, setViewItem, setObjId, setEditItem, setDeleteItem, setObj }) => {
  const handleViewItem = (item) => {
    setObjId(item._id);
    setViewItem(true);
  };
  const handleEditItem = (item) => {
    setObjId(item._id);
    setEditItem(true);
  };
  const handleDeleteItem = (item) => {
    setObjId(item._id);
    setDeleteItem(true);
  };
  return (
    <>
      <div className="h-15 flex items-center my-2">
        <h1 className="text-lg w-full font-semibold font-mono">
          Books Available : {totals}
        </h1>
        <div className="w-full flex justify-end mr-5">
          <button
            onClick={() => setShowAddForm(true)}
            className="p-2 w-[11rem] border-2 font-mono border-gray-400 rounded-xl flex items-center justify-between 
        bg-white shadow-lg hover:bg-black hover:text-white hover:border-black transition-colors duration-200 
        text-gray-700 font-medium cursor-pointer"
          >
            <Plus className="mr-2" /> Add Product
          </button>
        </div>
      </div>
      <div className="bg-white rounded-[20px] h-[57vh] shadow-lg border border-gray-200 px-5 pb-5 overflow-y-auto">
        <table className="w-full mt-8 border-collapse rounded-table border border-gray-200">
          <thead>
            <tr className="bg-gray-100 font-mono text-[15px]">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Author</th>
              <th className="p-3 text-left">Genre</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Published Year</th>
              <th className="p-3 text-left">Rating</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((item, index) => (
              <tr
                key={item._id}
                className={`
              ${index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              hover:bg-gray-100 transition-colors duration-200
            `}
              >
                <td className="py-5 px-2">{item.title}</td>
                <td className="py-5 px-2">{item.author}</td>
                <td className="py-5 px-2">{item.genres.join(", ")}</td>
                <td className="py-5 px-2">
                  {item.description.slice(0, 20)}...
                </td>
                <td className="py-5 px-2">{item.publishedYear}</td>
                <td className="py-5 px-2">{item.rating}</td>

                <td className="p-3 text-center">
                  <button
                    onClick={() => {
                      handleViewItem(item);
                    }}
                    className="mr-2 text-green-500 hover:text-green-700"
                  >
                    <View size={20} />
                  </button>
                  <button
                    onClick={() => {
                      handleEditItem(item);
                    }}
                    className="mr-2 text-blue-500 hover:text-blue-700"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                  onClick={() => {
                    handleDeleteItem(item);
                  }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
