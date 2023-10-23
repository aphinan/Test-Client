import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const FormProduct = () => {

    const [date, setDate] = useState([])
    const [form, setForm] = useState({})

    useEffect(() => {
        loadDate()

    }, [])

    const loadDate = async () => {
        await axios.get('http://localhost:5000/api/product')
            .then((res) => {
                setDate(res.data)
                //console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    //console.log(form)

    const handleSubmit = async (e) => {
        e.preventDefault()
        //console.log(form)
        await axios.post('http://localhost:5000/api/product', form)
            .then(res => {
                console.log(res.data)
                loadDate()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleRemove = async (id) => {
        console.log(id)
        await axios.put('http://localhost:5000/api/product/' + id)
            .then(res => {
                console.log(res)
                //loadDate()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>FormProduct

            <form onSubmit={handleSubmit}>
                <input type='text'
                    name='device_id'
                    placeholder='ID'
                    onChange={e => handleChange(e)}
                /><br />

                <input type='text'
                    name='device_name'
                    placeholder='Name'
                    onChange={e => handleChange(e)}
                /><br />

                <input type='text'
                    name='serial_no'
                    placeholder='Serial'
                    onChange={e => handleChange(e)}
                /><br />

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
                    {
                        date ? date.map((item, index) =>
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
                            </tr>
                        )
                            : null
                    }
                </tbody>
            </table>
        </div>
    )
}
