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

<form on:submit|preventDefault={submitMessage} class="message-form">
  <textarea bind:value={message} placeholder="Enter your message..." required></textarea>
  <input type="text" bind:value={sender} placeholder="Enter your name..." required />
  <button type="submit">Print Message</button>

  {#if success}
    <p class="success">Message sent successfully!</p>
  {/if}
  {#if errorMsg}
    <p class="error">{errorMsg}</p>
  {/if}
</form>

<style>
  .message-form {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  textarea {
    width: 100%;
    height: 100px;
    padding: 8px;
  }
  input {
    width: 100%;
    padding: 8px;
  }
  .success { color: green; }
  .error { color: red; }
</style>
