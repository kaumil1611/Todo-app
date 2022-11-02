import React, { useState, useEffect } from "react";
import "./Todo.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getLocalItmes = () => {
  let list = localStorage.getItem("lists");
  console.log(list);

  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItmes());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const addItem = () => {
    if (!inputData) {
      alert("plzz fill data");
    } else if (inputData && !toggleSubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setToggleSubmit(true);

      setInputData("");

      setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
        status: false,
      };
      setItems([...items, allInputData]);
      setInputData("");
    }
  };

  const cancelUpdateDelete = (id, idx) => {
    let item = items.find((elem) => {
      return elem.id === id;
    });
    const list = [...items];

    list[idx]["status"] = !item.status;
    setItems(list);
    if (item.status === true) {
      toast.error("You can not edit or remove item !", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const deleteItem = (index) => {
    const updateditems = items.filter((elem) => {
      return index !== elem.id;
    });

    setItems(updateditems);
  };

  const editItem = (id) => {
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    // console.log(newEditItem);

    setToggleSubmit(false);

    setInputData(newEditItem.name);

    setIsEditItem(id);
  };

  const removeAll = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  return (
    <div className="mainDiv">
      <div className="addItems">
        <input
          type="text"
          placeholder="please enter item"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        {toggleSubmit ? (
          <i
            className="fa fa-plus add-btn"
            title="Add Item"
            onClick={addItem}
          ></i>
        ) : (
          <i
            className="far fa-edit add-btn"
            title="Update Item"
            onClick={addItem}
          ></i>
        )}
      </div>

      <div className="showItems">
        {items.map((elem, idx) => {
          return (
            <div className="eachItem" key={idx}>
              <h3 onClick={() => cancelUpdateDelete(elem.id, idx)}>
                <span
                  style={{
                    textDecoration: elem?.status ? "line-through" : "none",
                  }}
                >
                  {elem.name}
                </span>
              </h3>
              {elem.status === false ? (
                <div className="todo-btn">
                  <i
                    className="far fa-edit add-btn"
                    title="Edit Item"
                    onClick={() => editItem(elem.id)}
                  ></i>
                  <i
                    className="far fa-trash-alt add-btn"
                    title="Delete Item"
                    onClick={() => deleteItem(elem.id)}
                  ></i>
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>

      <div className="removeALl">
        <button className="btn" onClick={removeAll}>
          Remove All
        </button>
      </div>
    </div>
  );
};

export default Todo;
