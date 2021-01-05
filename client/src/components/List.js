import React, { Fragment, useState, useEffect } from 'react';
import Edit from './Edit';

function List() {
  const [data, setData] = useState([]);
  const getDatas = async () => {
    try {
      const res = await fetch('http://localhost:5000/pern');
      //   console.log(res);
      const jsonRes = await res.json();
      setData(jsonRes);
    } catch (error) {
      console.error(error.message);
    }
  };

  //delete function
  const deleteData = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/pern/${id}`, {
        method: 'DELETE'
      });

      setData(data.filter((d) => d.pern_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getDatas();
  }, []);
  console.log(data);
  return (
    <Fragment>
      <table className='table mt-5 text-center'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.pern_id}>
              <td>{d.description}</td>
              <td>
                <Edit data={d} />
              </td>
              <td>
                <button
                  className='btn btn-danger'
                  onClick={() => deleteData(d.pern_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export default List;
