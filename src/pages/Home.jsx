import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from 'axios';


const Home =  () => {
    const [data,setData] = useState([]);
    const [input, setInput] = useState("");
    const [checked, setChecked] = useState([]);

    const addToDo = async (event) => {
        event.preventDefault()
        if(input == "" || input.value == "")
            return;

        setData([...data, input.value]);
        setChecked([...checked,false]);
   /*     const article = { title: 'React POST Request Example' }; 
        const headers = { 
            "Access-Control-Allow-Origin":  "http://127.0.0.1:5173",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }; */
        const res = await axios.post("http://localhost:9898/todos", {"id":4,"Name":input.value}) // {headers}

  /*     const res = await axios({
        method: 'post',
        url: "http://localhost:9898/todos",
        headers: {}, 
        data: {
          foo: 'bar', // This is the body part
        }
      }); */

        console.log(res);
        input.value = ""

    
    }
    
    const handleInput = (event) => {
        setInput(event.target);
    }

    const deleteMe = (index) => {
       
        setData((prev) => {
            prev.splice(index,1);
            return [...prev]
        });
        setChecked((prev) => {
            prev.splice(index,1);
            return [...prev]
        });
    }

    const handleVisuals = (index) => {
        let newChecked = [...checked];
        newChecked[index] = !newChecked[index];
        setChecked(newChecked);
    }

    useEffect(() => {
        console.log("NEW");
    }, [data])

    return ( 
        <section>
           <Header/>
            <article>
                {data.map((item,index) => (
                    <div key={index} className="todo-item">
                        <input checked={checked[index]? true : false} onChange={() => handleVisuals(index)} type="checkbox" />
                        <p className={checked[index]?"visuals":""}>{item}</p>
                        <a onClick={() => deleteMe(index)}>DELETE</a>
                    </div>
                ))
                }

                <form >
                    <input autoFocus onChange={handleInput} type="text" />
                    <input onClick={addToDo} type="submit" value="Submit"/>
                </form>
            </article>
        </section>
     );
}
 
export default Home;