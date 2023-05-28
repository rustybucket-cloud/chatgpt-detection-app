import { SECRET_OPENAI_API_KEY } from '$env/static/private'
import { json } from '@sveltejs/kit'
import { Configuration, OpenAIApi } from 'openai';

export async function POST({ request }: { request: Request }) {
	const { prompt } = await request.json()
  const configuration = new Configuration({
    apiKey: SECRET_OPENAI_API_KEY,
  })
  const openai = new OpenAIApi(configuration)

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }]
    })

    const data = completion.data.choices[0].message?.content
    return json({ data }, { status: 200 });
  } catch (error) {
    // console.error(error)
    return json({ error }, { status: 500 });
  }
}