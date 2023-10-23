import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { remove, create, getdata } from "../functions/product";

export const FormProduct = () => {
  const [date, setDate] = useState([]);
  const [form, setForm] = useState({});

  useEffect(() => {
    loadDate();
  }, []);

  const loadDate = async () => {
    getdata()
      .then((res) => {
        setDate(res.data);
        //console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  //console.log(form)

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(form)
    create(form)
      .then((res) => {
        console.log(res.data);
        loadDate();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemove = async (id) => {
    console.log(id);
    remove(id)
      .then((res) => {
        console.log(res);
        loadDate();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      FormProduct
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="device_id"
          placeholder="ID"
          onChange={(e) => handleChange(e)}
        />
        <br />

        <input
          type="text"
          name="device_name"
          placeholder="Name"
          onChange={(e) => handleChange(e)}
        />
        <br />

        <input
          type="text"
          name="serial_no"
          placeholder="Serial"
          onChange={(e) => handleChange(e)}
        />
        <br />

        <button>Submit</button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Serial</th>
            <th scope="col">Model</th>
            <th scope="col">Brand</th>
            <th scope="col">Stock</th>
            <th scope="col">Price</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {date
            ? date.map((item, index) => (
                <tr key={index}>
                  <td>{item.device_id}</td>
                  <td>{item.device_name}</td>
                  <td>{item.serial_no}</td>
                  <td>{item.device_model}</td>
                  <td>{item.device_brand}</td>
                  <td>{item.date_stock}</td>
                  <td>{item.device_price}</td>
                  <td>{item.device_status}</td>
                  <td onClick={() => handleRemove(item.device_id)}>Delete</td>
                  <td>
                    <Link to={"/edit/" + item.device_id}>Edit</Link>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};
