import React, {useEffect, useState} from 'react'
import EditorForm from './EditorForm'
import {getSchemaPersonData} from '../../api/rdflib'
import { message, Row, Col} from 'antd'
import {ManageUserData} from '../../api/rdflib'
import { useLDflexValue } from '@solid/react'
import auth from 'solid-auth-client';
import {graph,Fetcher,UpdateManager, NamedNode} from 'rdflib'
const defaultSchemaPersonProps = [
    "http://schema.org/name",
    "http://schema.org/url",
    "http://schema.org/memberOf",
    "http://schema.org/affiliation",
    "http://schema.org/worksFor",
    "http://schema.org/image",
    "http://schema.org/description",
    "http://schema.org/email",
    "http://schema.org/jobTitle",
    "http://schema.org/nationality",
]

export default class Editor extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data:{},
            selected:{},
            currentValues:{},
            graph: null
        }
        this.updateValues = this.updateValues.bind(this)
    }
    updateValues(data){
        console.log(data)
        Object.keys(data["person"]).map(async (prop) => {
            await this.state.graph.updateData(prop, data["person"][prop]).catch(err => console.log(err))
        })
    }
    render(){

        return(
            <>
            {Object.keys(this.state.selected).length !== 0 ?(
                <Row justify="">
                    <Col span={24}>
                        <EditorForm data={this.state.selected} values={this.state.currentValues} updateValues={this.updateValues}/>                               
                    </Col>
                </Row>
            ):''
            }
        </>
        )
    }
    async componentDidMount(){
        const {webId} = await auth.currentSession()
        this.setState({graph:new ManageUserData(webId)})
        await this.state.graph.init(webId)
        await this.state.graph.fetchData()
        const response = await getSchemaPersonData()
        let aux = {}
        let vals = {} 
        await defaultSchemaPersonProps.map(async (prop) => {
            aux[prop] = response[prop]
            vals[prop] = []
            const results = await this.state.graph.sendQuery(prop)
            vals[prop].push(...results)
        })
        this.setState({data:response, selected:aux,currentValues:vals})
        
    }   
}
