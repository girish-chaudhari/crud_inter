import React, { useEffect, useState } from "react";
import { searchShopData } from "./_data";

const SearchData = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isInStock, setIsInStock] = useState(false);
  const [checkedTable, setCheckedTable] = useState([]);
  const [snapshot, setSnapshot] = useState([]);

  const handleSearch = (e) => {
    const searchContent = e.target.value;
    setSearchValue(searchContent);
    if (isInStock) {
      let a = [...checkedTable];
      let findData = a.filter((item) => item.qty != 0 && item.qty >= 0);
      setSnapshot([...findData]);
    } else {
      if (e.target.value == "") {
        setSnapshot([...searchShopData]);
      }
    }
  };

  const searchData = () => {
    if (isInStock) {
      let a = [...checkedTable];
      let findData = a.filter((item) => item.category == searchValue);
      setSnapshot([...findData]);
    } else {
      let a = [...searchShopData];
      console.log(a);
      let findData = a.filter((item) => item.category == searchValue);
      console.log("findData", findData);
      setSnapshot([...findData]);
    }
  };

  function handleCheck(e) {
    setSearchValue("");
    let ischecked = e.target.checked;
    setIsInStock(ischecked);
    let a = [...searchShopData];
    console.log("isstock available", isInStock);
    let findData = a.filter((item) => item.qty != 0 && item.qty >= 0);
    if (ischecked) {
      setSnapshot([...findData]);
      setCheckedTable([...findData]);
    } else {
      setSnapshot([...searchShopData]);
    }
  }
  useEffect(() => {
    setSnapshot(searchShopData);
  }, []);

  return (
    <div>
      <div className="main-content">
        <div className="form-content">
          <div>
            <input
              value={searchValue}
              onChange={handleSearch}
              type="text"
              className="form-control"
            />
            <button className="search" onClick={searchData}>
              Search
            </button>
          </div>
          <div>
            <input
              type="checkbox"
              name="stock"
              id="stock"
              onChange={handleCheck}
            />
            <label htmlFor="stock">Only show product item in stock</label>
          </div>
        </div>
        <div className="table-view">
          <div className="header">
            <div>Name</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Category</div>
          </div>

          {snapshot &&
            snapshot.map((item, i) => (
              <div className="table-body" key={i}>
                {/* <div className="table-cat"></div> */}
                <div className="table-cell">
                  <div>{item?.name}</div>
                  <div>{item?.price}</div>
                  <div>{item?.qty}</div>
                  <div>{item?.category}</div>
                  {/* <div>{item.cart ? "Added in cart" : "in Stock"}</div> */}
                </div>
              </div>
            ))}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default SearchData;
