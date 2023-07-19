<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	export let data: PageData;
	$: ({ images } = data);
	let selectedImages: string[] = [];
	const addImage = (id: string) => {
		if (!selectedImages.includes(id)) {
			selectedImages = [...selectedImages, id];
		} else {
			selectedImages = selectedImages.filter((x) => x !== id);
		}
		console.log(selectedImages);
	};
	const filterImages = (category: number) => {};
	const selectAllImages = () => (selectedImages = images?.map((x) => x.id) ?? []);
</script>

<form
	method="POST"
	action="?/updateImagesCategory"
	use:enhance={({ form, formData, action }) => {
		//	Before form submit
		formData.append('images', JSON.stringify(selectedImages));
		return async ({ result, update }) => {
			//	After submit
			invalidateAll();
		};
	}}
>
	<select id="category" name="category">
		<option value="0">None</option>
		<option value="1">Cyberpunk</option>
		<option value="2">Sci Fi</option>
		<option value="3">Warhammer Fantasy</option>
	</select>
	<button type="submit">Change Selected Images Category</button>
</form>
<div>
	<button on:click={() => selectAllImages()}>Select All</button>
</div>
<div class="image-collection-container">
	{#if images && images.length > 0}
		{#each images as data}
			<div
				class="image-container"
				class:selected={selectedImages.includes(data.id)}
				on:click={() => addImage(data.id)}
				on:keydown={() => addImage(data.id)}
				aria-label="image selector"
				role="button"
				tabindex="0"
			>
				<img src={`data:image/png;base64,${data.base64}`} alt="ey" />
			</div>
		{/each}
	{:else}
		Images could not be found
	{/if}
</div>

<style>
	.image-collection-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.image-container {
		margin: 10px;
		cursor: pointer;
	}
	.image-container.selected {
		border: solid blue 2px;
	}
</style>
