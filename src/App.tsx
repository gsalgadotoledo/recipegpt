import React from 'react'
import { Chat } from './components/Chat';

function App() {
  return (
    <div className='overflow-y-auto max-h-96 flex justify-center'>
      <Chat title={'RecipeGPT'} />
    </div>
  );
}

export default App
