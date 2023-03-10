import React, { useContext } from 'react'
import "./ContactTable.css"
import { ContactContext, SearchContext, importContext } from '../../Context/ContactContext'
import axios from "axios"
export default function ContactTable() {

    const { pagedcontact } = useContext(ContactContext)
    const { searchdata, isSearch } = useContext(SearchContext)
    const { setDeleted, setDeleteOk, selectedId, setSelectedId, nameSelected, setNameSelected } = useContext(importContext)


    const handleCheckBox = (e, id) => {

        if (e.target.checked) {
            setSelectedId([...selectedId, e.target.value])
        } else {
            setNameSelected(false)

            const newFiltered = selectedId.filter((id1) => {
                return id1 !== e.target.value
            })
            setSelectedId(newFiltered)

        }
    }
    const token = window.localStorage.getItem("jwt")
    const handleDelete = (e, id) => {

        axios.delete("https://dead-tan-bison-kit.cyclic.app/contacts/delete", {
            headers: {
                authorization: token
            },
            data: {
                source: [id]
            }

        })
            .then((data) => {
                setDeleted(true)
                setDeleteOk(false)
                setNameSelected(false)
                setSelectedId([])
                setTimeout(async () => {
                    await setDeleted(false)
                }, 2000)
            })
            .catch((err) => console.log(err))


    }
    return (
        <div id='contactTable-wrap'>
            <table id='table-wrap' cellSpacing={0}>
                <thead >
                    <tr id='head-wrap'>
                        <th className='border-left-radius' ><div>
                            <input type="checkbox"
                                checked={nameSelected}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setNameSelected(true)
                                        setSelectedId(pagedcontact)
                                    } else {
                                        setNameSelected(false)
                                        setSelectedId([])
                                    }

                                }}
                                name="" id="" />
                        </div>
                        </th>

                        <th >Name</th>
                        <th >| Designation </th>
                        <th ><img id='arrow-img1' src="/arrow.png" alt="" />| Company</th>
                        <th ><img id='arrow-img2' src="/arrow.png" alt="" />| Industry</th>
                        <th ><img id='arrow-img3' src="/arrow.png" alt="" />| Email</th>
                        <th>| Phone Number</th>
                        <th>| Country</th>
                        <th className='border-right-radius'>| Action</th>
                    </tr>
                </thead>

                <tbody id='table-rows'>
                    {isSearch ?

                        <tr className='table-content-wrap' >
                            <td><div><input type="checkbox" name="" id="" /></div></td>
                            <td>{searchdata.Name}</td>
                            <td>{searchdata.Designation}</td>
                            <td>{searchdata.Company}</td>
                            <td>{searchdata.Industry}</td>
                            <td >{searchdata.Email}</td>
                            <td>{searchdata.Phone_number}</td>
                            <td>{searchdata.Country}</td>
                            <td><div className='edit-del-icon'>
                                <img src="/pencil.png" alt="pencil" />  <img src="/trash.png" alt="trash" />
                            </div></td>
                        </tr>
                        : pagedcontact.map((item, i) => {
                            return (
                                <tr className='table-content-wrap' key={item._id}>
                                    <td><div><input type="checkbox"
                                        value={item._id} name="" id={item._id}
                                        onChange={(e) => handleCheckBox(e, item._id)}
                                    /></div></td>
                                    <td>{item.Name}</td>
                                    <td>{item.Designation}</td>
                                    <td>{item.Industry}</td>
                                    <td>{item.Company}</td>
                                    <td title={item.Email}>{item.Email}</td>
                                    <td>{item.Phone_number}</td>
                                    <td>{item.Country}</td>
                                    <td><div className='edit-del-icon'>
                                        <img src="/pencil.png" alt="pencil" />
                                        <img src="/trash.png" onClick={(e) => handleDelete(e, item._id)} alt="trash" />
                                    </div></td>
                                </tr>
                            )
                        }

                        )
                    }




                </tbody>


            </table>
        </div>
    )
}

