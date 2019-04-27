import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 'asdfwe', name: 'Adam', age: 48 },
      { id: 'fghjghj', name: 'Max', age: 28 },
      { id: 'rtyrte', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.userId === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex])

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( {persons: persons} )
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
              click={() => this.deletePersonHandler(index)}
              name={person.name} 
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div>
      );

      btnClass = classes.Red;

    }

    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push( classes.red ); // classes will be 'red'
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push( classes.bold ); // classes now ['red', 'bold']
    }

    return (
      <div className={classes.App}>
        <h1>Hi, I'm still a React App</h1>
        <p className={assignedClasses.join(' ')}>And it's really doing stuff.</p>
        <button 
          className={btnClass}
          onClick={this.togglePersonsHandler}>Toggle Names</button>
          {persons}
      </div>
    )
  }
}

export default App;


/* class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hi, I'm still a React App</h1>
        <p>And it's really doing stuff.</p>
        <Person name="Max" age="28" />
        <Person name="Adam" age="48">My Hobbies: Racing</Person>
        <Person name="Stephanie" age="30" />
      </div>
    );
  }
}

export default App; */
