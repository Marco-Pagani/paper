<script lang="ts">
	import { supabase } from '$lib/supabase';
  import MessageTicker from '$lib/message-ticker.svelte';

  type Message = {
    content: string;
    sender: string;
  }

let print = false;

const submittedMessages: Message[] = $state([])

	let message = '';
	let sender = '';
	let success = false;
	let errorMsg = '';

  let receipt = '';
  

	async function submitMessage() {

    submittedMessages.unshift({content: message, sender: sender})

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

<div class="flex h-full flex-col items-center p-6 font-sans">
	<!-- <div class="bg-linear-to-b from-[#72767a] via-[#424252] to-[#465069] border-gray-700 border-4 p-6 rounded-md w-full flex flex-col items-center"> -->

  <div class="bg-white  p-6  flex flex-col items-center text-gray-800 font-receipt -rotate-3 my-8 drop-shadow-md">
    <h1 class="text-3xl pb-2 ">paper.pagani.io</h1>
    <p class="">A silly “fax machine” just for me</p>
    </div>

	<form on:submit|preventDefault={submitMessage} class="w-full max-w-xl border-gray-900 rounded-lg border-4 p-10 bg-gray-800 text-amber-100">
    <p class="pt-4 pb-8 ">If you send me a message it will appear in my house. So be nice.<br>Also, paper costs money so keep it short, thanks.</p>
		<div class="w-full pb-6">
			<label
				class="block pb-2 text-sm font-semibold  after:text-red-700 after:content-['*']"
				for="message-input">
        Write your message
        </label>
			<textarea
        bind:value={message}
				id="message-input"
				class="h-24 w-full resize-none rounded-lg border-gray-300 focus:border-amber-800 text-black"
				maxlength="120"
				required
			/>
		</div>
		<div class="flex justify-between flex-col xs:flex-row gap-6 ">
			<div class="self-start w-full xs:w-auto">
				<label class="block pb-2 text-sm font-semibold " for="sender-input">
          Who sent it?
        </label>
				<input bind:value={sender}  class="rounded-lg border-gray-300 focus:border-amber-800 w-full xs:w-auto text-black" id="sender-input" />
			</div>

			<button type="submit" class="self-end rounded bg-amber-900 p-3 font-bold text-white hover:bg-amber-950 w-full xs:w-auto">
        Print Message
        </button>
		</div>


    <MessageTicker messages={submittedMessages} />
    

		{#if success}
			<p class="success">Message sent successfully!</p>
		{/if}
		{#if errorMsg}
			<p class="error">{errorMsg}</p>
		{/if}
	</form>
</div>

<style lang="css">

</style>
