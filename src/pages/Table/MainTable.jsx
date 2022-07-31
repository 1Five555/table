import React,{ useState } from 'react'
import { Form, Input, Table, Typography, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

const { confirm } = Modal
export default function MainTable(props) {
  const [form] = Form.useForm();
  const { data } = props
  const [editingId, setEditingId] = useState('');
  useEffect(() => {
    console.log(data)
  })
  // 弹窗提醒
  const showConfirm = (record) => {
    confirm({
      title: '确定要删除吗?',
      icon: <ExclamationCircleOutlined />,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        console.log(record);
      },
  

    });
  };
  const isEditing = (record) => record.id === editingId;

  const edit = (record) => {
    form.setFieldsValue({
      key: '',
      oneLevelMenuName:'',
      twoLevelMenuName: '',
      tableName: '',
      url:'',
      ...record,
    });
    setEditingId(record.id);
  };

  const cancel = () => {
    setEditingId('');
  };
  const save = async (record) => {
    try {
      const row = await form.validateFields();
      // const newData = [...data];
      const index = data.findIndex((item) => record.id === item.id);
      const newRecord = { ...data[index], ...row }
      console.log(newRecord);
      setEditingId('')
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
  
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `请输入 ${title}!`,
              },
            ]}
          >
            <Input />
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  const columns = [
    {
      title: '表名',
      dataIndex: 'tableName',
      width: '30%',
      editable: true,
    },
    {
      title: '链接',
      dataIndex: 'url',
      width: '40%',
      ellipsis: true,

      editable: true,
      render: (url) => <a href={url} target="_blank">{url}</a>
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '10%',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record)}
              style={{
                marginRight: 8,
              }}
            >
              保存
            </Typography.Link>
            <Typography.Link
              onClick={ cancel }
              style={{
                marginRight: 8,
              }}
            >
              取消
            </Typography.Link>
          </span>
        ) : 
          record.url
          ?
          <>
            <Typography.Link disabled={editingId !== ''} onClick={() => edit(record)}>
              编辑
            </Typography.Link>

            <Typography.Link style={{marginLeft:10,color:'red'}} disabled={editingId !== ''} onClick={() => showConfirm(record)}>
              删除
            </Typography.Link>
          </>
          : (
            !record.children && 
            <Typography.Link style={{marginLeft:10,color:'red'}} disabled={editingId !== ''} onClick={() => showConfirm(record)}>
              删除
            </Typography.Link>
          )
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        // inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      })
    };
  });
  return (
    <div>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          pagination = { false }
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          rowKey={record => record.id}
        />
      </Form>
    </div>
  )
}
