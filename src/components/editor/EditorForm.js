import React from 'react'
import { Form, Input, Button, Typography, Row, Col } from 'antd';

const {Text} = Typography
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

export default function EditorForm(props){
  const onFinish = values => {
    console.log(values);
  };

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'email']} rules={[{ type: 'email' }]}>
          <Row>
              <Col>
              <Text strong>Email </Text>
              </Col>
          </Row>
          <Row>
              <Col>
              <Text type="secondary">Email description...</Text>

              </Col>
          </Row>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'jobTitle']} label="Job Title">
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'placeOfWork']} label="Place of Work">
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'website']} label="Website">
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Introduction">
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};