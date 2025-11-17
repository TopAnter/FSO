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

const Total = (props) => {
  return(
    <p style = {{fontWeight: 'bold'}}>Total of {props.parts.reduce((sum, osa) => sum + osa.exercises, 0)} exercises</p>
  )
}
const Course = ({ course }) => {
  
  return (
    <div>
      <h1>{course.name}</h1>
      <Content
        osat = {course.parts}
      />
      <Total
        parts = {course.parts}
      />
    </div>
  )
}
export default Course;