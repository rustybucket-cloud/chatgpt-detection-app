<script lang="ts">
  import { onMount } from 'svelte'
	import { browser } from '$app/environment';
  import Chart from "chart.js/auto"

  export let type: 'bar' | 'line' | 'scatter'
  export let labels: string[]
  export let datasets: {label: string; data: string|number[]; borderWidth: number}[]
	export let title: string
	export let yAxisLabel: string
	export let xAxisLabel: string

  Chart.defaults.color = "#fff";

  let chart: HTMLCanvasElement

  onMount(() => {
    if (!browser) return
    const ctx = chart.getContext('2d')
		new Chart(ctx, {
			type,
			data: {
				labels,
				datasets,
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
						title: {
							display: true,
							text: yAxisLabel
						}
					},
					x: {
						title: {
							text: xAxisLabel,
							display: true
						}
					}
				},
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