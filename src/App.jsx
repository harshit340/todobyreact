import { useEffect, useState } from 'react'
import './App.css'
import { Todoprovider } from './contexts'
import TodoForm from './components/TodoForm'
import Todoitem from './components/Todoitem'
function App() {
  const [todos , setTodos] = useState([])

  // writting the functionality of the function
  const addTodo = (todo) =>{
    setTodos((prev) => [{id:Date.now(), ...todo}, ...prev])
  }

  const updatedTodo = (id,todo) => {
    // using the map which will iterate on each element and search the eleemnt which have id === prevtodo.id 
    setTodos((prev) => prev.map((prevTodo)=>(prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) =>{
   setTodos((prev) => prev.filter((todo)=>todo.id!==id))
  }

  const toggleComplete =  (id) =>{
   setTodos(
   (prev)=>prev.map(
    (prevTodo)=>prevTodo.id === id?{...prevTodo , complete: !prevTodo.completed} : prevTodo
    )
    )
  }

  // it will use bcoz when we refresh the website all the inital todo data should be remain same 
  useEffect(()=>{
   const todos = JSON.parse(localStorage.getItem("todos"))
   if (todos && todos.length>0){
   setTodos(todos);
   }

  },[])

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])


  return (
    //passing all the functionlity in value 
    <Todoprovider value={{todos,addTodo,updatedTodo, deleteTodo,toggleComplete}}>
   <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo)=>{
                          return(
                          <div key={todo.id} className='w-full'>
                           <Todoitem todo={todo}/>
                           </div>
                           )
                        })}
                    </div>
                </div>
            </div>
    </Todoprovider>
  )
}

export default App
