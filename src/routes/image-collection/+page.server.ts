export async function load({ locals: { supabase } }) {
	const { data, error } = await supabase.from('open_ai_images').select('id, base64, category').range(0, 20).eq('category', 0);
	return {
		images: data
	}
}
export const actions = {
	updateImagesCategory: async ({ request, locals: { supabase } }) => {
		const data = await request.formData();
		const newCateogry = data.get('category') as string;
		const images = <string[]>JSON.parse(data.get('images') as string);
		console.log(newCateogry, images)
		for (const imageId of images) {
			console.log(imageId)
			const { error } = await supabase.from('open_ai_images').update({ category: +newCateogry }).eq('id', imageId);
			console.log(error)
		}
		return {
			success: true
		}
	},
};