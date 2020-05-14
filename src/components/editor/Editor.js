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
            dataFeched:false
        }
        this.graph = null
        // this.store = graph()
        // this.fetcher = null
        // this.updater = null
        // this.me = null
        // this.profile = null
    }
    render(){

        return(
            <>
            {Object.keys(this.state.selected).length !== 0 ?(
                <Row justify="">
                    <Col span={24}>
                        <EditorForm data={this.state.selected} values={this.state.currentValues}/>                               
                    </Col>
                </Row>
            ):''
            }
        </>
        )
    }
    async componentDidMount(){
        const {webId} = await auth.currentSession()
        //await this.init(webId)
        this.graph =  new ManageUserData(webId)
        const response = await getSchemaPersonData()
        let aux = {}
        let vals = {} 
        await defaultSchemaPersonProps.map(async (prop) => {
            aux[prop] = response[prop]
            vals[prop] = []
            const results = await this.graph.sendQuery(prop)
            console.log(results)
            vals[prop].push(...results)
        })
        this.setState({data:response, selected:aux,currentValues:vals})
        
    }
    init(user){
            this.fetcher = this.fetcher !== null ? this.fetcher:new Fetcher(this.store);
            this.updater = this.updateder !== null ?this.updater:new UpdateManager(this.store)
            this.me = this.me !== null ? this.me:this.store.sym(user);
            this.profile = this.profile !== null ?this.profile:this.me.doc()
            if(!this.state.dataFeched){
                this.fetchData()        
            }
    }
    fetchData(){
        this.setState({dataFeched:true})
        this.fetcher.load(this.profile)
    }
    async sendQuery(uri){
        return new Promise(async (resolve, reject) => {
            const predicate = new NamedNode(uri)
            const tpos = await Promise.resolve(this.store.match(this.me,predicate, null, this.doc))
            let result = []
            await tpos.map(tpo => {
                result.push(tpo.object.value)
            })
            resolve(result)
        })
    }    
}
