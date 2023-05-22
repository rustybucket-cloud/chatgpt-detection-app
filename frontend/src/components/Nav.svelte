<script lang="ts">
  export let activeTab: string;

  const generateTabCss = (tabName: string) => {
    return `${activeTab === tabName ? 'bg-indigo-400' : ''} hover:bg-indigo-400 p-3 w-32 rounded-b-md`
  }
</script>

<nav>
  <ul class="flex gap-2 justify-center text-lg">
    <li><a class={generateTabCss('model-card')} href="/">Model Card</a></li>
    <li><a class={generateTabCss('data')} href="/data">Data</a></li>
    <li><a class={generateTabCss('model')} href="model">Model</a></li>
  </ul>
</nav>