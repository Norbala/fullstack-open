const Header = (props) => {
  
  return (
  <h1>{props.course}</h1>
  )
};
//
let Part = (props) => {
  return (
    <>
    <p>
    {props.obj.name} {props.obj.exercises}
  </p>
    </>
  )
}

let Content = (props) => {

  return (
  <>
  <Part obj={props.part[0]} />
  <Part obj={props.part[1]} />
  <Part obj={props.part[2]} />
  </>
  )
};




const Total = (props) => {
  return (
    
    <p> Number of exercises {(props.part[0].exercises) + props.part[1].exercises + props.part[2].exercises} </p>

  )
  }




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
      <Content part={course.parts} /> 
      <Total part={course.parts}/>

     
      
    </div>
  )
}



export default App;