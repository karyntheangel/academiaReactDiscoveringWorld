import React, { createContext, useState, useEffect } from "react";
import { set } from "react-hook-form";
export const DataContext = createContext();

const contentDefault = [
  {
    id: 0,
    tittle: "",
    category: "",
    description: "",
    imgUrl: "",
    comments: [
      {
        id: 0,
        comment: "",
        author: "",
      },
    ],
  },
];

const axios = require("axios");

const useFetch = (url, data, setData) => {
  useEffect(() => {
    axios
      .get(url)
      .then(function (response) {
        // manejar respuesta exitosa
        setData(response.data);
      })
      .catch(function (error) {
        // manejar error
        console.log(error);
      });
  }, [url]);

  return data;
};

const deleteHandler = (id, setData, data) => {
  var answer = window.confirm("Delete post?");
  answer === true &&
    axios
      .delete(`http://localhost:3001/posts/${id}`)
      .then(function (response) {
        response.status === 200 &&
          setData(data.filter((data) => data.id != id));
      })
      .catch(function (error) {
        // manejar error
        console.log(error);
      });
};

const myHandlerSubmit = (entry, data, setData, setShowModal, selEntry) => {
  const metod = selEntry.id ? "put" : "post";
  const urlSufix = selEntry.id ? `/${selEntry.id}` : "";
  var answer = window.confirm("Save post?");
  answer === true &&
    axios({
      method: metod,
      url: `http://localhost:3001/posts${urlSufix}`,
      data: entry,
    })
      .then(function (response) {
        response.status === 200
          ? (() => {
              entry.id = selEntry.id;
              let indexFinded = 0;
              data.find((_entry, index) => {
                indexFinded = index;
                return _entry.id === entry.id;
              });
              data.splice(indexFinded, 1, entry);
              setData([...data]);
            })()
          : setData([...data, response.data]);

        setShowModal(false);
      })
      .catch(function (error) {
        // manejar error
        console.log(error);
      });
};

const categoryArray = ["Travel", "Lifestyle", "Business", "Food", "Work"];

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(contentDefault);
  const [category, setCategory] = useState("");
  const [selEntry, setSelEntry] = useState({});
  const [showModal, setShowModal] = useState(false);

  const URL = "http://localhost:3001/posts";
  useFetch(URL, data, setData);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        category,
        setCategory,
        categoryArray,
        selEntry,
        setSelEntry,
        showModal,
        setShowModal,
        deleteHandler,
        myHandlerSubmit,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
