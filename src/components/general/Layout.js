import React from 'react'
import {Row, Col} from 'antd'
import Header from './Header'
export default function Layout(props){
    return(
        <Row justify="center">
            <Col
                xs={22}
                md={20}
                lg={18}
            >  
                <Header/>
                {props.children}
            </Col>
        </Row>
    )
}