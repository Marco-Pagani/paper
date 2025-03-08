<script lang="ts">
	import { supabase } from '$lib/supabase';

let print = false;

	let message = '';
	let sender = '';
	let success = false;
	let errorMsg = '';

  let receipt = '';
  
  let paperHolder: HTMLDivElement;
  let paperContent: HTMLDivElement;

	async function submitMessage() {
    print = true;
    receipt = message
		success = false;
		errorMsg = '';

		if (!message.trim()) {
			errorMsg = 'Message cannot be empty!';
			return;
		}

    requestAnimationFrame(() => {
      if (paperHolder) {
        paperHolder.style.maxHeight = `${paperContent.clientHeight}px`;
      }
    });

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


    <div class="h-24 slot mt-24" />
    <div class="relative bg-gray-600 h-2 border-gray-500 border-y -mt-13 mx-4 mb-24">
      <div id="paper-holder" bind:this={paperHolder} class="{print ? 'print' : ''}">
        <div id="paper" bind:this={paperContent} class="font-receipt text-black" >{receipt}</div>
      </div>
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
	@import url('https://fonts.cdnfonts.com/css/merchant-copy-doublesize');
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&display=swap');
	.font-receipt {
		font-family: 'Merchant Copy Doublesize', sans-serif;
	}
  .font-sans {
    font-family: "IBM Plex Sans", sans-serif;
    font-optical-sizing: auto;
  }
  .slot {
    --box-shadow-settings: -8px -8px 12px rgba(255,255,255,0.3), 8px 8px 12px rgba(30, 31, 32, 0.897);
    position: relative;
    background-color: rgba(0,0,0,0.3);
    border: .3rem solid rgb(90, 90, 90);
    border-radius: .6rem/.6rem;
    box-shadow: var(--box-shadow-settings);
  }
  .slot::after {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    border-radius: .4rem/.4rem;
    box-shadow: inset var(--box-shadow-settings);
  }

  #paper-holder {
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    top: 3px;
    left: 0;
    right: 0;
    max-height: 0; /* Start with zero height */
    transition:max-height 2s steps(15,end);
  }
#paper {
    width: 350px;
    margin: 0 auto; /* Center the content */
    height: auto; /* Set height to auto */
    line-height: 30px;
    text-align: center;
    background-color: white;
  }
</style>
