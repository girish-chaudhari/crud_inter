import React, { useEffect, useState } from 'react';
import { ToDoUserSchema } from './ValidationSchema';
import { Field, Formik } from 'formik';
import { data } from './_data';

const DataCrud = () => {
  const [dataList, setDataList] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updatedId, setUpdateId] = useState(undefined);
  const [updateState, setUpdateState] = useState({
    name: '',
    email: '',
    mobile: '',
    project: '',
    task: '',
    status: '',
    start_time: '',
    end_time: ''
  });

  const [snapShot, setSnapShot] = useState([]);
  const [isFilter, setIsFilter] = useState(false);

  const [dataView, setDataView] = useState({});

  // let updateDataList ;
  function fetchData() {
    setDataList(data);
  }

  const handleDelete = (id) => {
    let deletedData = [...dataList];
    let deletedSnapData = [...snapShot];
    let eleIndex = deletedData.findIndex((item) => item.id === id);
    let eleIndexinFilter = deletedSnapData.findIndex((item) => item.id === id);
    console.log('element snap deleted index =>', eleIndex);
    console.log('element snap deleted index =>', eleIndexinFilter);
    deletedData.splice(eleIndex, 1);
    setDataList(deletedData);
    if (eleIndexinFilter >= 0) {
      deletedSnapData.splice(eleIndexinFilter, 1);
      setSnapShot(deletedSnapData);
    }
  };

  const handleUpdate = (id) => {
    let data = dataList.find((item) => item.id === id);
    console.log('data....... is:::::', data);
    setIsUpdate(true);
    setUpdateState(data);
    setUpdateId(id);

    console.log('setUpdated.........status....................................', updateState);
  };

  const handleFormSubmit = (values) => {
    console.log('isupdated...', isUpdate);
    console.log('is..updaedId', updatedId);
    if (isUpdate) {
      //update thing coming
      let datalist = [...dataList];
      let udpatedIndex = datalist.findIndex((item) => item.id == updatedId);
      console.log('updatedIndex', udpatedIndex);
      datalist[udpatedIndex] = values;
      setDataList(datalist);

      setUpdateState({
        name: '',
        email: '',
        mobile: '',
        project: '',
        task: '',
        status: '',
        start_time: '',
        end_time: ''
      });
    } else {
      let id = dataList.length;
      values.id = id + 1;
      // console.log('id deleted ');
      setDataList([...dataList, values]);
    }

    setIsUpdate(false);

    // fetchData()
  };

  function handleselect(e) {
    let selected = e.target.value;
    setIsFilter(true);
    if (selected === 'all') {
      setIsFilter(false);
    } else {
      let x = dataList.filter((a) => a.status == selected);
      setSnapShot(x);
    }
  }

  const viewFields = (values) => {
    setDataView(values);
    console.log('values', dataView);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleData = () => {
    console.log('datalist.... my ', dataList);
  };
  useEffect(() => {
    handleData();
  }, [dataList]);

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={updateState}
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
                          name="start_time"
                          value={values.start_time}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <div className="error">{errors.start_time}</div>
                      </div>
                      <div className="input-form">
                        <label htmlFor="end-date">End Date</label>
                        <input
                          type="date"
                          id="end-date"
                          name="end_time"
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
                      <button type="submit" className="btn success" onClick={handleSubmit}>
                        {isUpdate ? 'Update' : 'Submit'}
                      </button>
                      &nbsp;
                      {/* <button className="btn warning btn-view" onClick={() => viewFields(values)}>
                        View
                      </button> */}
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
                        <th>Index</th>
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
                      {!isFilter
                        ? dataList.map((item, i) => (
                            <tr key={i}>
                              <td>{i}</td>
                              <td>{item.id}</td>
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
                                  onClick={() => handleUpdate(item.id)}
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
                          ))
                        : snapShot.map((item, i) => (
                            <tr key={i}>
                              <td>{i}</td>
                              <td>{item.id}</td>
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
                                  onClick={() => handleUpdate(item.id)}
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
                          ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default DataCrud;
