import {
  Configuration,
  OpenAIApi
} from 'openai'

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
});

const openai = new OpenAIApi(configuration);

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

export {}
