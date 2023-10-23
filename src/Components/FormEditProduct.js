import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { read, update } from '../functions/product'

const FormEditProduct = () => {
    const params = useParams()
    const navigate = useNavigate()


    const [data, setData] = useState({
        device_id: '',
        device_name: '',
        serial_no: ''
    })

    useEffect(() => {
        loadData(params.id)
    },[])

    const loadData = async (id) => {
        read(id)
            .then((res) => {
                setData(res.data)
            })
    }
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(data)
        update(params.id, data)
            .then(res => {
                console.log(res)
                navigate('/')
            })
            .catch((err) => console.log(err))
    }

  return (
    <div>
      FormEditProduct
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="device_id"
          placeholder="ID"
          value={data.device_id}
          onChange={(e) => handleChange(e)}
        />
        <br />

        <input
          type="text"
          name="device_name"
          placeholder="Name"
          value={data.device_name}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default FormEditProduct;
