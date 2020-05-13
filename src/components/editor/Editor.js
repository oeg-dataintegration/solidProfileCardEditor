import React from 'react'
import EditorForm from './EditorForm'
import {getSchemaPersonData} from '../../api/rdflib'

export default function Editor(props){
    getSchemaPersonData()
    return(
        <EditorForm/>
    )
}