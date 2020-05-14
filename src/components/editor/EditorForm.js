import React from 'react'
import { Form, Input, Button, Typography, Row, Col } from 'antd';
import EditorFormValue from './EditorFormValue'
const {Text} = Typography
const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 18 },
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
  console.log(Object.keys(props.values))
  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      {Object.keys(props.data).map((field, idx) => {
        const label = props.data[field]["http://www.w3.org/2000/01/rdf-schema#label"][0]
        const comment = props.data[field]["http://www.w3.org/2000/01/rdf-schema#comment"][0]
        const help = <span dangerouslySetInnerHTML={{__html: comment.replace(/<a/g, '<a target="_blank rel="noopener noreferrer"')}}></span>
        let val  = Object.keys(props.values).length !== 0 && props.values[field].length !== 0? props.values[field][0]:''
        console.log(props.values[field])
        return(
          <Form.Item
          name={['person', field]}
          key={idx}
          initialValue={val}
          help={help}
          label={
            <a target="_blank" rel="noopener noreferrer" href={field}>{label}</a>
          }
          labelAlign="left"
          >
              <Input/>
          </Form.Item>
        )
      })}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};