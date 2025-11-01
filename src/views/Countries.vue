<script setup>
import CountryCard from "@/components/CountryCard.vue";
</script>

<template>
	<div class="flex justify-center py-6 px-20 h-full">
		<div class="h-full max-w-[1440px] flex flex-col gap-6">
			<div class="flex items-center justify-between">
				<p>input here</p>
				<p>filter here</p>
			</div>
			<div class="flex-1 overflow-auto scrollbar-hide">
				<div class="flex flex-wrap gap-20">
					<CountryCard />
					<CountryCard />
					<CountryCard />
					<CountryCard />
					<CountryCard />
					<CountryCard />
					<CountryCard />
					<CountryCard />
					<CountryCard />
					<CountryCard />
					<CountryCard />
					<CountryCard />
				</div>
			</div>
		</div>
	</div>
</template>
