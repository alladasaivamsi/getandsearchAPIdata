import React, { useEffect, useState } from "react";

const URL = "https://dummyjson.com/products";
const APIData = () => {
  const [name, setName] = useState("");
  const [user, setUser] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [value, setValue] = useState("");

  const handleFilter = (e) => {
    e.preventDefault();
    if (name !== "") {
      const result = filterData.filter((item) =>
        item.title.toLowerCase().includes(name)
      );
      setUser(result);
      setValue("");
      if (result.length === 0) {
        setValue(<h1>Data Not Found!</h1>);
      }
    } else {
      setValue(<h1>Please enter the data...</h1>);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      console.log(data.products);
      setFilterData(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <input
          type="text"
          placeholder="Search the data"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleFilter}>Search</button>
      </div>
      <ul>
        {name !== "" &&
          user &&
          user.map((item) => (
            <li key={item.id}>
              <img src={item.images[0]} />
              <div className="details">
                <span>Title : {item.title}</span>
                <span>Description : {item.description}</span>
                <span>Category : {item.category}</span>
                <span>Price : Rs {item.price} /-</span>
                <span>Rating : {item.rating}</span>
              </div>
            </li>
          ))}
        {value}
      </ul>
    </>
  );
};

export default APIData;
