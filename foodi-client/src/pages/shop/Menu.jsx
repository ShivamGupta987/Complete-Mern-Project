import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import { FaFilter } from "react-icons/fa";

const Menu = () => {
  // uses array in usestate for menu.json file is array file
  const [menu, setMenu] = useState([]);
  // const [salad, setSalad] = useState([]);
  // const [pizza, setPizza] = useState([]);

  const [filteredItems, setFilteredItems] = useState([]);

  // by default select all

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");

  // by default page is 1

  const [currentPage, setCurrentPage] = useState(1);
  // items per page default is 6
  const [itemsPerPage] = useState(6);

  //loading data

  // useEffect(() => {
  //   // data fetched from backend
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:6001/menu");
  //       const data = await response.json();
  //       // Ensure data is an array
  //       if (!Array.isArray(data)) {
  //         console.error("Fetched data is not an array", data);
  //         data = []; // Default to an empty array if data is not as expected
  //       }
  //       setMenu(data);
  //       setFilteredItems(data);
  //     } catch (error) {
  //       console.log("Error while fetch data", error);
  //     }
  //   };
  
  //   fetchData(); // Call fetchData here
  // }, []);
  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:6001/menu");
        const data = await response.json();
        setMenu(data);
        setFilteredItems(data); // Initially, display all items
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // filtering function our data category se

  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);
  
    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };
  

  // show all data function
  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  // sorting krrehe based on A-z ,z-a , hight to low ,low to high

  const handleSort = (option) => {
    setSortOption(option);

    let sortedItems = [...filteredItems]; // spread ...

    // logic likhenge

    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;

      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;

      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;

      default:
        break;
    }

    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  // pagination logic likhenge

  const indexOfLastItem = currentPage * itemsPerPage;

  const indexofFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredItems.slice(indexofFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Menu banner */}
      <div className="max-w-screen-2xl container  mx-auto xl:px-24   bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-48 flex flex-col md:flex-row-reverse justify-center items-center gap-8">
          {/* Texts */}
          <div className=" space-y-7 px-4 text-center">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              For the Love of Delicious
              <span className="text-green"> Food</span>
            </h2>
            <p className="text-xl md:w-4/5 mx-auto text-[#4A4A4A]">
              Come with family & feel the joy of mouthwatering food such as
              Greek Salad,Lasange,Butternut ,Pumpkin,Wgyu,Olivas Relieans and
              more for a moderate cost.
            </p>
            <button className="bten bg-green px-8 py-3 font-semibold text-white rounded-full hover:bg-slate-500 ">
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* menu shop section */}

      <div className="section-container">
        {/*filter  btns and sorting */}

        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb:8">
          {/* all categories btns  */}
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
            <button
              onClick={showAll}
              className={selectedCategory === "all" ? "active" : ""}
            >
              All
            </button>
            <button
              onClick={() => filterItems("salad")}
              className={selectedCategory === "salad" ? "active" : ""}
            >
              Salad
            </button>
            <button
              onClick={() => filterItems("pizza")}
              className={selectedCategory === "pizza" ? "active" : ""}
            >
              Pizza
            </button>
            <button
              onClick={() => filterItems("soup")}
              className={selectedCategory === "soup" ? "active" : ""}
            >
              Soups
            </button>
            <button
              onClick={() => filterItems("dessert")}
              className={selectedCategory === "dessert" ? "active" : ""}
            >
              Dessert
            </button>
            <button onClick={() => filterItems("drinks")}>Drinks</button>
          </div>

          {/* sorting filter */}
          <div>
            <div className="flex justify-end mb-4 rounded-sm">
              <div className="bg-black p-2">
                <FaFilter className="h-4 w-4 text-white" />
              </div>

              {/* sorting options */}
              <select
                name="sort"
                id="sort"
                onChange={(e) => handleSort(e.target.value)}
                value={sortOption}
                className="bg-black text-white px2 py-1 rounded-sm"
              >
                <option value="default">Default</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="low-to-high">low-to-high</option>
                <option value="high-to-low">high-to-low</option>
              </select>
            </div>
          </div>
        </div>

        {/* products card */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {/* item liye id se */}
          {currentItems.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      </div>

      {/* pagination section */}

      <div className="flex justify-center my-8">
        {Array.from({
          length: Math.ceil(filteredItems.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1 ? "bg-green text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
