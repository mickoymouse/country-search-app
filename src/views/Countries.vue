<script setup>
import { onMounted, reactive, ref, watch } from "vue";

import CountryCard from "@/components/CountryCard.vue";
import { router } from "@/routes";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-vue-next";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const state = reactive({
	countries: [],
});

const regionFilter = ref(null);
const countryNameFilter = ref("");
const loadingCountries = ref(false);

const viewCountryInformation = (country) => {
	router.push(`/country/${country.name.common}`);
};

const fetchCountries = async (newRegion, countryName) => {
	try {
		loadingCountries.value = true;
		if (newRegion) {
			const res = await fetch(
				`https://restcountries.com/v3.1/region/${newRegion}?fields=name,cca2,capital,region,borders,flags,population`
			);
			state.countries = await res.json();
		} else if (countryName) {
			const res = await fetch(
				`https://restcountries.com/v3.1/name/${countryName}?fields=name,cca2,capital,region,borders,flags,population`
			);
			state.countries = await res.json();
		} else {
			const res = await fetch(
				"https://restcountries.com/v3.1/all?fields=name,cca2,capital,region,borders,flags,population"
			);
			state.countries = await res.json();
		}
	} catch (error) {
		console.error("Error fetching countries:", error);
	} finally {
		loadingCountries.value = false;
	}
};

watch(regionFilter, async (newRegion) => {
	fetchCountries(newRegion);
});

onMounted(async () => {
	fetchCountries();
});
</script>

<template>
	<div class="flex justify-center py-6 px-20 h-full">
		<div class="h-full max-w-[1440px] flex flex-col gap-6">
			<div class="flex items-center justify-between">
				<div class="relative w-[480px]">
					<Input
						v-model="countryNameFilter"
						@keyup.enter="fetchCountries(null, countryNameFilter)"
						id="search"
						type="text"
						placeholder="Search for a country..."
						class="pl-10"
					/>
					<span
						class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
					>
						<Search class="size-6 text-muted-foreground" />
					</span>
				</div>
				<Select v-model="regionFilter">
					<SelectTrigger class="w-[200px] min-w-[200px]">
						<SelectValue placeholder="Filter by region" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value="africa"> Africa </SelectItem>
							<SelectItem value="america"> America </SelectItem>
							<SelectItem value="asia"> Asia </SelectItem>
							<SelectItem value="europe"> Europe </SelectItem>
							<SelectItem value="oceania"> Oceania </SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			<div v-if="loadingCountries">
				<img
					src="@/assets/undraw_around-the-world_vgcy.svg"
					alt="loading svg"
				/>
				<p>Loading countries...</p>
			</div>
			<div v-else class="flex-1 overflow-auto scrollbar-hide">
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
