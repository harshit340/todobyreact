import {createContext,useContext} from 'react'

export const TodoContext = createContext({

    //properties
 todos:[
    {
        id:1,
        todo:"Todo msg",
        completed : false,
    }
 ],
 //functionality  -> we will only write name not what it will do 

 addTodo: (todo) => {},
 updatedTodo: (id,todo) => {},
 deleteTodo: (id) => {},
 toggleComplete: (id) => {}
 
})

export const useTodo = () =>{
    return useContext(TodoContext)
}

export const Todoprovider = TodoContext.Provider;