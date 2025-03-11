<script lang="ts">
	import { supabase } from '$lib/supabase';
	import MessageTicker from '$lib/message-ticker.svelte';

	type Message = {
		content: string;
		sender: string;
		date: Date
	};


	const submittedMessages: (Message | boolean)[] = $state([]);

	let messageContent = $state('');
	let messageSender = $state('');

	let errorMsg = $state('');

	function feed() {
		submittedMessages.unshift(false);
	}

	async function submitMessage() {
		errorMsg = '';

		if (!messageContent.trim()) {
			errorMsg = 'Message cannot be empty!';
			return;
		}

		const { error } = await supabase.from('messages').insert([
			{ content: messageContent.trim(), sender: messageSender.trim() } 
		])

		if (error) {
			errorMsg = `Error: ${error.message}`
		} else {
			submittedMessages.unshift({content: messageContent, sender: messageSender, date: new Date()});
			messageContent = ''
			messageSender = ''
		}
	}
</script>

<div class="flex h-full  flex-col items-center p-2 sm:p-6 font-sans">
	<div
		class="font-receipt-xl mt-8 mb-14 flex -rotate-3 flex-col items-center bg-white p-6 text-gray-800 drop-shadow-md"
	>
		<h1 class="pb-2 text-3xl">paper.pagani.io</h1>
		<p class="">A silly “fax machine” just for me</p>
	</div>

	<p class="pt-4 pb-8">
		If you send me a message it will appear in my house. So be nice.<br />Also, paper costs money
		so keep it short, thanks.
	</p>
	<form
		onsubmit={submitMessage}
		class="w-full max-w-xl rounded-lg border-6 border-slate-800 bg-slate-900 p-10 text-slate-100 "
	>
		<p>{errorMsg}</p>
		<div class="w-full pb-6">
			<label
				class="block pb-2 text-sm font-semibold after:text-red-600 after:content-['*']"
				for="message-input"
			>
				Write your message
			</label>
			<textarea
				bind:value={messageContent}
				id="message-input"
				class="h-24 w-full resize-none rounded-lg bg-slate-800 border-none shadow-md shadow-slate-950"
				maxlength="144"
				required
			></textarea>
		</div>
		<div class="flex flex-col sm:flex-row justify-between gap-8 items-baseline">
			<div class="xs:w-auto w-full self-start">
				<label class="block pb-2 text-sm font-semibold" for="sender-input"> Who sent it? </label>
				<input
				maxlength="12"
					bind:value={messageSender}
					class="xs:w-auto w-full rounded-lg bg-slate-800 h-12 border-none shadow-md shadow-slate-950"
					id="sender-input"
				/>
			</div>

			<button
				type="submit"
				class="xs:w-auto w-full self-end rounded-lg bg-slate-600 text-slate-100 border-0 border-slate-700 hover:bg-slate-800 p-3 font-semibold shadow-md shadow-slate-950"
			>
				Print Message
			</button>
		</div>

		<div class="mt-10 flex flex-col sm:flex-row gap-10">
			<div
				role="presentation"
				class=" -ml-10 flex sm:flex-col  self-start items-center justify-center gap-2 rounded-r-xl border-2 border-l-0 border-gray-900 bg-black p-4 font-semibold text-xs"
			>
				<div
					class="flex h-4 w-4 items-center justify-center rounded-full bg-blue-900 text-white"
				></div>
				<p>POWER</p>
				<div
					class="flex h-4 w-4 items-center justify-center rounded-full {errorMsg ? 'bg-red-800' : 'bg-gray-900'} text-white"
				></div>
				<p>ERROR</p>
				<div
					class="flex h-4 w-4 items-center justify-center rounded-full bg-green-900 text-white"
				></div>
				<p>PAPER</p>
				<button
					type="button"
					onclick={feed}
					class="h-10 w-14 rounded-lg bg-gray-400 text-black hover:bg-gray-600 text-sm cursor-pointer">FEED</button
				>
			</div>
			<MessageTicker messages={submittedMessages} />
		</div>
	</form>
</div>

<style lang="css">
</style>
