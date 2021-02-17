import React, {useState, useEffect} from 'react';
import Row from './components/Row.js';
import ListItem from './components/ListItem.js'
//import axios from 'axios'
import studentService from './services/students'
import {Table,Form,Button,ListGroup } from 'react-bootstrap'
import styled from 'styled-components'

const App = () => {
  const [students, setStudents] = useState([])
  const [newStudent, setNewStudent] = useState('')
  const [showAll, setShowAll] = useState(true)


  const hook = () => {
    console.log("hook")

    studentService
    .getAll()
    //axios
//    .get("http://localhost:3001/students")
    .then(response => {
      console.log("response received")
      setStudents(response.data)
      console.log(students)
      
    })
  }
  useEffect(hook, [])
  console.log('rendering', students.length, 'students')

  const studentsToShow = (() => {
    if (showAll)
      return (students)
    else
      return( students.filter(student => student.graduated === true) )
  })()
  /* equal to
  const studentsToShow = showAll
  ? students
  : students.filter(student => student.graduated === true)
  */

  //Add new element
  const addStudent = (event) => {
    event.preventDefault()
    const studentObject = {
      //id: students.length+1,
      name: newStudent,
    }
    //setStudents(students.concat(studentObject))
    //setNewStudent('')
    studentService
			.create(studentObject)    
//    axios
//			.post("http://localhost:3001/students", studentObject)
			.then(response => {
        setStudents(students.concat(response.data))
        setNewStudent('') //empty button after typing name
        console.log(response)
			})
		

  }
  const handleStudentChange = (event) => {
    setNewStudent(event.target.value)
  }
  const handleViewButtonClick = (event) => {
		setShowAll(!showAll)
	}
  const toggleGraduatedOf = (id) => {
    //const url = "http://localhost:3001/" + id
    // const url = `http://localhost:3001/students/${id}`
    const student = students.find(s => s.id === id)

    const changedStudent = {...student, graduated: !student.graduated}
    console.log('the graduated property of'+ id + 'need to be updated')

    studentService
    .update(id, changedStudent)
//   axios
//      .put(url, changedStudent)
      .then(response => {
        const updatedStudent = response.data
        setStudents(students.map(
          student => student.id !== id ? student : updatedStudent
        ))
      })
  }

  //Delete element
  const deleteStudentWith = (id) => {
    // const url = `http://localhost:3001/students/${id}`
    const student = students.find(s => s.id === id)

    if (window.confirm('Are you sure you want to delete the student these information?\n' + 
                      '• ID: ' + id + '\n' +
                      '• Name: ' + student.name + '\n' +
                      '• Graduated: ' + student.graduated)) {

        studentService
        .remove(id)
//      axios
//        .delete(url)
        .then(response => {
          const studentsCopy = [...students]
          
          setStudents(studentsCopy.filter(s => s.id !== id))
        })
    }
  }

  const YellowButton = styled.button`
    background-color: yellow;
    color: black;
    border-radius: 5px;
    padding: 5px 10px;
  `
  return(
    <div className="container">
      <form onSubmit={addStudent}>
				<Form.Control placeholder='type a name here'  value={newStudent} onChange={handleStudentChange}/>
				  <button type="submit">Add</button>
          
			</form>
      <Button variant="warning" onClick={handleViewButtonClick}>Show graduated only </Button>
     
      <Table striped hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>name</th>
          </tr>
        </thead>
        <tbody>
          {studentsToShow.map(
            (student,index) =>
            <Row key={student.id} index={index} student={student} 
                 toggleGraduated={() => toggleGraduatedOf(student.id)}
                 deleteStudent={() => deleteStudentWith(student.id)}/>
          )}
          {/* <tr>  the second way
            <td> {students[0].id}</td>
            <td> {students[0].name}</td>
          </tr>
          <tr>
            <td> {students[1].id}</td>
            <td> {students[1].name}</td>
          </tr>
          <tr>
            <td> {students[2].id}</td>
            <td> {students[2].name}</td>
          </tr> */}
        </tbody>
      </Table>
      <p>List of students:</p>
			<ListGroup>
				{studentsToShow.map(student =>
					<ListItem key={student.id} student={student} />
				)}
			</ListGroup>
    </div>
  )
}

export default App

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

