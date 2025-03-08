<script lang="ts">
  
  let paperHolder: HTMLDivElement;
  let paperContent: HTMLDivElement;

  let { messages } = $props()

  $effect(() => {
    messages.length
    requestAnimationFrame(() => {
      if (paperHolder) {
        paperHolder.style.maxHeight = `${paperContent.clientHeight + 15}px`;
      }
    });
  })

</script>
<div>
<div class="h-24 slot mt-18"></div>
<div class="relative bg-gray-600 h-2 border-gray-500 border-y -mt-13 mx-4 mb-24">
  <div id="paper-holder" bind:this={paperHolder}>
    <div id="paper" bind:this={paperContent} >
      {#each messages as message}
      {#if message}
        <div class="p-4 font-receipt text-black text-sm text-left flex flex-col gap-2">
          <p>Message sent!
          <p >From {message.sender || 'Anonymous'} @ {(new Date()).toLocaleDateString()}</p>
          <p>{message.content}</p>
          <p>--------------------------------</p>
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
    transition:max-height 2s steps(20,end);
    padding-bottom: 15px;
  }
#paper {
    width: 350px;
    margin: 0 auto; /* Center the content */
    height: auto; /* Set height to auto */
    line-height: 30px;
    text-align: center;
    background-color: white;
    box-shadow: 3px 3px 10px rgba(0,0,0,0.5), inset 0px 5px 12px -5px rgba(0,0,0,0.5);
  }
</style>
