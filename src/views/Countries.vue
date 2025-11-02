<script setup>
import { onMounted, ref, watch } from "vue";

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

import { useCountries } from "@/composables/country";

const {
	state,
	isLoading,
	fetchAllCountries,
	fetchCountriesByRegion,
	fetchCountryByName,
} = useCountries();

const regionFilter = ref(null);
const countryNameFilter = ref("");

const viewCountryInformation = (country) => {
	router.push(`/country/${country.name.common}`);
};

const searchCountry = (name) => {
	regionFilter.value = null;
	if (name.trim() === "") {
		fetchAllCountries();
	} else {
		fetchCountryByName(name);
	}
};

watch(regionFilter, async (newRegion) => {
	if (newRegion === null) {
		return;
	}
	fetchCountriesByRegion(newRegion);
});

onMounted(async () => {
	fetchAllCountries();
});
</script>

<template>
	<div class="flex justify-center py-6 px-6 sm:px-20 h-full">
		<div class="h-full w-full max-w-[1440px] flex flex-col gap-6">
			<div
				class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8 sm:gap-2"
			>
				<div class="relative sm:w-[480px]">
					<Input
						v-model="countryNameFilter"
						@keyup.enter="searchCountry(countryNameFilter)"
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
					<SelectTrigger class="w-full sm:w-[200px] sm:min-w-[200px]">
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
			<div v-if="isLoading">
				<img
					src="@/assets/undraw_around-the-world_vgcy.svg"
					alt="loading svg"
				/>
				<p>Loading countries...</p>
			</div>
			<div v-else-if="!isLoading && state.countries.length == 0">
				<p>No countries found.</p>
			</div>
			<div v-else tabindex="0" class="flex-1 overflow-auto scrollbar-hide">
				<div class="flex flex-wrap gap-16 justify-center sm:justify-start">
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
