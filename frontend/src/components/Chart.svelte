<script lang="ts">
  import { onMount } from 'svelte'
	import { browser } from '$app/environment';
  import Chart from "chart.js/auto"

  export let type: 'bar' | 'line' | 'scatter'
  export let labels: string[]
  export let datasets: {label: string; data: string|number[]; borderWidth?: number}[]
	export let title: string
	export let yAxisLabel: string|null = null
	export let xAxisLabel: string

  Chart.defaults.color = "#fff";

  let chart: HTMLCanvasElement

  onMount(() => {
    if (!browser) return

		const scales: {x?: any, y?: any} = {}
		if (yAxisLabel) {
			scales.y = {
				beginAtZero: true,
				title: {
					display: true,
					text: yAxisLabel
				}
			}
		}

		if (xAxisLabel) {
			scales.x = {
				title: {
					text: xAxisLabel,
					display: true
				}
			}
		}

		new Chart(chart, {
			type,
			data: {
				labels,
				datasets,
			},
			options: {
				scales,
				plugins: {
					title: {
						display: true,
						text: title
					}
				}
			}
		});
  })
</script>

<div>
  <canvas bind:this={chart}></canvas>
</div>