import React, { useContext } from 'react'
import "./Delete.css"
import { importContext } from '../Context/ContactContext';
import axios from "axios"
export default function Delete(props) {
    const { isDeleted, setDeleted, setDeleteOk, isDeleteOk, selectedId, setSelectedId, isSelectedLen, setSelectedLen, setNameSelected } = useContext(importContext)
    // console.log(selectedId);
    if (selectedId.length !== 0) {
        setSelectedLen(true)
    } else {
        setSelectedLen(false)
    }
    const token = window.localStorage.getItem("jwt")
    const handleDelete = (e) => {
        axios.delete("https://dead-tan-bison-kit.cyclic.app/contacts/delete", {
            headers: {
                authorization: token
            },
            data: {
                source: selectedId
            }
        })
            .then((data) => {
                setDeleteOk(false)
                setDeleted(true)
                setSelectedId([])
                setNameSelected(false)
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
                    {isSelectedLen && <div style={{ fontSize: "13px", fontWeight: 600 }} >Delete Contacts</div>}
                    {isSelectedLen ?
                        <div style={{ color: "#2DA5FC", fontSize: "12px", textAlign: "center" }}>Sure you want to delete these contacts ?</div>
                        :
                        <div style={{ color: "#2DA5FC", fontSize: "14px", padding: "4px", textAlign: "center" }}>Select items to Delete</div>

                    }
                    <div className='btns-holder'>
                        <button className='cancel-btn' onClick={() => {
                            setDeleteOk(false)
                        }} >Cancel</button>

                        {isSelectedLen && <button className='confirm-btn' onClick={(e) => handleDelete(e)} >OK</button>}

                    </div>
                </div>
            }
            {isDeleted &&
                <div className='delete-component-container' >
                    <div className='delete-container' >
                        {(isSelectedLen || isDeleted) &&
                            <img src="/success.png" style={{ width: "30px" }} alt="success-icon" />
                        }
                        <div style={{ fontSize: "16px", fontWeight: 600 }} >
                            {(isSelectedLen || isDeleted) && "Contacts Deleted"}
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

