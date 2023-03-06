import React,{useEffect,useState} from 'react';
import { Table } from 'antd';
import { Button,Modal, Form, Input, message} from 'antd';
import 'antd/dist/reset.css';
import './App.css';
function App(){
  const [list,setList] = useState([]);
  const obj = {userId:123,title:'just for test'};
  const [open, setOpen] = useState(false);
  const [edit, setEidt] = useState(false);
  const [delId, setDelId] = useState(0);
  const [openDel, setOpenDel] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm()
//get records
  const  getList =() =>{
    
    fetch(`http://127.0.0.1:8888/api/query`,{
      method:'post',
      body:JSON.stringify(obj)
  }).then(res=>{
      return res.json();
    }).then(res=>{
      if(res.errorCode === 1000){
        setList(res.data);
      }else{
        messageApi.open({
        typec: 'error',
        content: res.errorMsg,
        duration: 2.5,
        })
      }
    }).catch(err=>{
      err = [
        {
          user_id: '',
          title: '',
        },
      ]
      setList(err)
    })
  
  }
  
  useEffect(getList,[])
//show the form
  const showModal = (record) => {
    form.resetFields()
    if(record !=='add'){ 
      setEidt(true)
      let initialVal = {
        id:record.id,
        title:record.title
      }
      form.setFieldsValue(initialVal)
    }else{
      setEidt(false)
    }
    
    setOpen(true);
  };
  const handleOk = () => {
    
     let postUrl = 'http://127.0.0.1:8888/api/add'
     if(edit){
      postUrl = 'http://127.0.0.1:8888/api/update'
     }
     form.validateFields().then(values=>{
      setConfirmLoading(true);
      let params = values
      fetch(postUrl,{method:'post',body:JSON.stringify(params)}).then(res=>{
        return res.json()
       }).then(res=>{
        getList()
        setOpen(false);
        setConfirmLoading(false);
       }).catch(res=>{
        getList()
        setOpen(false);
        setConfirmLoading(false);
       })
     })
   
  };
  const handleCancel = () => {
    setOpen(false);
    setConfirmLoading(false);
  };
 //delete
  const showDelModal = (record)=>{
    setDelId(record.id)
    setOpenDel(true);
  }
  const handleDelOk = () => {
    let params = {
      id:delId
    }
    let postUrl = 'http://127.0.0.1:8888/api/delete'
    setConfirmLoading(true);
    fetch(postUrl,{method:'post',body:JSON.stringify(params)}).then(res=>{
      return res.json()
    }).then(res=>{
      getList()
      setOpen(false);
      setConfirmLoading(false);
    }).catch(res=>{
      getList()
      setOpen(false);
      setConfirmLoading(false);
    })

    setOpenDel(false);
  };

  const handleDelCancel = () => {
    setOpenDel(false);
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const columns = [
    {
      title: 'userID',
      dataIndex: 'user_id',
      key: 'user_id',
    },
    {
      title: 'TITLE',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'OPTION',
      key: '',
      render: (_, record) => {
        return (
          <space>
            <Button size="middle" onClick={()=>showModal(record)}>
              MODIFY
            </Button>
            <Button size="middle" onClick={()=>showDelModal(record)}>
              DELETE
            </Button>
          </space>
        )
      }
    }
  ];
  return(
    <div className="App">
    <Table dataSource={list} columns={columns} />
    <Button type="primary" onClick={()=>showModal('add')}>New Duty</Button>
    <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
       <Form
      {...layout}
      form={form}
      name="control-hooks"
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
      name="id"
      label="id"
      hidden={true}
    >
    </Form.Item>
    <Form.Item
      name="title"
      label="text"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input maxLength={25}/>
    </Form.Item>
  </Form>
  
    </Modal>
    <Modal title="" open={openDel} onOk={handleDelOk} onCancel={handleDelCancel}>
        CONFIRM DELETE？
    </Modal>
    <>
      {contextHolder}
    </>
   </div>
  )
}

export default App;
