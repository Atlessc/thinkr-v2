import { useState } from 'react'
import './App.css'

function App() {
  const [prompt, setPrompt] = useState('') // this is the prompt that the user will enter
  const [response, setResponse] = useState('') // this is the response from the API


  const API_KEY = import.meta.env.VITE_OPENAI; // this is the API key from the .env file

  async function callOpenAI() {
    console.log("calling now"); // this is just to check if the function is called

  const APIBody = {
    "model": "gpt-4-0613",
    "messages": [{
      "role": "assistant",
      "content": "you are a friendly assistant helping me help other people:" + prompt,
    }],
    "max_tokens": 5000,
    "temperature": 1,
    "top_p": 1,
    "stream": true
}

    await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": 'Bearer ' + API_KEY
      },
      body: JSON.stringify(APIBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      setResponse(data.choices[0].message.content);
  })}
  console.log(prompt);
  console.log(API_KEY);

  const eventSource = new EventSource('https://api.openai.com/v1/chat/completions', {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + API_KEY
  },
  body: JSON.stringify(APIBody)
});

eventSource.onmessage = (event) => {
  // handle incoming data here
  console.log(event.data);
};

eventSource.onerror = (error) => {
  // handle errors here
  console.error(error);
};



  return (
    <div className="App">
      <header className='header'>
        <h1>Welcome to Thinkr</h1>
      </header>
      <div className='body'>
        <div >
        <label>Prompt:</label>
        <textarea
        className='textarea'
        onChange={(e) => setPrompt(e.target.value)}
        placeholder='WRITE YOUR PROMPT HERE'
        cols={40}
        rows={3}
        />
        </div>
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
