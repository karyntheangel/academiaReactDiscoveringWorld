import React, { createContext, useState, useEffect } from "react";
export const DataContext = createContext();

const contentDefault = [
  {
    id: 0,
    title: "",
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
  }, []);

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
  let metod = "post";
  let urlSufix = '';

  if (selEntry.id) {
    metod = "put";
    urlSufix = `/${selEntry.id}`;

    entry = {
      ...entry, ...data.find(_entry => _entry.id === selEntry.id)
    }
  }

  let answer = window.confirm("Save post?");
  answer === true &&
    axios({
      method: metod,
      url: `http://localhost:3001/posts${urlSufix}`,
      data: entry,
    })
      .then(function (response) {
        if (response.status === 200) {
          setData(
            data.map((_entry) => _entry.id === selEntry.id ? entry : _entry)
          );
        } else {
          setData([...data, response.data]);
        }
        setShowModal(false);
      })
      .catch(function (error) {
        // manejar error
        console.log(error);
      });
};

const postHandler = (allPost, setPost, setShowModal, comment, selEntry) => {
  let postFinded = allPost.find((postF) => postF.id === selEntry.id);
  if (postFinded.comments) {
    const entry = {
      ...postFinded,
      comments: [
        ...postFinded.comments,
        {
          id: postFinded.comments.length + 1,
          ...comment,
        },
      ],
    };
    console.log(entry);
    myHandlerSubmit(entry, allPost, setPost, setShowModal, selEntry);

  } else {
    console.log(postFinded);
  }
};

const categoryArray = ["Travel", "Lifestyle", "Business", "Food", "Work"];

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(contentDefault);
  const [category, setCategory] = useState("");
  const [selEntry, setSelEntry] = useState(contentDefault);
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
        postHandler,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
