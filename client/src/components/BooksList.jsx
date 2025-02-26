import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchFilter from "./Search/SearchFilter";
import SortDropdown from "./Sort/SortDropDown";
import Genre from "./Genre/Genre";
import Pagination from "./Pagination/Pagination";
import EditItem from "./modals/EditItem";
import DeleteItem from "./modals/DeleteItem";
import AddItem from "./modals/AddItem";
import ViewItem from './modals/ViewItem';
import toast, { Toaster } from "react-hot-toast";
import Table from "./Table/Table";

const base_url = import.meta.env.VITE_API_URL;


const BooksList = () => {
  const [obj, setObj] = useState({});
  const [sort, setSort] = useState({ sort: "rating", order: "desc" });
  const [filterGenre, setFilterGenre] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [showAddForm, setShowAddForm] = useState(false);
  const [viewItem, setViewItem] = useState(false);
  const [editItem, setEditItem] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);

  const [objId, setObjId] = useState("")
  // console.log(objId)

  const closeModal = () => {
    setShowAddForm(false);
    setEditItem(false);
    setDeleteItem(false);
    setViewItem(false);
  };

  console.log(import.meta.env.VITE_API_URL);

  useEffect(() => {
    let timeout;
   
    const getAllBooks = async () => {
      try {
        const url = `${base_url}?page=${page}&sort=${sort.sort},${
          sort.order
        }&genre=${filterGenre.toString()}&search=${search}`;
        const { data } = await axios.get(url);
        setLoading(true)
        setObj(data);
        console.log(data);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch books. Please try again.");
        toast.error("Failed to load books!");
      }finally{
        setUpdate(false)
        setLoading(false)
      }
    };

    timeout = setTimeout(() => {
      getAllBooks();
    }, 500);
    return () => clearTimeout(timeout);

  }, [sort, filterGenre, page, search, update]);

  const sortOptions = [
    { key: "rating", label: "Rating" },
    { key: "title", label: "Title" },
  ];
  return (
    <>
    <Toaster/>
    <div className="w-full relative">
      {loading && <p>Loading recommendations...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="h-[65rem] bg-[#f1f3f4] m-2 rounded-[20px] p-4 sm:p-10">
        <div className="h-15 flex b-0 items-center gap-5">
          <h1 className="font-bold text-4xl mb-4">Books Collections</h1>
        </div>

        <div className="flex flex-col w-full h-60 bg-white rounded-[20px] p-5 shadow-md gap-2">
          <SearchFilter
            search={search}
            onSearchChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex justify-between">
            <Genre
              filterGenre={filterGenre}
              genres={obj.genres ? obj.genres : []}
              setFilterGenre={(genre) => setFilterGenre(genre)}
              setPage={setPage}
            />

            <SortDropdown sort={sort} setSort={(sort) => setSort(sort)} />
          </div>
        </div>

        <Table
          books={obj.books ? obj.books : []}
          totals={obj.total}
          setShowAddForm={setShowAddForm}
          setObjId = {setObjId}
          setObj={setObj}
          setViewItem={setViewItem}
          setEditItem={setEditItem}
          setDeleteItem = {setDeleteItem}
        />
        <Pagination
          page={page}
          limit={obj.limit ? obj.limit : 0}
          total={obj.total ? obj.total : 0}
          setPage={(page) => setPage(page)}
        />
      </div>
      {(showAddForm || editItem || deleteItem || viewItem) && (
        <div
          className="fixed inset-0 bg-black/5 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 shadow-lg"
          onClick={closeModal}
        >
          <div
            className="bg-white p-10 rounded-lg shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {showAddForm && <AddItem onClose={closeModal} />}

            {editItem && <EditItem onClose={closeModal} objId={objId} setUpdate={setUpdate}/>}

            {deleteItem && <DeleteItem onClose={closeModal} objId={objId} setUpdate={setUpdate}/>}

            {viewItem && <ViewItem onClose={closeModal} objId={objId}/>}


          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default BooksList;
