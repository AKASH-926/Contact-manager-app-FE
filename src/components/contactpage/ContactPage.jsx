import React from 'react'
import Header from '../Header/Header'
import Pagination from '../Pagination/Pagination'
import Sidebar from '../sidebar/sidebar'
import TableArea from '../tablearea/TableArea'
import "./contactpage.css"
// import Delete from '../delete/Delete'
// import ImportFile from '../import/ImportFile'
import Delete from '../delete/Delete'
import ImportFile from "../import/importFile"
export default function ContactPage() {
    return (
        <div id='contact-page-wrap'>
            <div className='delete-import-components'>
                <Delete />
                <ImportFile />
            </div>
            <Sidebar />
            <Header />
            <TableArea />
            <Pagination />
        </div>
    )
}
