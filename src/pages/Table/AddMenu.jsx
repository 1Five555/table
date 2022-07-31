import React,{ useState } from 'react'
import { Form, Input, Button, Modal, Select, message } from 'antd';

export default function AddMenu(props) {
  const [Menuform] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);


  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };
  const onFinish = (values) => {
    console.log(values);
    setConfirmLoading(true);
    // getMyuser()
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      Menuform.resetFields()
      message.success('添加成功')
    }, 2000);
    
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Button type='primary' style={{marginLeft:'20px'}} onClick={showModal}>添加菜单</Button>
      <Modal
        title='添加菜单'
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={Menuform}
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
            label="菜单名称"
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
            label="父级菜单"
            name="parentId"
            rules={[
              {
                required: true,
                message: '区域不能为空！',
              },
            ]}
          >
            <Select>
            <Select.Option value='0'>一级菜单</Select.Option>
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
