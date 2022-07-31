import React,{  useState, useEffect } from 'react'
import { Form, Input, Button, Modal, Select, message } from 'antd';
export default function AddInfo(props) {
  const [Infoform] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  

  useEffect(()=>{
    console.log(props)
  })
  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };
  //添加数据成功回调
  const onFinish = (values) => {
    console.log(values);
    setConfirmLoading(true);
    // getMyuser()
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      Infoform.resetFields()
      message.success('添加成功')
    }, 2000);
    
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Button type='primary' onClick={showModal}>新增数据</Button>
      <Modal
        title='添加信息'
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={Infoform}
          name="basic"
          layout='vertical'
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="报表名称"
            name="tableName"
            rules={[
              {
                required: true,
                message: '名称不能为空！',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="链接地址"
            name="url"
            rules={[
              {
                required: true,
                message: '链接不能为空！',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="父级选择"
            name="parentId"
            rules={[
              {
                required: true,
                message: '区域不能为空！',
              },
            ]}
          >
            <Select>
              {
                props.menuList.map(item => {
                  return (
                    <Select.Option value={ item.id } key={ item.id }>{item.tableName}</Select.Option>
                  )
                })
              }
            </Select>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" disabled={ confirmLoading }>
              确认添加
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
