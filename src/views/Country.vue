<script setup>
import { reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { ArrowLeft } from "lucide-vue-next";

const state = reactive({
	country: {},
});

const loadingCountry = ref(true);
const route = useRoute();

const fetchCountry = async () => {
	try {
		loadingCountry.value = true;
		const resCountry = await fetch(
			`https://restcountries.com/v3.1/name/${route.params.name}?fields=name,cca2,capital,region,borders,flags,population,languages,currencies,subregion,tld`
		);
		const country = (await resCountry.json())[0];

		state.country = {
			name: country.name.common,
			nativeName:
				country.name.nativeName &&
				Object.values(country.name.nativeName)[0].common,
			population: country.population,
			region: country.region,
			capital: country.capital ? country.capital[0] : "N/A",
			flags: country.flags,
			languages: country.languages
				? Object.values(country.languages).join(", ")
				: "N/A",
			currencies: country.currencies
				? Object.values(country.currencies)
						.map((c) => c.name)
						.join(", ")
				: "N/A",
			subregion: country.subregion ? country.subregion : "N/A",
			tld: country.tld ? country.tld.join(", ") : "N/A",
		};

		if (country.borders.length > 0) {
			const resBorderCountries = await fetch(
				`https://restcountries.com/v3.1/alpha?codes=${country.borders.join(
					","
				)}&fields=name`
			);
			const borderCountries = await resBorderCountries.json();
			state.country.borderCountries = borderCountries.map((c) => c.name.common);
		}
	} catch (error) {
		console.error("Error fetching countries:", error);
	} finally {
		loadingCountry.value = false;
	}
};

watch(() => route.params.name, fetchCountry, { immediate: true });
</script>

<template>
	<div
		class="flex flex-col w-full h-full overflow-auto scrollbar-hide mt-10 px-8 sm:mt-20 sm:px-20 gap-20"
	>
		<button
			class="py-2 flex gap-2 h-10 w-[136px] shadow-md rounded-sm items-center justify-center cursor-pointer dark:bg-(--blue-900) dark:hover:bg-(--blue-950)"
			@click="$router.back()"
		>
			<ArrowLeft /> Back
		</button>

		<div v-if="loadingCountry">
			<img src="@/assets/undraw_around-the-world_vgcy.svg" alt="loading svg" />
			<p>Loading country information...</p>
		</div>

		<div v-else class="flex flex-col gap-20 lg:flex-row">
			<img
				:src="state.country.flags.png"
				:alt="state.country.flags.alt"
				class="w-full max-w-[560px] max-h-[401px] rounded-md lg:flex-1"
			/>
			<div
				class="flex flex-col gap-8 pb-20 sm:pb-25 lg:pb-0 lg:flex-1 lg:justify-center"
			>
				<h1 class="text-[24px] font-extrabold">{{ state.country.name }}</h1>
				<div class="flex flex-col gap-8 sm:flex-row">
					<div class="flex flex-col sm:flex-1">
						<p class="text-[16px] font-semibold">
							Native Name:
							<span class="font-light">{{ state.country.nativeName }}</span>
						</p>
						<p class="text-[16px] font-semibold">
							Population:
							<span class="font-light">{{ state.country.population }}</span>
						</p>
						<p class="text-[16px] font-semibold">
							Region:
							<span class="font-light">{{ state.country.region }}</span>
						</p>
						<p class="text-[16px] font-semibold">
							Sub Region:
							<span class="font-light">{{ state.country.subregion }}</span>
						</p>
						<p class="text-[16px] font-semibold">
							Capital:
							<span class="font-light">{{ state.country.capital }}</span>
						</p>
					</div>
					<div class="flex flex-col sm:flex-1">
						<p class="text-[16px] font-semibold">
							Top Level Domain:
							<span class="font-light">{{ state.country.tld }}</span>
						</p>
						<p class="text-[16px] font-semibold">
							Currencies:
							<span class="font-light">{{ state.country.currencies }}</span>
						</p>
						<p class="text-[16px] font-semibold">
							Languages:
							<span class="font-light">{{ state.country.languages }}</span>
						</p>
					</div>
					<div class="text-[16px] font-semibold flex flex-col sm:hidden">
						<span class="mr-4">Border Countries:</span>
						<p class="flex flex-wrap py-2">
							<span
								v-for="bc in state.country.borderCountries"
								class="text-[14px] font-light border w-24 py-1 my-1 rounded-sm shadow-sm inline-block text-center mr-4"
								>{{ bc }}</span
							>
						</p>
					</div>
				</div>
				<div class="text-[16px] font-semibold hidden md:flex md:flex-col">
					<span class="mr-4">Border Countries:</span>
					<p class="flex flex-wrap py-2">
						<span
							v-for="bc in state.country.borderCountries"
							class="text-[14px] font-light border w-24 py-1 my-1 rounded-sm shadow-sm inline-block text-center mr-4"
							>{{ bc }}</span
						>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
