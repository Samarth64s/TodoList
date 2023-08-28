import React, { useEffect, useState } from 'react';
import "./todo.css";

const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");
  
  if(lists){
    return JSON.parse(lists);
  }else{
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setitems] = useState(getLocalData);
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  
  const addItem = ()=>{
    
    //  if(!inputData){
    //   alert("plz Add some items");
    //  }
    //  else
      if(inputData && toggleButton){
           setitems(
            items.map((currElem)=>{
              if(currElem.id === isEditItem){
                return {...currElem, name : inputData };
              }
              return currElem;
            })
           );
           setInputData("");
           setIsEditItem(null);
           setToggleButton(false);
          }
     else{
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      }
      setitems([...items,myNewInputData]);
      setInputData("");
     }
  };
  const editItem = (index ) => {
    const item_edited = items.find((currElem)=>{
       return currElem.id === index;
    });
    setInputData(item_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  const deleteItem = (index) =>{
      const updatedItems = items.filter((currElem)=>{
        return currElem.id !== index; 
      });
      setitems(updatedItems);
  };
  const removeAll = () =>{
    setitems([]);
  }
   useEffect(() => {
    localStorage.setItem("mytodolist",JSON.stringify(items)) ;
   
   }, [items]);
   
   useEffect(() => {
    const keyDownHandler = (event) =>{
      if( event.key === "Enter"){
        event.preventDefault();
        // call addItem function here
        addItem();
      }
    } 
     document.addEventListener("keydown",keyDownHandler);
     return () => {
       document.removeEventListener("keydown",keyDownHandler);
     }
   })
   
   

  return (
    <>
        <div className='main-div'>
            <div className='container-div'>
              <figure>
              <img src="./images/notepadIcon.png" alt='Logo'/>
              <figcaption>Todo App 📒</figcaption>
              </figure>
              <div className='addItems'>
              <input 
              value={inputData}
              onChange={(event)=>setInputData(event.target.value)}
               placeholder='✍️ Add Items'
               type='text'
               className='formControl'
               />
               {toggleButton ?   <i onClick={addItem} class="fa fa-edit plus"></i> :  <i onClick={addItem}  class="fa fa-plus plus"></i>}
            
              </div>
              <div className='showItems'>
                {items.map((currElem,index) => {
                   return (
                  <div className='eachItems' key={index}>
                  <h3>{currElem.name}</h3>
                  <div className='todo_btn'>
                  <i onClick={()=>editItem(currElem.id)} class="fa fa-edit edit"></i>
                  <i onClick={()=>deleteItem(currElem.id)} class="fa fa-trash-o delete"></i>
                  </div>
                </div>
                   )
                })}              
              </div>
              <div className='showItems'>
                <button 
                onClick={removeAll}
                className ='btn effect04'
                data-sm-link-text = "REMOVE ALL">
                <span>CHECK LIST</span>
                </button>
              </div>
            </div>
        </div>
    </>
  )
};

export default Todo;

