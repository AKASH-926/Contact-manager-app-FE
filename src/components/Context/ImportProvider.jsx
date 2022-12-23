import React from 'react'
import { useState } from 'react'
import { importContext } from './ContactContext'
export default function ImportProvider({ children }) {
    const [isImportClicked, setImportClicked] = useState(false)
    const [imported, setImported] = useState(false)
    const [isDeleted, setDeleted] = useState(false)
    const [isDeleteOk, setDeleteOk] = useState(false)
    const [selectedId, setSelectedId] = useState([])
    return (
        <div>
            <importContext.Provider
                value={
                    {
                        imported, setImported, isDeleted,
                        setImportClicked, isImportClicked, setDeleted,
                        isDeleteOk, setDeleteOk, selectedId,
                        setSelectedId
                    }
                } >
                {children}
            </importContext.Provider>
        </div>
    )
}
