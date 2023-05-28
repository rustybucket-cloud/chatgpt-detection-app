<script lang="ts">
  import { onMount } from "svelte";
  import Nav from "../../components/Nav.svelte";
  import Chart from '../../components/Chart.svelte'
  import training from "../../data/training";

  const datasets = [
    {
      label: 'loss',
      data: training.loss,
      yAxisID: 'loss',
    },
    {
      label: 'accuracy',
      data: training.accuracy,
      yAxisID: 'accuracy',
    }
  ]
</script>

<Nav activeTab="model" />
<h1 class="text-4xl mb-2">Model</h1>
<a href="https://github.com/rustybucket-cloud/chatgpt-detection-app/blob/main/notebooks/model.ipynb" target="_blank" class="hover:bg-indigo-400 rounded p-2">View the model code</a>
<Chart type="line" labels={training.loss.map((_, i) => i)} datasets={datasets} />