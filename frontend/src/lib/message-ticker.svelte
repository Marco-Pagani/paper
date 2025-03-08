<script lang="ts">
  
  let paperHolder: HTMLDivElement;
  let paperContent: HTMLDivElement;

  let { messages } = $props()

  $effect(() => {
    messages.length
    requestAnimationFrame(() => {
      if (paperHolder) {
        paperHolder.style.maxHeight = `${paperContent.clientHeight}px`;
      }
    });
  })

</script>

<div class="h-24 slot mt-24"></div>
<div class="relative bg-gray-600 h-2 border-gray-500 border-y -mt-13 mx-4 mb-24">
  <div id="paper-holder" bind:this={paperHolder}>
    <div id="paper" bind:this={paperContent} class="font-receipt text-black" >
      {#each messages as message}
        <div class="p-4 border-b border-gray-500">
          <p>{message.content}</p>
          <p class="text-sm text-gray-500">{message.sender}</p>
        </div>
      {/each}
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
