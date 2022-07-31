import React,{ useState } from 'react'
import { getTableList, getUsers } from '../../services/recommend';
import { useEffect } from 'react';
import AddModal from './AddInfo';
import AddMenu from './AddMenu';
import MainTable from './MainTable';


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

export default function Tab() {
  const [data, setData] = useState([]);
  const [menuList, setMenuList] = useState([])


  useEffect(() => {
    getTable()
  },[])
  const getTable = async () => {
    const params = {menuCode:'myMenu'}
    const res = await getTableList(params)
    if(res.statusCode === 1000){
      const { data } = res
      const menuList = data.filter((item) => !item.url)
      setMenuList(menuList)
      console.log(menuList)
      const newData = data.slice()
      const tree = toTree(newData)
      setData(tree)
    }
  }
  const getMyuser = async() =>{
    const { users } = await getUsers()
    setData(users)
    
  }

  return (
    <>
      <AddModal menuList={ menuList } />
      <AddMenu menuList={ menuList } />
      <MainTable data = { data } />
    </>
  );
};


