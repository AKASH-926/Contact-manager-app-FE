import React, { useContext } from 'react'
import "./Delete.css"
import { importContext } from '../Context/ContactContext';
import axios from "axios"
export default function Delete(props) {
    const { isDeleted, setDeleted, setDeleteOk, isDeleteOk, selectedId, setSelectedId } = useContext(importContext)
    console.log(selectedId);

    const token = window.localStorage.getItem("jwt")
    const handleDelete = (e) => {
        console.log(selectedId);
        axios.delete("http://localhost:8000/contacts/delete", {
            headers: {
                authorization: token
            },
            data: {
                source: selectedId
            }
        })
            .then((data) => {
                setDeleted(true)
                setDeleteOk(false)
                setSelectedId([])
                setTimeout(async () => {
                    await setDeleted(false)
                }, 1500)
            })
            .catch((err) => console.log(err))


    }
    return (
        <div className="delete-component-container">
            {isDeleteOk &&
                <div className='delete-container'  >
                    <div className='icon-holder' >
                        <img src='/deleteIcon.png' style={{ width: "13px" }} alt="delete-icon" />
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: 600 }} >Delete Contacts</div>

                    <div style={{ color: "#2DA5FC", fontSize: "12px", textAlign: "center" }}>Sure you want to delete these contacts ?</div>
                    <div className='btns-holder'>
                        <button className='cancel-btn' onClick={() => {
                            setDeleteOk(false)
                        }} >Cancel</button>
                        <button className='confirm-btn' onClick={(e) => handleDelete(e)} >OK</button>
                    </div>
                </div>
            }
            {isDeleted &&
                <div>
                    <div className='delete-container' >
                        <img src="/success.png" style={{ width: "30px" }} alt="success-icon" />
                        <div style={{ fontSize: "15px", fontWeight: 600 }} >Deleted contacts</div>
                    </div>
                </div>
            }

        </div>
    )
}
