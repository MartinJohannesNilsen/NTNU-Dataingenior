// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';

class Student {
  id: number;
  static nextId = 1;

  firstName: string;
  lastName: string;
  email: string;
  courses;

  constructor(firstName: string, lastName: string, email: string, courses) {
    this.id = Student.nextId++;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.courses = courses;
  }
}

class Course {
  id: number;
  static nextId = 1;

  code: string;
  title: string;

  constructor(code: string, title: string){
    this.id = Course.nextId++;
    this.code = code;
    this.title = title;
  }
}

let courses = [
  new Course('TDAT2001', 'Realgfag for dataingeniører'),
  new Course('TDAT2002', 'Matematikk 2'),
  new Course('TDAT2003', 'Systemutvikling 2'),
  new Course('TDAT2005', 'Algoritmer og Datastrukturer')
];

let students = [
  new Student('Martin Johannes', 'Nilsen', 'martijni@stud.ntnu.no', [courses[0], courses[1], courses[2], courses[3]]),
  new Student('Simon', 'Årdal', 'simonaa@stud.ntnu.no', [courses[2], courses[3]]),
  new Student('Lea', 'Grønning', 'leagr@stud.ntnu.no', [courses[1], courses[3]]),
  new Student('Ole Jonas', 'Liahagen', 'olejl@stud.ntnu.no', [courses[2], courses[3]]),
  new Student('Max Torre', 'Schau', 'maxts@stud.ntnu.no', [courses[1], courses[2], courses[3]])
];

class Card extends Component <{title : string}> {
  render() {
    return(
        <div className="card">
          <h4>{this.props.title}</h4>
          <p>{this.props.children}</p>
        </div>
    )
  }
}

class Menu extends Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td>
              <NavLink class="navbar navbar-light bg-transparent" to="/">
                <a class="navbar-brand">Home</a>
              </NavLink>
            </td>
            <td>
              <NavLink class="navbar navbar-light bg-transparent" to="/students">
                <a class="navbar-brand">Students</a>
              </NavLink>
            </td>
            <td>
              <NavLink class="navbar navbar-light bg-transparent" to="/courses">
                <a class="navbar-brand">Courses</a>
              </NavLink>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

class Home extends Component {
  render() {
    return (
    <div>
      <a>Øving 9</a>
    </div>
  );}
}

class StudentList extends Component {
  render() {
    return (
      <div class="card">
        <h4 class="card-title">Students</h4>
        <ul class="list-group list-group-flush">
          {students.map(student => (
            <li class="list-group-item" key={student.id}>
              <NavLink activeStyle={{ color: 'darkblue' }} to={'/students/' + student.id}>
                {student.firstName} {student.lastName}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

class StudentDetails extends Component<{ match: { params: { id: number } } }> {
  render() {
    let student = students.find(student => student.id == this.props.match.params.id);
    if (!student) {
      console.error('Student not found'); // Until we have a warning/error system (next week)
      return null; // Return empty object (nothing to render)
    }
    return (
      <card title="Details">
        <h4 class="card-title">Details</h4>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">First name: {student.firstName}</li>
          <li class="list-group-item">Last name: {student.lastName}</li>
          <li class="list-group-item">Email: {student.email}</li>
          <div class="card">
            <div class="card-header">
               <h5>Subjects: </h5>
            </div>
            <ul class="list-group list-group-flush">
              {student.courses.map(a => (
                <li class="list-group-item">
                  {a.title}
                </li>
              ))}
            </ul>
          </div>
        </ul>
      </card>
    );
  }
}


/*
<div class="Card">
        <h4 class="card-title">Details</h4>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">First name: {student.firstName}</li>
          <li class="list-group-item">Last name: {student.lastName}</li>
          <li class="list-group-item">Email: {student.email}</li>
          <div class="card">
            <div class="card-header">
               <h5>Subjects: </h5>
            </div>
            <ul class="list-group list-group-flush">
              {student.courses.map(a => (
                <li class="list-group-item">
                  {a.title}
                </li>
              ))}
            </ul>
          </div>
        </ul>
      </div>
*/

class CoursesList extends Component {
  render() {
    return (
      <div class="Card">
        <h4 class="card-title">Courses</h4>
        <div class="card">
          <ul class="list-group list-group-flush">
            {courses.map(course => (
              <li class="list-group-item" key={course.id}>
                <NavLink activeStyle={{ color: 'darkblue' }} to={'/courses/' + course.id}>
                  {course.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

class CourseDetails extends Component<{ match: { params: { id: number } } }> {
  render() {
    let course = courses.find(course => course.id == this.props.match.params.id);
    if (!course) {
      console.error('Student not found'); // Until we have a warning/error system (next week)
      return null; // Return empty object (nothing to render)
    }
    let participants = students.filter(a => a.courses.find(b => b.id == course.id));
    //let participants = students.filter(a => a.courses.includes(course.code));
    return (
      <div class="Card">
        <h4 class="card-title">Details</h4>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Code: {course.code}</li>
          <li class="list-group-item">Title: {course.title}</li>
          <div class="card">
            <div class="card-header">
               <h5>Students:</h5>
            </div>
            <ul class="list-group list-group-flush">
              {participants.map(a => (
                <li class="list-group-item">
                  {a.firstName} {a.lastName}
                </li>
              ))}
            </ul>
          </div>
        </ul>
      </div>
    );
  }
}

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Menu />
        <Route exact path="/" component={Home} />
        <Route path="/students" component={StudentList} />
        <Route path="/students/:id" component={StudentDetails} />
        <Route path="/courses" component={CoursesList} />
        <Route path="/courses/:id" component={CourseDetails} />
      </div>
    </HashRouter>,
    root
  );

  
