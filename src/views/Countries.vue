<script setup>
import { onMounted, reactive } from "vue";

import CountryCard from "@/components/CountryCard.vue";
import { router } from "@/routes";

const state = reactive({
	countries: [],
});

const viewCountryInformation = (country) => {
	router.push(`/country/${country.name.common}`);
};

onMounted(async () => {
	const res = await fetch(
		"https://restcountries.com/v3.1/all?fields=name,cca2,capital,region,borders,flags,population"
	);
	state.countries = await res.json();
});
</script>

<template>
	<div class="flex justify-center py-6 px-20 h-full">
		<div class="h-full max-w-[1440px] flex flex-col gap-6">
			<div class="flex items-center justify-between">
				<p>input here</p>
				<p>filter here</p>
			</div>
			<div class="flex-1 overflow-auto scrollbar-hide">
				<div class="flex flex-wrap gap-16">
					<CountryCard
						class="cursor-pointer"
						@click="viewCountryInformation(country)"
						v-for="country in state.countries"
						:key="country.cca2"
						:country="country"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
