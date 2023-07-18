import { generateImage } from "$lib/server/OpenAI.server";
import { error, redirect, type RequestHandler } from "@sveltejs/kit";

// src/routes/+layout.server.ts
// export const load = async ({ locals: { getSession } }) => {
// 	const session = await getSession()
// 	return {
// 		session: await getSession(),
// 	}
// }
export const POST: RequestHandler = async ({ request, locals: { supabase, getSession } }) => {
	try {
		const session = await getSession();
		// if (!session) {
		// 	throw new Error('No session');
		// }
		const { command } = await request.json();
		const { data: { data: [{ b64_json: base64 }] } } = await generateImage(command);
		if (base64) {
			const { data, error } = await supabase.from('open_ai_images').insert({
				base64
			}).select('id').single();
			return new Response(JSON.stringify({ base64, id: data?.id }));
		}
		return new Response(String('No image generated'))
	} catch (errorMessage) {
		console.log((errorMessage as Error).message)
		throw error(500, 'Error')
	}
}