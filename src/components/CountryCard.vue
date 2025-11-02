<script setup>
const props = defineProps({
	country: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<div
		class="bg-white dark:bg-(--blue-900) h-[336px] w-[264px] rounded-md shadow-md overflow-hidden"
	>
		<img
			:src="`${props.country.flags.png}`"
			:alt="`${props.country.flags.alt}`"
			class="h-40 w-full object-cover"
		/>
		<div class="flex flex-col items-left p-8">
			<p class="font-extrabold text-lg">{{ props.country.name.common }}</p>
			<p class="text-sm font-semibold">
				Population:
				<span class="font-light">{{
					props.country.population.toLocaleString()
				}}</span>
			</p>
			<p class="text-sm font-semibold">
				Region: <span class="font-light">{{ props.country.region }}</span>
			</p>
			<p class="text-sm font-semibold">
				Capital: <span class="font-light">{{ props.country.capital[0] }}</span>
			</p>
		</div>
	</div>
</template>
