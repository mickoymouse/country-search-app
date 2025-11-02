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
	<div class="flex flex-col w-full h-full mt-20 px-20 gap-20">
		<button
			class="flex gap-2 h-10 w-[136px] shadow-md rounded-md items-center justify-center cursor-pointer"
			@click="$router.back()"
		>
			<ArrowLeft /> Back
		</button>

		<div v-if="loadingCountry">
			<img src="@/assets/undraw_around-the-world_vgcy.svg" alt="loading svg" />
			<p>Loading country information...</p>
		</div>

		<div v-else class="flex gap-20">
			<img
				:src="state.country.flags.png"
				:alt="state.country.flags.alt"
				class="w-[560px] h-[401px] rounded-md"
			/>
			<div class="flex flex-col w-full justify-center">
				<h1 class="text-[32px] font-extrabold">{{ state.country.name }}</h1>
				<div class="flex justify-between w-full pt-6">
					<div>
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
					<div class="flex flex-col">
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
				</div>
				<p class="pt-20 text-[16px] font-semibold">
					Border Countries:
					<span
						v-for="bc in state.country.borderCountries"
						class="text-[14px] font-light border w-24 py-1 rounded-sm shadow-sm inline-block text-center mr-2"
						>{{ bc }}</span
					>
				</p>
			</div>
		</div>
	</div>
</template>
