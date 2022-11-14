import './App.css';
import { useForm, useFieldArray } from "react-hook-form";
import { toBech32Address } from "@zilliqa-js/crypto"
import {validation} from "@zilliqa-js/util"
import { useState } from 'react';


function App() {
  const [toBech32, settoBech32] = useState([])
  const { register, control, handleSubmit } = useForm({

  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "Address"
  });

  const handledata = (data) => {
    settoBech32([])
    data.Address.map((data) => {
      if(validation.isAddress(data.bech16Address))
      {
        return settoBech32( arr => [...arr, (toBech32Address(data.bech16Address))])
      }
      return settoBech32( arr => [...arr, "Invalid Address"])
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit(handledata)}>
        <ul>
          {fields.map((item, index) => (
            <li key={item.id}>
              <input {...register(`Address.${index}.bech16Address`)} />
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
     {toBech32.map((data)=>
      {
        return(<p>{data}</p>)
      })}
    </>
  );
}

export default App;
