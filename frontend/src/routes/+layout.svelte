<script>
  import "../app.css";
  export const ssr = false
</script>

<main class="min-h-screen bg-cyan-900">
	<div class="max-w-screen-lg mx-auto text-white">
    <slot />
  </div>
</main>