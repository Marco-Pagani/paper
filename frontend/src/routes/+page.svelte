<script lang="ts">
	import { supabase } from '$lib/supabase';
  import MessageTicker from '$lib/message-ticker.svelte';

  type Message = {
    content: string;
    sender: string;
  }

let print = false;

const submittedMessages: (Message | boolean)[] = $state([])

	let message = $state('');
	let sender = $state('');


	let success = false;
	let errorMsg = '';

  function feed() {
    submittedMessages.unshift(false)
  }

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

<div class="flex h-full flex-col items-center p-6 font-sans min-w-[556px]">

  <div class="bg-white  p-6  flex flex-col items-center text-gray-800 font-receipt -rotate-3 my-8 drop-shadow-md">
    <h1 class="text-3xl pb-2 ">paper.pagani.io</h1>
    <p class="">A silly “fax machine” just for me</p>
    </div>

	<form onsubmit={submitMessage} class="w-full max-w-xl border-black rounded-lg border-6 p-10 bg-gray-800 text-amber-100">
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
			></textarea>
		</div>
		<div class="flex justify-between gap-6 ">
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
 
    <div class="flex mt-12" >
      <div role="presentation" class="-ml-10 mr-10 bg-black rounded-r-xl border-2 border-gray-900 p-5 font-semibold flex flex-col gap-2 items-center border-l-0">
        <div class="w-5 h-5 bg-blue-900 rounded-full flex items-center justify-center text-white"></div>
        <p>POWER</p>
        <div class="w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center text-white"></div>
        <p>ERROR</p>
        <div class="w-5 h-5 bg-green-900 rounded-full flex items-center justify-center text-white"></div>
        <p>PAPER</p>
        <button type="button" onclick={feed} class="w-18 h-12 hover:bg-gray-600 rounded-lg text-black bg-gray-400">FEED</button>
      </div>
    <MessageTicker messages={submittedMessages} />
    </div>

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
