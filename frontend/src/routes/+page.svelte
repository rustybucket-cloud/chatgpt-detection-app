<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public'
	import Nav from "../components/Nav.svelte";
	import Clipboard from '../lib/images/clipboard.svg'

	let text: string
	let prediction: string
	let confidence: string
	let loading: boolean = false
	let showDialog: boolean = false
	let chatGPTInput: string = ''
	let chatGPTLoading: boolean = false
	let chatGPTResponse: string = ''
	let showSuccessCopyText: boolean = false

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

	const askChatGPT = async () => {
		chatGPTLoading = true
		const request = await fetch('./completion', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ prompt: chatGPTInput }),
		})
		const data = await request.json()
		chatGPTResponse = data.data
		chatGPTLoading = false
	}

	const handleClipboardClick = () => {
		navigator.clipboard.writeText(chatGPTResponse)
		showSuccessCopyText = true
		setTimeout(() => {
			showSuccessCopyText = false
			chatGPTResponse = ''
		}, 2000)
	}
</script>

<Nav activeTab="model-card" />
<h1 class="text-4xl">ChatGPT Detection</h1>
<button on:click={() => showDialog = !showDialog} class="hover:bg-indigo-400 p-1 rounded">Get ChatGPT prompt.</button>
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
{#if loading}
	<p class="text-2xl">Loading result...</p>
{/if}
{#if showDialog}
	<div class="fixed inset-0 bg-black opacity-50" />
	<div class="fixed inset-0 flex justify-center items-center min-h-96 transition-height">
		<form class="bg-white rounded flex justify-center w-1/2 flex-col p-3 gap-3">
			<div class="flex justify-between items-center text-black">
				<label for="ask-chat-gpt">Ask ChatGPT</label>
				<button
					class="hover:bg-indigo-200 p-2 w-10 rounded text-lg"
					on:click={() => {
						showDialog = false
						chatGPTInput = ''
					}}
				>
					x
				</button>
			</div>
			{#if chatGPTResponse}
				<div class="flex justify-between gap-3">
					<p class="text-black">{chatGPTResponse}</p>
					<div class="text-center flex justify-start flex-col items-end">
						<button
							class="hover:bg-indigo-200 h-10 w-10 rounded flex justify-center items-center"
							on:click={handleClipboardClick}
						>
							<img src={Clipboard} alt="A clipboard icon" class="h-full">
						</button>
						{#if showSuccessCopyText}
							<p class="text-black text-xs">Copied to clipboard.</p>
						{/if}
					</div>
				</div>
			{:else if chatGPTLoading}
				<p class="text-black">Loading...</p>
			{:else}
				<textarea bind:value={chatGPTInput} on:change={({ target }) => {chatGPTInput = target?.value || ''}} id="ask-chatgpt" class="resize-none border-slate-400 border-4 rounded text-black p-2" rows="10" />
				<button class="text-black bg-indigo-400 rounded p-2" on:click={askChatGPT}>Submit</button>
			{/if}
		</form>
	</div>
{/if}