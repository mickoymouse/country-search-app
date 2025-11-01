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
		class="bg-white h-[336px] w-[264px] rounded-md shadow-md overflow-hidden"
	>
		<img
			:src="`${props.country.flags.png}`"
			:alt="`${props.country.flags.alt}`"
			class="h-40 w-full object-cover"
		/>
		<div class="flex flex-col items-left p-8">
			<p>{{ props.country.name.common }}</p>
			<p>Population: {{ props.country.population }}</p>
			<p>Region: {{ props.country.region }}</p>
			<p>Capital: {{ props.country.capital[0] }}</p>
		</div>
	</div>
</template>
