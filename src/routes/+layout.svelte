<script lang="ts">
	import { ensureAnonUser } from '$lib/supabase';
	import '../app.css';
	let { children } = $props();
	ensureAnonUser();

</script>

{@render children()}
