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
	<div class="relative mx-4 -mt-13 mb-24 h-2 rounded border-y-2 border-slate-500 bg-slate-600">
		<div id="paper-holder" bind:this={paperHolder}>
			<div id="paper" bind:this={paperContent}>
				{#each messages as message}
					{#if message}
						<div class="font-receipt m-4 text-left text-xl text-black overflow-hidden leading-4">
							{#if message.error}
								<p class="text-red-900 py-2">Error: {message.error}</p>
							{:else}
								<p class="text-emerald-900 pb-1">Success!</p>
								<p>Message from {message.sender || 'Anonymous'} </p>
								<p>Sent @ {new Date().toLocaleTimeString()}</p>
								<p class="py-2">{message.content}</p>
								{/if}
								<p>--------------------------------------------</p>
						</div>
					{:else}
						<div class="h-24" role="presentation"></div>
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
			-8px -8px 12px oklch(0.279 0.041 260.031), 8px 8px 12px oklch(0.129 0.042 264.695);
		position: relative;
		background-color: rgba(0, 0, 0, 0.3);
		border: 0.3rem solid oklch(0.208 0.042 265.755);
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
