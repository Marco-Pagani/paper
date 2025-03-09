<script lang="ts">
	let paperHolder: HTMLDivElement;
	let paperContent: HTMLDivElement;

	let { messages } = $props();

	$effect(() => {
		messages.length;
		requestAnimationFrame(() => {
			if (paperHolder) {
				paperHolder.style.maxHeight = `${paperContent.clientHeight + 15}px`;
			}
		});
	});
</script>

<div class="w-full max-w-[400px] mx-auto">
	<div class="slot sm:mt-16 h-24"></div>
	<div class="relative mx-4 -mt-13 mb-24 h-2 rounded border-y-2 border-gray-500 bg-gray-600">
		<div id="paper-holder" bind:this={paperHolder}>
			<div id="paper" bind:this={paperContent}>
				{#each messages as message}
					{#if message}
						<div class="font-receipt flex flex-col m-4 text-left text-xl text-black overflow-hidden">
							<p>Message sent!</p>
							<p>From {message.sender || 'Anonymous'} @ {new Date().toLocaleTimeString()}</p>
							<p>{message.content}</p>
							<p>--------------------------------------------</p>
						</div>
					{:else}
						<div class="h-24"></div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="css">
	.slot {
		width: 100%;
		--box-shadow-settings:
			-8px -8px 12px rgba(255, 255, 255, 0.3), 8px 8px 12px rgba(30, 31, 32, 0.897);
		position: relative;
		background-color: rgba(0, 0, 0, 0.3);
		border: 0.3rem solid rgb(90, 90, 90);
		border-radius: 0.6rem/.6rem;
		box-shadow: var(--box-shadow-settings);
	}
	.slot::after {
		content: '';
		position: absolute;
		height: 100%;
		width: 100%;
		border-radius: 0.4rem/.4rem;
		box-shadow: inset var(--box-shadow-settings);
	}

	#paper-holder {
		width: 100%;
    margin-top:2px;
		display: flex;
		align-items: flex-end;
		overflow: hidden;
		max-height: 0;
		transition: max-height 2s steps(20, end);
		padding-bottom: 15px;
	}
	#paper {
		width: 95%;
		margin: 0 auto; 
		line-height: 30px;
		text-align: center;
		background-color: white;
		box-shadow:
			3px 3px 10px rgba(0, 0, 0, 0.5),
			inset 0px 5px 12px -5px rgba(0, 0, 0, 0.5);
	}
</style>
