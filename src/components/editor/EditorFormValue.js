import React from 'react'
import { useLDflexValue, useWebId } from '@solid/react'
export default function EditorFormValue(props){
    let val ="" 
    const uri = useWebId()
    val = useLDflexValue(`[${uri}][${props.uri}]`) || ''
    return val.value !== undefined ? val.value:''
}