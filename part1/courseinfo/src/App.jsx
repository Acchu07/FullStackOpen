const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content part={course.parts}/>
      <Total part={course.parts}/>
    </div>
  )
}

const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => {
  return (
    <div>
      <Part part={props.part[0]} />
      <Part part={props.part[1]} />
      <Part part={props.part[2]} />
    </div>
  )
}

const Part = (props) => <p>{props.part.name} {props.part.exercises}</p>

const Total = (props) => <p>Number of exercises {props.part[0].exercises + props.part[1].exercises + props.part[2].exercises}</p>

export default App