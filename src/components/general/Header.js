import React from 'react'
import { Row, Col, Typography } from 'antd'
import {AuthButton} from '@solid/react'
const {Title} = Typography
export default function Header(props){
    return(
        <Row align="middle" justify="space-between"> 
            <Col>
                <Title level={2}>Profile Card editor</Title>
            </Col>
            <Col>
                <AuthButton login="Login here!" logout="Log me out"/>
            </Col>
        </Row>
    )
}