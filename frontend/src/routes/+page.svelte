<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public'
	import Nav from "../components/Nav.svelte";

	let text: string
	let prediction: string
	let confidence: string
	let loading: boolean = false

	const getPrediction = async () => {
		console.log(PUBLIC_API_URL)
		loading = true
		const request = await fetch(PUBLIC_API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ text }),
		})
		const data = await request.json()
		prediction = data.prediction
		confidence = `${Math.ceil(data.score * 100)}%`
		loading = false
	}
</script>

<Nav activeTab="model-card" />
<h1 class="text-4xl">ChatGPT Detection</h1>
<form class="flex flex-col gap-2 w-full">
	<label for="text-input">Enter text and see if it was created by ChatGPT</label>
	<textarea bind:value={text} on:click={({ currentTarget }) => text = currentTarget.value} id="text-input" class="border-2 border-slate-900 rounded-md resize-none w-full p-2 text-slate-900" cols="30" rows="20"></textarea>
	<button disabled={loading} on:click={getPrediction} class="bg-indigo-400 hover:bg-indigo-600 focus:bg-indigo-200 text-slate-900 rounded-md p-2 max-w-sm w-full mx-auto" id="check-button" type="button">Check</button>
</form>
{#if prediction && !loading}
	<div class="flex flex-col gap-2 w-full">
		<p class="text-2xl">Prediction: {prediction}</p>
		<p class="text-2xl">Confidence: {confidence}</p>
	</div>
{/if}