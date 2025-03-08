<script lang="ts">
	import { supabase } from '$lib/supabase';

	let message = '';
	let sender = '';
	let success = false;
	let errorMsg = '';

	async function submitMessage() {
		success = false;
		errorMsg = '';

		if (!message.trim()) {
			errorMsg = 'Message cannot be empty!';
			return;
		}

		if (!sender.trim()) {
			errorMsg = 'Sender cannot be empty!';
			return;
		}

		const { error } = await supabase.from('messages').insert([
			{ content: message.trim(), sender: sender.trim() } // 'status' is optional, defaults to 'pending'
		]);

		if (error) {
			errorMsg = `Error: ${error.message}`;
		} else {
			success = true;
			message = ''; // Clear input after success
			sender = ''; // Clear input after success
		}
	}
</script>

<div class="flex h-full flex-col items-center p-6 font-sans">
	<!-- <div class="bg-linear-to-b from-[#72767a] via-[#424252] to-[#465069] border-gray-700 border-4 p-6 rounded-md w-full flex flex-col items-center"> -->

  <div class="bg-white  p-6  flex flex-col items-center text-gray-800 font-receipt -rotate-3 my-8 drop-shadow-md">
    <h1 class="text-3xl pb-2 ">paper.pagani.io</h1>
    <p class="">A silly fax machine just for me</p>
    </div>

	<form on:submit|preventDefault={submitMessage} class="w-full max-w-xl border-amber-800 rounded-lg border-4 bg-neutral-50 p-10">
    <p class="pt-4 pb-8 text-amber-950">If you send me a message it will appear in my house. So be nice.<br>Also, paper costs money so keep it short, thanks.</p>
		<div class="w-full pb-6">
			<label
				class="block pb-2 text-sm font-semibold text-amber-900 after:text-red-700 after:content-['*']"
				for="message-input">
        Write your message
        </label>
			<textarea
				id="message-input"
				class="h-24 w-full resize-none rounded-lg border-gray-300 focus:border-amber-800"
				maxlength="120"
				required
			/>
		</div>
		<div class="flex justify-between flex-col xs:flex-row gap-6 ">
			<div class="self-start w-full xs:w-auto">
				<label class="block pb-2 text-sm font-semibold text-amber-900" for="sender-input">
          Who sent it?
        </label>
				<input class="rounded-lg border-gray-300 focus:border-amber-800 w-full xs:w-auto" id="sender-input" />
			</div>

			<button type="submit" class="self-end rounded bg-amber-900 p-3 font-bold text-white hover:bg-amber-950 w-full xs:w-auto">
        Print Message
        </button>
		</div>

		{#if success}
			<p class="success">Message sent successfully!</p>
		{/if}
		{#if errorMsg}
			<p class="error">{errorMsg}</p>
		{/if}
	</form>
</div>

<style>
	@import url('https://fonts.cdnfonts.com/css/merchant-copy-doublesize');
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&display=swap');
	.font-receipt {
		font-family: 'Merchant Copy Doublesize', sans-serif;
	}

  .font-sans {
    font-family: "IBM Plex Sans", sans-serif;
    font-optical-sizing: auto;
  }
</style>
