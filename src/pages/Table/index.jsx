import React,{ useState } from 'react'
import { Form, Input, Popconfirm, Table, Typography, Button, Modal, Select } from 'antd';
// import './index.css'
const originData = [
  {
    id: 1,
    oneLevelMenuName: `售电业务`,
    twoLevelMenuName: `山东售电业务`,
    tableName: `山西售电业务`,
    url:'',
    children:[
      {
        id: 2,
        oneLevelMenuName: `售电业务`,
        twoLevelMenuName: `售电业务2`,
        tableName: `山东报价表 2`,
        url:'https://www.baidu.com/'
      }
    ]
  },
  {
    id: 3,
    oneLevelMenuName: `售电业务`,
    twoLevelMenuName: `山西售电业务`,
    tableName: `山东售电业务`,
    url:'',
    children:[
      {
        id: 2,
        oneLevelMenuName: `售电业务`,
        twoLevelMenuName: `售电业务2`,
        tableName: `报价表 2`,
        url:'https://www.baidu.com/'
      }
    ]

  },
  {
    id: 4,
    oneLevelMenuName: `售电业务`,
    twoLevelMenuName: `山东售电业务1`,
    tableName: `交易中心`,
    url:'https://www.baidu.com/'
  },
  {
    id: 5,
    oneLevelMenuName: `售电业务`,
    twoLevelMenuName: `变化录入表`,
    tableName: `山东报价表 2`,
    url:'https://www.baidu.com/'
  },
  {
    id: 6,
    oneLevelMenuName: `售电业务`,
    twoLevelMenuName: `山东售电业务1`,
    tableName: `山东报价表 2`,
    url:'https://www.baidu.com/'
  }
];
const arr = [
  {
      "id": "50",
      "tableName": "交易中心账号维护",
      "url": "http://10.12.7.110:37799/webroot/decision/view/report?viewlet=%25E5%25A4%25A9%25E6%25B6%25A6%252F%25E4%25BA%25A4%25E6%2598%2593%25E4%25B8%25AD%25E5%25BF%2583%25E8%25B4%25A6%25E5%258F%25B7%25E7%25BB%25B4%25E6%258A%25A4.cpt&ref_t=design&op=write&ref_c=609077f1-60c0-4718-92ad-6500af9138be",
      "parentId": 1,
      "sort": 1,
      "createBy": "1",
      "createTime": "2022-07-26 15:39:56",
      "updateBy": null,
      "updateTime": null
  },
  {
      "id": "51",
      "tableName": "合约填报类型",
      "url": "http://10.12.7.110:37799/webroot/decision/view/report?viewlet=%25E5%25A4%25A9%25E6%25B6%25A6%252F%25E5%2590%2588%25E7%25BA%25A6%25E7%25B1%25BB%25E5%259E%258B%25E5%25A1%25AB%25E6%258A%25A5%25E8%25A1%25A8.cpt&ref_t=design&op=write&ref_c=609077f1-60c0-4718-92ad-6500af9138be",
      "parentId": 1,
      "sort": 2,
      "createBy": "1",
      "createTime": "2022-07-26 15:43:50",
      "updateBy": null,
      "updateTime": null
  },
  {
      "id": "52",
      "tableName": "负荷变化录入表",
      "url": "http://10.12.7.110:37799/webroot/decision/view/report?viewlet=%25E5%25A4%25A9%25E6%25B6%25A6%252F%25E8%25B4%259F%25E8%258D%25B7%25E5%258F%2598%25E5%258C%2596%25E5%25BD%2595%25E5%2585%25A5%25E8%25A1%25A8.cpt&ref_t=design&op=write&ref_c=609077f1-60c0-4718-92ad-6500af9138be",
      "parentId": 1,
      "sort": 3,
      "createBy": "1",
      "createTime": "2022-07-26 15:39:56",
      "updateBy": null,
      "updateTime": null
  },
  {
      "id": "4",
      "tableName": "山东-用户报价输入表",
      "url": "http://10.12.7.110:37799/webroot/decision/view/report?viewlet=%25E5%25A4%25A9%25E6%25B6%25A6%252F%25E5%25B1%25B1%25E4%25B8%259C-%25E7%2594%25A8%25E6%2588%25B7%25E6%258A%25A5%25E4%25BB%25B7%25E8%25BE%2593%25E5%2585%25A5%25E8%25A1%25A8.cpt&ref_t=design&op=write&ref_c=609077f1-60c0-4718-92ad-6500af9138be",
      "parentId": 2,
      "sort": 7,
      "createBy": "1",
      "createTime": "2022-07-26 15:43:50",
      "updateBy": null,
      "updateTime": null
  },
  {
      "id": "8",
      "tableName": "山东-负荷预测表-分016户号",
      "url": "http://10.12.7.110:37799/webroot/decision/view/report?viewlet=%25E5%25A4%25A9%25E6%25B6%25A6%252F%25E5%25B1%25B1%25E4%25B8%259C-%25E8%25B4%259F%25E8%258D%25B7%25E9%25A2%2584%25E6%25B5%258B%25E8%25A1%25A8-%25E5%2588%2586016%25E6%2588%25B7%25E5%258F%25B7.cpt&ref_t=design&op=write&ref_c=609077f1-60c0-4718-92ad-6500af9138be",
      "parentId": 2,
      "sort": 8,
      "createBy": "1",
      "createTime": "2022-07-26 15:39:56",
      "updateBy": null,
      "updateTime": null
  },
  {
      "id": "9",
      "tableName": "山东10日直调负荷预测",
      "url": "http://10.12.7.110:37799/webroot/decision/view/report?viewlet=%25E5%25A4%25A9%25E6%25B6%25A6%252F%25E5%25B1%25B1%25E4%25B8%259C10%25E6%2597%25A5%25E7%259B%25B4%25E8%25B0%2583%25E8%25B4%259F%25E8%258D%25B7%25E9%25A2%2584%25E6%25B5%258B.cpt&ref_t=design&op=view&ref_c=609077f1-60c0-4718-92ad-6500af9138be",
      "parentId": 2,
      "sort": 9,
      "createBy": "1",
      "createTime": "2022-07-26 15:39:56",
      "updateBy": null,
      "updateTime": null
  },
  {
      "id": "10",
      "tableName": "山东10日电价预测",
      "url": "http://10.12.7.110:37799/webroot/decision/view/report?viewlet=%25E5%25A4%25A9%25E6%25B6%25A6%252F%25E5%25B1%25B1%25E4%25B8%259C10%25E6%2597%25A5%25E9%2580%2590%25E6%2597%25B6%25E7%2594%25B5%25E4%25BB%25B7%25E9%25A2%2584%25E6%25B5%258B.cpt&ref_t=design&op=view&ref_c=609077f1-60c0-4718-92ad-6500af9138be",
      "parentId": 2,
      "sort": 10,
      "createBy": "1",
      "createTime": "2022-07-26 15:43:50",
      "updateBy": null,
      "updateTime": null
  },
  {
      "id": "11",
      "tableName": "山东实际运行数据与预测值",
      "url": "http://10.12.7.110:37799/webroot/decision/view/report?viewlet=%25E5%25A4%25A9%25E6%25B6%25A6%252F%25E5%25B1%25B1%25E4%25B8%259C%25E5%25AE%259E%25E9%2599%2585%25E8%25BF%2590%25E8%25A1%258C%25E6%2595%25B0%25E6%258D%25AE%25E4%25B8%258E%25E9%25A2%2584%25E6%25B5%258B%25E5%2580%25BC.cpt&ref_t=design&op=view&ref_c=609077f1-60c0-4718-92ad-6500af9138be",
      "parentId": 2,
      "sort": 11,
      "createBy": "1",
      "createTime": "2022-07-26 15:39:56",
      "updateBy": null,
      "updateTime": null
  },
  {
      "id": "12",
      "tableName": "山东15min15d新能源预测-心知",
      "url": "http://10.12.7.110:37799/webroot/decision/view/report?viewlet=%25E5%25A4%25A9%25E6%25B6%25A6%252F%25E5%25B1%25B1%25E4%25B8%259C%25E5%25BF%2583%25E7%259F%25A5%25E6%2596%25B0%25E8%2583%25BD%25E6%25BA%2590%25E9%25A2%2584%25E6%25B5%258B15min15d.cpt&ref_t=design&op=view&ref_c=609077f1-60c0-4718-92ad-6500af9138be",
      "parentId": 2,
      "sort": 12,
      "createBy": "1",
      "createTime": "2022-07-26 15:43:50",
      "updateBy": null,
      "updateTime": null
  },
  {
      "id": "13",
      "tableName": "山东日前申报表",
      "url": "http://10.12.7.110:37799/webroot/decision/view/report?viewlet=%25E5%25A4%25A9%25E6%25B6%25A6%252F%25E5%25B1%25B1%25E4%25B8%259C%25E6%2597%25A5%25E5%2589%258D%25E7%2594%25B3%25E6%258A%25A5%25E8%25A1%25A8.cpt&ref_t=design&op=view&ref_c=609077f1-60c0-4718-92ad-6500af9138be",
      "parentId": 2,
      "sort": 13,
      "createBy": "1",
      "createTime": "2022-07-26 15:39:56",
      "updateBy": null,
      "updateTime": null
  },
  {
      "id": "14",
      "tableName": "山东日前电价",
      "url": "http://10.12.7.110:37799/webroot/decision/view/report?viewlet=%25E5%25A4%25A9%25E6%25B6%25A6%252F%25E5%25B1%25B1%25E4%25B8%259C%25E6%2597%25A5%25E5%2589%258D%25E7%2594%25B5%25E4%25BB%25B7.cpt&ref_t=design&op=write&ref_c=609077f1-60c0-4718-92ad-6500af9138be",
      "parentId": 2,
      "sort": 14,
      "createBy": "1",
      "createTime": "2022-07-26 15:43:50",
      "updateBy": null,
      "updateTime": null
  },
  {
      "id": "15",
      "tableName": "山东日前策略套利透视",
      "url": "http://10.12.7.110:37799/webroot/decision/view/report?viewlet=%25E5%25A4%25A9%25E6%25B6%25A6%252F%25E5%25B1%25B1%25E4%25B8%259C%25E6%2597%25A5%25E5%2589%258D%25E7%25AD%2596%25E7%2595%25A5%25E5%25A5%2597%25E5%2588%25A9%25E9%2580%258F%25E8%25A7%2586.cpt&ref_t=design&op=view&ref_c=609077f1-60c0-4718-92ad-6500af9138be",
      "parentId": 2,
      "sort": 15,
      "createBy": "1",
      "createTime": "2022-07-26 15:43:50",
      "updateBy": null,
      "updateTime": null
  },
  {
      "id": "16",
      "tableName": "山东日滚动交易决策信息表",
      "url": "http://10.12.7.110:37799/webroot/decision/view/report?viewlet=%25E5%25A4%25A9%25E6%25B6%25A6%252F%25E5%25B1%25B1%25E4%25B8%259C%25E6%2597%25A5%25E6%25BB%259A%25E5%258A%25A8%25E4%25BA%25A4%25E6%2598%2593%25E5%2586%25B3%25E7%25AD%2596%25E4%25BF%25A1%25E6%2581%25AF%25E8%25A1%25A8.cpt&ref_t=design&op=write&ref_c=609077f1-60c0-4718-92ad-6500af9138be",
      "parentId": 2,
      "sort": 16,
      "createBy": "1",
      "createTime": "2022-07-26 15:39:56",
      "updateBy": null,
      "updateTime": null
  },
  {
      "id": "17",
      "tableName": "山东未来15天风速加权+现货均价",
      "url": "http://10.12.7.110:37799/webroot/decision/view/report?viewlet=%25E5%25A4%25A9%25E6%25B6%25A6%252F%25E5%25B1%25B1%25E4%25B8%259C%25E6%259C%25AA%25E6%259D%25A515%25E5%25A4%25A9%25E5%258A%25A0%25E6%259D%2583%25E9%25A3%258E%25E9%2580%259F.cpt&ref_t=design&op=view&ref_c=609077f1-60c0-4718-92ad-6500af9138be",
      "parentId": 2,
      "sort": 17,
      "createBy": "1",
      "createTime": "2022-07-26 15:43:50",
      "updateBy": null,
      "updateTime": null
  },
  {
      "id": "18",
      "tableName": "山东油田光伏出力",
      "url": "http://10.12.7.110:37799/webroot/decision/view/report?viewlet=%25E5%25A4%25A9%25E6%25B6%25A6%252F%25E5%25B1%25B1%25E4%25B8%259C%25E6%25B2%25B9%25E7%2594%25B0%25E5%2585%2589%25E4%25BC%258F%25E5%2587%25BA%25E5%258A%259B%25E9%25A2%2584%25E6%25B5%258B.cpt&ref_t=design&op=view&ref_c=609077f1-60c0-4718-92ad-6500af9138be",
      "parentId": 2,
      "sort": 18,
      "createBy": "1",
      "createTime": "2022-07-26 15:39:56",
      "updateBy": null,
      "updateTime": null
  },
  {
      "id": "19",
      "tableName": "山东胜利油田负荷计划",
      "url": "http://10.12.7.110:37799/webroot/decision/view/report?viewlet=%25E5%25A4%25A9%25E6%25B6%25A6%252F%25E5%25B1%25B1%25E4%25B8%259C%25E8%2583%259C%25E5%2588%25A9%25E6%25B2%25B9%25E7%2594%25B0%25E8%25B4%259F%25E8%258D%25B7%25E8%25AE%25A1%25E5%2588%2592.cpt&ref_t=design&op=view&ref_c=609077f1-60c0-4718-92ad-6500af9138be",
      "parentId": 2,
      "sort": 19,
      "createBy": "1",
      "createTime": "2022-07-26 15:43:50",
      "updateBy": null,
      "updateTime": null
  },
  {
      "id": "20",
      "tableName": "山东集中竞价申报配置",
      "url": "http://10.12.7.110:37799/webroot/decision/view/report?viewlet=%25E5%25A4%25A9%25E6%25B6%25A6%252F%25E5%25B1%25B1%25E4%25B8%259C%25E9%259B%2586%25E4%25B8%25AD%25E7%25AB%259E%25E4%25BB%25B7%25E7%2594%25B3%25E6%258A%25A5%25E9%2585%258D%25E7%25BD%25AE.cpt&ref_t=design&op=write&ref_c=609077f1-60c0-4718-92ad-6500af9138be",
      "parentId": 2,
      "sort": 20,
      "createBy": "1",
      "createTime": "2022-07-26 15:39:56",
      "updateBy": null,
      "updateTime": null
  },
  {
      "id": "21",
      "tableName": "山东零售报价表",
      "url": "http://10.12.7.110:37799/webroot/decision/view/report?viewlet=%25E5%25A4%25A9%25E6%25B6%25A6%252F%25E5%25B1%25B1%25E4%25B8%259C%25E9%259B%25B6%25E5%2594%25AE%25E6%258A%25A5%25E4%25BB%25B7%25E8%25A1%25A8.cpt&ref_t=design&op=write&ref_c=609077f1-60c0-4718-92ad-6500af9138be",
      "parentId": 2,
      "sort": 21,
      "createBy": "1",
      "createTime": "2022-07-26 15:43:50",
      "updateBy": null,
      "updateTime": null
  },
  {
      "id": "22",
      "tableName": "山东全省供需数据分析",
      "url": "http://10.12.7.110:37799/webroot/decision/view/form?viewlet=%25E5%25A4%25A9%25E6%25B6%25A6%252F%25E5%25B1%25B1%25E4%25B8%259C-%25E5%2585%25A8%25E7%259C%2581%25E4%25BE%259B%25E9%259C%2580%25E6%2595%25B0%25E6%258D%25AE%25E5%2588%2586%25E6%259E%2590.frm&ref_t=design&ref_c=609077f1-60c0-4718-92ad-6500af9138be",
      "parentId": 2,
      "sort": 22,
      "createBy": "1",
      "createTime": "2022-07-26 15:39:56",
      "updateBy": null,
      "updateTime": null
  },
  {
      "id": "23",
      "tableName": "山西4日电价预测",
      "url": "http://10.12.7.110:37799/webroot/decision/view/report?viewlet=%25E5%25A4%25A9%25E6%25B6%25A6%252F%25E5%25B1%25B1%25E8%25A5%25BF%25E6%2597%25A5%25E5%2589%258D%25E7%2594%25B5%25E4%25BB%25B7%25E9%25A2%2584%25E6%25B5%258B.cpt&ref_t=design&op=write&ref_c=609077f1-60c0-4718-92ad-6500af9138be",
      "parentId": 3,
      "sort": 23,
      "createBy": "1",
      "createTime": "2022-07-26 15:43:50",
      "updateBy": null,
      "updateTime": null
  },
  {
    "id": 1,
    "tableName": "其他",
    "url": "http://10.12.7.110:37799/webroot/decision/view/report?viewlet=%25E5%25A4%25A9%25E6%25B6%25A6%252F%25E5%25B1%25B1%25E8%25A5%25BF%25E6%2597%25A5%25E5%2589%258D%25E7%2594%25B5%25E4%25BB%25B7%25E9%25A2%2584%25E6%25B5%258B.cpt&ref_t=design&op=write&ref_c=609077f1-60c0-4718-92ad-6500af9138be",
    "parentId": 0,
    "sort": 23,
    "createBy": "1",
    "createTime": "2022-07-26 15:43:50",
    "updateBy": null,
    "updateTime": null
}
]
arr.forEach(item => { 
  item.id = item.id * 1
})
console.log(arr)
// arr.forEach(item => console.log(item))
// function toTree(data){
//   const map = new Map();
//   const res = [];
//   data.forEach(item => map.set(item.id, item))
//   data.forEach(item => {
//     let { parentId } = item,
//         parent;
//     console.log(parentId)
//     if(parentId === 0) {
//       res.push(item)
//       console.log(res)
//       return
//     }
//     parent = map.get(item.parentId)
//     console.log(parent)
//     parent.children ? parent.children.push(item) : parent.children = [item]
//   })
//   return res
// }
//  toTree(arr)

function toTree(data) {
  const obj ={}
  const ans = []
  data.forEach(item => {
  obj[item.id] = item
  })
  data.forEach(item => {
    if(obj[item.parentId]){
      obj[item.parentId].children ? obj[item.parentId].children.push(item) : obj[item.parentId].children = [item]
    } else{
      ans.push(item)
    }
  })
  return ans
}
const tree = toTree(arr)
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
export default function Tab() {
  const [form] = Form.useForm();
  const [data, setData] = useState(tree);
  const [editingId, setEditingId] = useState('');

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('请添加数据');

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
  const remove = (record) => {
    // const filterData = data.filter(item => item.id !== record.id)
    console.log(record)
    // setData(filterData);
    
  };

  const cancel = () => {
    setEditingId('');
  };
  //新增数据相关
  const showModal = () => {
    setVisible(true);
  };
  // 弹窗确认
  const handleOk = () => {
    setModalText('正在添加数据，请稍等...');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      setModalText('请添加数据');
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };
  //添加数据成功回调
  const onFinish = (values) => {
    console.log(values);
    handleOk()
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const save = async (record) => {
    try {
      const row = await form.validateFields();
      // const newData = [...data];
      const index = data.findIndex((item) => record.id === item.id);
      const newRecord = { ...data[index], ...row }
      console.log(newRecord);
      setEditingId('')
      
      // if (index > -1) {
      //   const item = newData[index];
      //   const newRecord = { ...item, ...row }
      //   newData.splice(index, 1, { ...item, ...row });
      //   console.log(newRecord);
      //   setData(newData);
      //   setEditingId('');
      // } else {
      //   newData.push(row);
      //   setData(newData);
      //   setEditingId('');
      // }
      // console.log(record)
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
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
            <Popconfirm
              title="确定取消保存吗?"
              okText="确定"
              cancelText="返回"
              onConfirm={cancel}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          record.url &&
          <>
            <Typography.Link disabled={editingId !== ''} onClick={() => edit(record)}>
              编辑
            </Typography.Link>

            <Typography.Link style={{marginLeft:10,color:'red'}} disabled={editingId !== ''} onClick={() => remove(record)}>
              删除
            </Typography.Link>
          </>
        );
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
    <>
      <Button type='primary' onClick={showModal}>新增数据</Button>
      <Modal
        title={modalText}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
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
            label="区域选择"
            name="pid"
            rules={[
              {
                required: true,
                message: '区域不能为空！',
              },
            ]}
          >
            <Select>
              <Select.Option value="1">山东售电交易</Select.Option>
              <Select.Option value="2">山西售电交易</Select.Option>
              <Select.Option value="3">其他</Select.Option>
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
    </>
  );
};


