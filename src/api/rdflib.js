import axios from 'axios'
const $rdf = require('rdflib')
const VCARD = new $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
const SCHEMA = new $rdf.Namespace('http://schema.org/');
const RDF =  new $rdf.Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
export async function getSchemaPersonData(){
    // const response = await axios.get("https://schema.org/Person.jsonld", {headers:{'Content-Type':'application/ld+json'}}).catch(err => console.log(err))
    // console.log(response.data)
    const store =  $rdf.graph()
    const source ="https://schema.org/Person.ttl"
    var timeout = 5000 // 5000 ms timeout
    var fetcher = new $rdf.Fetcher(store, timeout)
    
    fetcher.nowOrWhenFetched(source, function(ok, body, xhr) {
        if (!ok) {
            console.log("Oops, something happened and couldn't fetch data");
        } else {
            const data = store.match(null,RDF("type"), RDF("Property"))
            console.log(data)
        }
    })
}
export function fetchData(){
    const user = 'https://luispozo.inrupt.net/profile/card#me'
    console.log(user)
    const store = $rdf.graph();
    const fetcher = new $rdf.Fetcher(store);
    const updater = new $rdf.UpdateManager(store)
    const me = store.sym(user);
    const profile = me.doc()
    const ins = $rdf.st(me, SCHEMA("name"), "Luis Pozo", profile)
    fetcher.load(profile).then((response) => {
        const del  = store.statementsMatching(me, SCHEMA("name"), null, profile) // null is wildcard
        console.log(del)
    updater.update(del, ins, (uri, ok, message, response) => {
        if (ok) console.log('Name changed to '+ "LUIS")
        else alert(message)
      })    
    })

}