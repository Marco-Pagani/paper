<script lang="ts">
	import { supabase } from '$lib/supabase';
	import MessageTicker from '$lib/message-ticker.svelte';

	type Message = {
		content: string;
		sender: string;
	};

	let print = false;

	const submittedMessages: (Message | boolean)[] = $state([]);

	let message = $state('');
	let sender = $state('');

	let success = false;
	let errorMsg = '';

	function feed() {
		submittedMessages.unshift(false);
	}

	async function submitMessage() {
		submittedMessages.unshift({ content: message, sender: sender });

		// print = true;
		// receipt = message
		// success = false;
		// errorMsg = '';

		// if (!message.trim()) {
		// 	errorMsg = 'Message cannot be empty!';
		// 	return;
		// }

		// const { error } = await supabase.from('messages').insert([
		// 	{ content: message.trim(), sender: sender.trim() } // 'status' is optional, defaults to 'pending'
		// ]);

		// if (error) {
		// 	errorMsg = `Error: ${error.message}`;
		// } else {
		// 	success = true;
		// 	message = ''; // Clear input after success
		// 	sender = ''; // Clear input after success
		// }
	}
</script>

<div class="flex h-full  flex-col items-center p-2 sm:p-6 font-sans">
	<div
		class="font-receipt-xl mt-8 mb-14 flex -rotate-3 flex-col items-center bg-white p-6 text-gray-800 drop-shadow-md"
	>
		<h1 class="pb-2 text-3xl">paper.pagani.io</h1>
		<p class="">A silly “fax machine” just for me</p>
	</div>

	<form
		onsubmit={submitMessage}
		class="w-full max-w-xl rounded-lg border-6 border-black bg-gray-800 p-10 text-amber-100"
	>
		<p class="pt-4 pb-8">
			If you send me a message it will appear in my house. So be nice.<br />Also, paper costs money
			so keep it short, thanks.
		</p>
		<div class="w-full pb-6">
			<label
				class="block pb-2 text-sm font-semibold after:text-red-700 after:content-['*']"
				for="message-input"
			>
				Write your message
			</label>
			<textarea
				bind:value={message}
				id="message-input"
				class="h-24 w-full resize-none rounded-lg border-gray-300 text-black focus:border-amber-800"
				maxlength="120"
				required
			></textarea>
		</div>
		<div class="flex flex-col sm:flex-row justify-between gap-6 items-baseline">
			<div class="xs:w-auto w-full self-start">
				<label class="block pb-2 text-sm font-semibold" for="sender-input"> Who sent it? </label>
				<input
					bind:value={sender}
					class="xs:w-auto w-full rounded-lg border-gray-300 text-black focus:border-amber-800"
					id="sender-input"
				/>
			</div>

			<button
				type="submit"
				class="xs:w-auto w-full self-end rounded-lg border-amber-900 border-4 p-3 font-bold text-white hover:bg-amber-950"
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
					class="flex h-4 w-4 items-center justify-center rounded-full bg-gray-900 text-white"
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
