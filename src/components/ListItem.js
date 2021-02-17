import React from 'react';
import { ListGroup } from 'react-bootstrap';


const ListItem = ({student}) => (
	<ListGroup.Item action>
		{student.name}
	</ListGroup.Item>
)

export default ListItem

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

