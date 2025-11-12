const Content = (props) => {
  return (
    <div>
      {props.osat.map(osa => (
        <p key={osa.id}>
          {osa.name} {osa.exercises}
        </p>
      ))}
    </div>
  )
}
const Course = ({ course }) => {
  
  return (
    <div>
      <h1>{course.name}</h1>
      <Content
        osat = {course.parts}
        
      />
    </div>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App