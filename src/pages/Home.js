import React from 'react'
import Layout from '../components/general/Layout'
import {LoggedIn, LoggedOut, Value, useWebId} from '@solid/react'
import {fetchData} from '../api/rdflib'
import { Typography, Row, Col } from 'antd'
import Editor from '../components/editor/Editor'
const {Title} = Typography
export default function Home(props){
    //fetchData()
    return(
        <Layout>
            <LoggedIn>
                <Row>
                    <Col>
                    <Title>
                    <Value src="user.name"/>
                </Title>
                    </Col>
                </Row>
                <Row justify="">
                    <Col span={20}>
                    <Editor/>
                    </Col>
                </Row>
            </LoggedIn>
            <LoggedOut>
                <h1>LOGIN PLS</h1>
            </LoggedOut>
        </Layout>
    )
}