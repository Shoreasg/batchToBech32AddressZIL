import logo from './logo.svg';
import './App.css';
import { useForm, useFieldArray } from "react-hook-form";
import { toBech32Address } from "@zilliqa-js/crypto"
import { useState } from 'react';


function App() {
  const [toBench32, settoBench32] = useState([])
  const { register, control, handleSubmit } = useForm({

  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test"
  });

  const handledata = (data) => {
    data.test.map((data) => {

      settoBench32( arr => [... arr, (toBech32Address(data.bench16))])
    })



  }

  return (
    <>
      <form onSubmit={handleSubmit(handledata)}>
        <ul>
          {fields.map((item, index) => (
            <li key={item.id}>
              <input {...register(`test.${index}.bench16`)} />
              <button type="button" onClick={() => remove(index)}>Delete</button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => append({})}
        >
          append
        </button>
        <input type="submit" />
      </form>
     {toBench32.map((data)=>
      {
        return(<p>{data}</p>)
      })}
    </>
  );
}

export default App;
