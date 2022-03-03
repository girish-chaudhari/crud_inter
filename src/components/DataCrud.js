import React, { useEffect, useState } from 'react'
import { ToDoUserSchema } from './ValidationSchema'
import { Field, Formik } from 'formik';
import { data } from './_data'


const DataCrud = () => {


    const [dataList, setDataList] = useState([]);
    const [updateDataList, setUpdateDataList] = useState({});

    const [updateName, setUpdateName] = useState('');
    const [updateEmail, setUpdateEmail] = useState();
    const [updateMobile, setUpdateMobile] = useState();
    const [updateProject, setUpdateProject] = useState();
    const [updateTask, setUpdateTask] = useState();
    const [updateStartDate, setUpdateStartDate] = useState();
    const [updateEndDate, setUpdateEndDate] = useState();
    const [updateId, setUpdateId] = useState();
    const [snapShot, setSnapShot] = useState([])
    const [isFilter, setIsFilter] = useState(false)

    const [dataView, setDataView] = useState({});

    // let updateDataList ;
    function fetchData() {
        setDataList(data);
    }

    const handleUpdate = (id) => {
        //   Editable = true;
        console.log(id)
        console.log("id with data", dataList[id])
        setUpdateDataList(dataList[id])
        // updateDataList = dataList[id]
        console.log("update data list", updateDataList)
        setUpdateName(dataList[id].name)
        setUpdateEmail(dataList[id].email)
        setUpdateMobile(dataList[id].mobile)
        setUpdateProject(dataList[id].project)
        setUpdateTask(dataList[id].task)
        setUpdateStartDate(dataList[id].updateStartDate)
        setUpdateEndDate(dataList[id].updateEndDate)
        setUpdateId(dataList[id].id)
    }


    const handleDelete = (id) => {
        // setIsFilter(false) 
         
        let deletedData = [...dataList]
        let deletedSnapData = [...snapShot]
        let eleIndex = deletedData.findIndex(item => item.id === id)
        
        let eleIndexinFilter = snapShot.findIndex(item => item.id === id)

        deletedData.splice(eleIndex, 1)

        setDataList(deletedData);
        if(eleIndexinFilter >=0){
             deletedSnapData.splice(eleIndexinFilter, 1) 
            setSnapShot(deletedSnapData)
    }
        } 

    const handleFormSubmit = (values) => {
        console.log("values ==>", values);
        // data.push(values)

        values.id = dataList.length;
        // data[dataList.length] = values
        console.log('datalist ===>', dataList);
// setIsFilter(false)
        setDataList([...dataList, values])
        
        console.log('datalist ===>', dataList)
        // fetchData()
    }
    const handleFormUpdate = () => {
        // updateId
        // console.log("values ==>", updateDataList.id);
        // let obj = {
        //     name: updateName,
        //     updateEmail,
        //     updateMobile,
        //     updateTask,
        //     updateProject,
        //     updateStartDate,
        //     updateEndDate,
        // }
        // // let data = dataList
        // // data[updateId] = obj
        // console.log('data', data, "i => ", updateId)
        // setDataList(dataList.filter(item => item.id == updateId ? item.name = updateName : item))
        // setDataList(dataList.filter(item => item.id == updateId ? item.email = updateEmail : item))
        // setDataList(dataList.filter(item => item.id == updateId ? item.mobile = updateMobile : item))
        // setDataList(dataList.filter(item => item.id == updateId ? item.project = updateProject : item))
        // setDataList(dataList.filter(item => item.id == updateId ? item.task = updateTask : item))
        // setDataList(dataList.filter(item => item.id == updateId ? item.start_time = updateStartDate : item))
        // setDataList(dataList.filter(item => item.id == updateId ? item.end_time = updateEndDate : item))
    }

    function handleselect(e) {
        let selected = e.target.value
        setIsFilter(true)
        if(selected === "all"){
            setIsFilter(false)
        }else{
            let x = dataList.filter(a => a.status == selected);
            setSnapShot(x)
        }
       
    }

    const viewFields = (values) => {
        setDataView(values)
        console.log("values", dataView);
    }
    useEffect(() => {
        fetchData()
    }, [])

    const handleData = () => {
     console.log("datalist.... my ", dataList)
 }
    useEffect(() => {
        handleData()
    }, [dataList])


    return (
        <div>
            <Formik
                initialValues={{
                    name: "dummy",
                    email: 'demo@gmail.com',
                    mobile: '2342342343',
                    project: 'UI DEV',
                    task: 'ui admin',
                    status: 'planned',
                    start_time: '2022-03-05',
                    end_time: '2022-04-05'
                }}
                validationSchema={ToDoUserSchema}
                onSubmit={handleFormSubmit}
            >
                {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
                    <div>
                        <div className="row">
                            <div className="col">
                                <div className="card">
                                    <form onSubmit={handleSubmit} noValidate>
                                        <div className="form">
                                            <div className="input-form">
                                                <label htmlFor="name">Name</label>
                                                <input
                                                    type="text"
                                                    value={values.name}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    id="name"
                                                    // onKeyDown={NameControl}
                                                    className="input-control"
                                                />
                                                <div className="error">{errors.name}</div>
                                            </div>
                                            <div className="input-form">
                                                <label htmlFor="email">email</label>
                                                <input
                                                    type="text"
                                                    value={values.email}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    id="email"
                                                    className="input-control"
                                                />
                                                <div className="error">{errors.email}</div>
                                            </div>
                                            <div className="input-form">
                                                <label htmlFor="mobile">Mobile no</label>
                                                <input
                                                    type="text"
                                                    id="mobile"
                                                    value={values.mobile}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    maxLength="10"
                                                    className="input-control"
                                                />
                                                <div className="error">{errors.mobile}</div>
                                            </div>
                                            <div className="input-form">
                                                <label htmlFor="project">Project name</label>
                                                <input
                                                    type="text"
                                                    value={values.project}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    id="project"
                                                    className="input-control"
                                                />
                                                <div className="error">{errors.project}</div>
                                            </div>
                                            <div className="input-form">
                                                <label htmlFor="task">Task</label>
                                                <input
                                                    type="text"
                                                    id="task"
                                                    value={values.task}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    className="input-control"
                                                />
                                                <div className="error">{errors.task}</div>
                                            </div>
                                            <div className="input-form">
                                                <label htmlFor="start-date">Start Date</label>
                                                <input
                                                    type="date"
                                                    id="start-date"
                                                    name='start_time'
                                                    value={values.start_time}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                />
                                                <div className="error">{errors.start_time}</div>
                                            </div>
                                            <div className="input-form">
                                                <label htmlFor="end-date">Start Date</label>
                                                <input
                                                    type="date"
                                                    id="end-date"
                                                    name='end_time'
                                                    value={values.end_time}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                />
                                                <div className="error">{errors.end_time}</div>
                                            </div>
                                            <div className="input-form task-status">
                                                <div className="radio-control">
                                                    <Field
                                                        type="radio"
                                                        id="planned"
                                                        name="status"
                                                        value="planned"
                                                    // onChange={(e) => setStatus(e.target.value)}
                                                    />
                                                    <label htmlFor="planned">planned</label>
                                                </div>
                                                <div className="radio-control">
                                                    <Field
                                                        type="radio"
                                                        id="progress"
                                                        name="status"
                                                        value="progress"
                                                    // onChange={(e) => setStatus(e.target.value)}
                                                    />
                                                    <label htmlFor="progress">progress</label>
                                                </div>
                                                <div className="radio-control">
                                                    <Field
                                                        type="radio"
                                                        id="done"
                                                        name="status"
                                                        value="done"
                                                    // onChange={(e) => setStatus(e.target.value)}
                                                    />
                                                    <label htmlFor="done">done</label>
                                                    {/* <div className='error'>{errors.status}</div> */}
                                                </div>
                                            </div>
                                            <button
                                                type="submit"
                                                className="btn success"
                                                onClick={handleSubmit}
                                            >
                                                submit
                                            </button>
                                            &nbsp;
                                            <button className='btn warning btn-view' onClick={() => viewFields(values)}> View</button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                            <div className="col col-table">
                                <select name="filter" id="filterOption" onChange={handleselect}>
                                    <option value="all">All</option>
                                    <option value="done">Done</option>
                                    <option value="progress">Progress</option>
                                    <option value="planned">Planned</option>
                                </select>
                                <div className="list">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Mobile No.</th>
                                                <th>Project Name.</th>
                                                <th>Task</th>
                                                <th>Task Status</th>
                                                <th>Start Date</th>
                                                <th>End Date</th>
                                                <th>Edit Update</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {!isFilter ? dataList.map((item, i) => (
                                                <tr key={i}>
                                                    <td>{i}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.mobile}</td>
                                                    <td>{item.project}</td>
                                                    <td>{item.task}</td>
                                                    <td>{item.status}</td>
                                                    <td>{item.start_time}</td>
                                                    <td>{item.end_time}</td>
                                                    <td className="buttons">
                                                        <button
                                                            className="btn warning"
                                                            onClick={() => handleUpdate(i)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            name={item.name}
                                                            className="btn danger"
                                                            onClick={() => handleDelete(item.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            )) : snapShot.map((item, i) => (
                                                <tr key={i}>
                                                    <td>{i}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.mobile}</td>
                                                    <td>{item.project}</td>
                                                    <td>{item.task}</td>
                                                    <td>{item.status}</td>
                                                    <td>{item.start_time}</td>
                                                    <td>{item.end_time}</td>
                                                    <td className="buttons">
                                                        <button
                                                            className="btn warning"
                                                            onClick={() => handleUpdate(i)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            name={item.name}
                                                            className="btn danger"
                                                            onClick={() => handleDelete(item.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Formik>

            <div className="updateData">
                {

                    <div className="card">
                        <div className="form">
                            <div className="input-form">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    value={updateName}
                                    onChange={(e) => { setUpdateName(e.target.value) }}
                                    // onBlur={handleBlur}
                                    // onChange={handleChange}
                                    id="name"
                                    // onKeyDown={NameControl}
                                    className="input-control"
                                />
                                {/* <div className="error">{errors.name}</div> */}
                            </div>
                            <div className="input-form">
                                <label htmlFor="email">email</label>
                                <input
                                    type="text"
                                    value={updateEmail}
                                    onChange={(e) => { setUpdateEmail(e.target.value) }}

                                    id="email"
                                    className="input-control"
                                />
                                {/* <div className="error">{errors.email}</div> */}
                            </div>
                            <div className="input-form">
                                <label htmlFor="mobile">Mobile no</label>
                                <input
                                    type="text"
                                    id="mobile"
                                    value={updateMobile}
                                    onChange={(e) => { setUpdateMobile(e.target.value) }}
                                    maxLength="10"
                                    className="input-control"
                                />
                                {/* <div className="error">{errors.mobile}</div> */}
                            </div>
                            <div className="input-form">
                                <label htmlFor="project">Project name</label>
                                <input
                                    type="text"
                                    value={updateProject}
                                    onChange={(e) => { setUpdateProject(e.target.value) }}
                                    id="project"
                                    className="input-control"
                                />
                                {/* <div className="error">{errors.project}</div> */}
                            </div>
                            <div className="input-form">
                                <label htmlFor="task">Task</label>
                                <input
                                    type="text"
                                    id="task"
                                    onChange={(e) => { setUpdateTask(e.target.value) }}
                                    value={updateTask}
                                    className="input-control"
                                />
                                {/* <div className="error">{errors.task}</div> */}
                            </div>
                            <div className="input-form">
                                <label htmlFor="start-date">Start Date</label>
                                <input
                                    type="date"
                                    id="start-date"
                                    name='start_time'
                                    value={updateStartDate}
                                    onChange={(e) => { setUpdateStartDate(e.target.value) }}
                                />
                                {/* <div className="error">{errors.start_time}</div> */}
                            </div>
                            <div className="input-form">
                                <label htmlFor="end-date">Start Date</label>
                                <input
                                    type="date"
                                    id="end-date"
                                    name='end_time'
                                    value={updateEndDate}
                                    onChange={(e) => { setUpdateEndDate(e.target.value) }}
                                />
                                {/* <div className="error">{errors.end_time}</div> */}
                            </div>
                            <div className="input-form task-status">
                                <div className="radio-control">
                                    <input
                                        type="radio"
                                        id="planned"
                                        name="status"
                                        value="planned"
                                    // onChange={(e) => setStatus(e.target.value)}
                                    />
                                    <label htmlFor="planned">planned</label>
                                </div>
                                <div className="radio-control">
                                    <input
                                        type="radio"
                                        id="progress"
                                        name="status"
                                        value="progress"
                                    // onChange={(e) => setStatus(e.target.value)}
                                    />
                                    <label htmlFor="progress">progress</label>
                                </div>
                                <div className="radio-control">
                                    <input
                                        type="radio"
                                        id="done"
                                        name="status"
                                        value="done"
                                    // onChange={(e) => setStatus(e.target.value)}
                                    />
                                    <label htmlFor="done">done</label>
                                    {/* <div className='error'>{errors.status}</div> */}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn success"
                                onClick={() => handleFormUpdate()}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                    //                 </form> 
                    //         </div>
                    //     )}

                    // </Formik>

                }


                <div className='data-view'>
                    <div className="header">
                        Data View
                    </div>
                    <div className="card form-control-data">
                        <div className="form-control-view">
                            <div className="label-control">Name</div>
                            <div className="txt-control">{dataView?.name}</div>
                        </div>
                        <div className="form-control-view">
                            <div className="label-control">Email</div>
                            <div className="txt-control">{dataView?.email}</div>
                        </div>
                        <div className="form-control-view">
                            <div className="label-control">Mobile</div>
                            <div className="txt-control">{dataView?.mobile}</div>
                        </div>
                        <div className="form-control-view">
                            <div className="label-control">Project Name</div>
                            <div className="txt-control">{dataView?.project}</div>
                        </div>
                        <div className="form-control-view">
                            <div className="label-control">Task</div>
                            <div className="txt-control">{dataView?.task}</div>
                        </div>
                        <div className="form-control-view">
                            <div className="label-control">Start Date</div>
                            <div className="txt-control">{dataView?.start_time}</div>
                        </div>
                        <div className="form-control-view">
                            <div className="label-control">End Date</div>
                            <div className="txt-control">{dataView?.end_time}</div>
                        </div>
                        <div className="form-control-view">
                            <div className="label-control">Status</div>
                            <div className="txt-control">{dataView?.status}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DataCrud;