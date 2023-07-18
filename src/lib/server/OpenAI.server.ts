import { PUBLIC_OPENAI_KEY } from '$env/static/public';
import { Configuration, OpenAIApi } from 'openai';
import type { CreateImageRequest, CreateCompletionRequest } from 'openai';

//TODO move to locals
const config = new Configuration({
	apiKey: PUBLIC_OPENAI_KEY // process.env.REACT_APP_OPENAI_KEY
})
const openAI = new OpenAIApi(config);

export const generateImage = async (command: string) => {
	const request = {
		prompt: command,
		size: '256x256',
		response_format: 'b64_json'
	} as CreateImageRequest
	return await openAI.createImage(request)
}

export const generateQuote = async (command: string) => {
	const request = {
		model: 'text-davinci-002',
		prompt: command,
		temperature: 0.9,
		max_tokens: 150,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0.9,
		stop: ['Human:', 'AI:']
	} as CreateCompletionRequest;
	return await openAI.createCompletion(request)
}