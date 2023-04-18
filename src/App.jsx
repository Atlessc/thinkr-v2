import { useState } from 'react'
import './App.css'

function App() {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('') // "negative" or "positive"

  const API_KEY = import.meta.env.VITE_OPENAI;

  async function callOpenAI() {
    console.log("calling now");

    const APIBody = {
      "model": "gpt-3.5-turbo",
      "messages": [{
        "role": "assistant",
        "content": prompt,
    }],
      "max_tokens": 1000,
      "temperature": 0.9,
      "top_p": 1,
    }

    await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + API_KEY
      },
      body: JSON.stringify(APIBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      setResponse(data.choices[0].message.content);
  })}
  console.log(prompt);


  return (
    <div className="App">
      <header className='header'>
        <h1>Welcome to Thinkr</h1>
      </header>
      <div className='body'>
        <label>Prompt:</label>
        <textarea
        className='textarea'
        onChange={(e) => setPrompt(e.target.value)}
        placeholder='WRITE YOUR PROMPT HERE'
        cols={40}
        rows={3}
        />
      <div className='prompt_btn'>
        <button className='button' onClick={callOpenAI}>Send prompt</button>
      </div>
      <div className='response'>
        {response !== "" ?
          <p>{response}</p>
          :
          null
      }
      </div>
      </div>
    </div>
  )
}

export default App
