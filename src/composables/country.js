import { reactive, ref } from "vue";

export function useCountries() {
	const state = reactive({
		countries: [],
	});

	const isLoading = ref(false);

	const fetchAllCountries = async () => {
		try {
			isLoading.value = true;
			const res = await fetch(
				`https://restcountries.com/v3.1/all?fields=name,cca2,capital,region,borders,flags,population`
			);
			state.countries = await res.json();
		} catch (error) {
			console.error("Error fetching countries:", error);
		} finally {
			isLoading.value = false;
		}
	};

	const fetchCountriesByRegion = async (region) => {
		try {
			isLoading.value = true;
			const res = await fetch(
				`https://restcountries.com/v3.1/region/${region}?fields=name,cca2,capital,region,borders,flags,population`
			);
			state.countries = await res.json();
		} catch (error) {
			console.error("Error fetching countries:", error);
		} finally {
			isLoading.value = false;
		}
	};

	const fetchCountryByName = async (name) => {
		try {
			isLoading.value = true;
			const res = await fetch(
				`https://restcountries.com/v3.1/name/${name}?fields=name,cca2,capital,region,borders,flags,population`
			);
			state.countries = await res.json();
		} catch (error) {
			console.error("Error fetching countries:", error);
		} finally {
			isLoading.value = false;
		}
	};

	const fetchCountryInformation = async (name) => {
		try {
			isLoading.value = true;
			const resCountry = await fetch(
				`https://restcountries.com/v3.1/name/${name}?fields=name,cca2,capital,region,borders,flags,population,languages,currencies,subregion,tld`
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
				state.country.borderCountries = borderCountries.map(
					(c) => c.name.common
				);
			}
		} catch (error) {
			console.error("Error fetching countries:", error);
		} finally {
			isLoading.value = false;
		}
	};

	return {
		state,
		isLoading,
		fetchAllCountries,
		fetchCountriesByRegion,
		fetchCountryByName,
		fetchCountryInformation,
	};
}
