import axios from 'axios'
import React from 'react'
const $rdf = require('rdflib')
const VCARD = new $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
const SCHEMA = new $rdf.Namespace('http://schema.org/');
const RDF =  new $rdf.Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');


export  function getSchemaPersonData(){
    // const response = await axios.get("https://schema.org/Person.jsonld", {headers:{'Content-Type':'application/ld+json'}}).catch(err => console.log(err))
    // console.log(response.data)
    return new Promise((resolve, reject) => {
        const store =  $rdf.graph()
        const source ="https://schema.org/Person.ttl"

        var timeout = 5000 // 5000 ms timeout
        var fetcher = new $rdf.Fetcher(store, timeout)
        fetcher.nowOrWhenFetched(source, async function(ok, body, xhr) {
            if (!ok) {
                console.log("Oops, something happened and couldn't fetch data");
                reject()
            } else {
                const props = store.match(null,RDF("type"), RDF("Property"))
                let result = {}
                await props.map((prop) => {
                    const subject = prop.subject.value;
                    result[subject] = {}
                    const uriSubj = new $rdf.NamedNode(subject)
                    const poms = store.match(uriSubj, null, null)
                    poms.map((pom) => {
                        const pred = pom.predicate.value
                        const obj = pom.object.value
                        if(!Object.keys(result[subject]).includes(pred))
                            result[subject][pred] = []
                        result[subject][pred].push(obj)
                    })
                resolve(result)
                    
                })
            }
        })
    })
}
// export function fetchData(){
//     const user = 'https://luispozo.inrupt.net/profile/card#me'
//     console.log(user)
//     const store = $rdf.graph();
//     const profile = me.doc()
//     const ins = $rdf.st(me, SCHEMA("name"), "Luis Pozo", profile)
//     fetcher.load(profile).then((response) => {
//         const del  = store.statementsMatching(me, SCHEMA("name"), null, profile) // null is wildcard
//         console.log(del)
//     updater.update(del, ins, (uri, ok, message, response) => {
//         if (ok) console.log('Name changed to '+ "LUIS")
//         else alert(message)
//       })    
//     })

// }
export class ManageUserData{
    constructor(user){
        this.user = user    
        this.store = new $rdf.graph()
        this.fetcher = null
        this.updater = null
        this.me = null
        this.profile = null
    }
    async init(user){
        this.fetcher = await new $rdf.Fetcher(this.store);
        this.updater = await new $rdf.UpdateManager(this.store)
        this.me = await this.store.sym(user);
        this.profile = await this.me.doc()
    }
    async fetchData(){
        await this.fetcher.load(this.profile)
    }
    async updateData(predicateUri,data){
        return new Promise((resolve, reject) => {
            const predicate = new $rdf.NamedNode(predicateUri)
            const insert = $rdf.st(this.me, predicate, data, this.profile)
            const del = this.store.statementsMatching(this.me, predicate, null, this.profile)
            this.updater.update(del, insert, (uri, ok, message, response) => {
                if (ok) resolve()
                else reject(message)
              }) 
        }) 
    }
    sendQuery(uri="http://schema.org/name"){
        const predicate = new $rdf.NamedNode(uri)
        const tpos = this.store.match(this.me,predicate, null, this.doc)
        let result = []
        tpos.map(tpo => {
            result.push(tpo.object.value)
        })
        return result
    }


    
}