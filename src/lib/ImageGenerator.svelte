<script lang="ts">
	import type { ImageResponse } from '../models/Image';

	let response: Promise<ImageResponse>;
	let text: string;
	const generateImage = async () => {
		response = fetch('/api/generate/image', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				command: text
			})
		}).then((r) => r.json());
	};
</script>

<input class="text-input" type="text" bind:value={text} />
<button on:click={generateImage}>Generate</button>
<div>
	{#await response}
		Image is loading!
	{:then responseData}
		{#if responseData}
			<img src={`data:image/png;base64,${responseData.base64}`} alt={`${responseData.id}`} />
			<a download={`${responseData.id}.png`} href={`data:image/png;base64,${responseData.base64}`}
				>Download</a
			>
		{:else}
			Image could not be found
		{/if}
	{/await}
</div>

<style>
	.text-input {
		width: 500px;
	}
</style>
