# Chat Recipe Bot 'RecipeGTP' 🤖 😛

The Chat Recipe Bot is a portfolio project that creates a chat using the OpenAI API to generate recipe ideas, including text and images. The bot is built with React.

### Installation

To install the project, follow these steps:

1. Clone the project from GitHub to your local machine.
2. Navigate to the project's root directory in your terminal `cd recipegpt`.
3. Install dependencies with the command `npm i`.
4. Create a file named `.env` in the root directory of the project with your OpenAI API key, in the following format: OPENAI_API_KEY=your_api_key_here.
5. Start the development server with the command `npm run dev`.
6. Open your browser and navigate to [http://localhost:5173](http://localhost:5173)

### Description

The Chat Recipe Bot is a chat application that allows users to enter text prompts asking for recipe ideas. The bot then generates a response, including a text-based recipe idea and an image of the dish.


The project is built on React using Vite witch is a build tool that supports fast development and easy deployment of web applications.

### Code Explanation

The code includes several functions that interact with the OpenAI API:


#### Configuration

```js
import {
    Configuration,
  OpenAIApi
} from 'openai'

const configuration = new Configuration({
    apiKey: import.meta.env.OPENAI_API_KEY || '',
});

const openai = new OpenAIApi(configuration);

```

This code imports the Configuration and OpenAIApi classes from the openai package, and uses them to create a configuration object and an OpenAI API object. The apiKey parameter in the configuration object is set to the API key stored in the .env file.

#### `createImage` function

```js
export async function createImage(prompt: string): Promise<string | undefined> {
    try {
        const response = await openai.createImage({
            prompt,
      n: 1
    });

    const image = response.data.data[0].url
    return image
  } catch (error) {
      console.error(error);
  }
}

```

This function uses the createImage API method to generate an image of the dish based on a given prompt. The n parameter is set to 1, which means that the function will generate one image. The function returns the URL of the generated image.

#### `generateMessage` function

```js
export async function generateMessage(input: string): Promise<string> {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: input,
    max_tokens: 60
  });
  
  if (response?.data) {
    const [choise] = response?.data?.choices;
    return choise.text || ''
  }
  return ''
};

```

This function uses the createCompletion API method to generate a text-based recipe idea based on a given input. The model parameter is set to 'text-davinci-003', which is a language model provided by Open IA to generate human-like text based on the given input prompts or queries.
