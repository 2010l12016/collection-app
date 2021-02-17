import React from 'react';
import {Button} from 'react-bootstrap'

const Row = ({index, student, toggleGraduated, deleteStudent}) => {
  const label = student.graduated 
  ? "mark as ungraduated" 
  : "mark as graduated"
  return (
    <tr>
      <td>{index+1}</td>
			<td>{student.id}</td>
			<td>{student.name}</td>
			<td><Button variant="success" onClick={toggleGraduated}>{label}</Button></td>
			<td><Button variant="danger "onClick={deleteStudent}>delete</Button></td>

    
    </tr>
  )
}
export default Row

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

