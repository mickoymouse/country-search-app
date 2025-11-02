<script setup>
import { Moon, Sun } from "lucide-vue-next";

import { useTheme } from "@/theme";

const { isDarkMode, toggle } = useTheme();
</script>

<template>
	<div class="h-20 min-h-20 bg-white shadow-md w-full flex justify-center">
		<div
			class="h-full w-full max-w-[1440px] flex items-center justify-between px-20"
		>
			<p class="font-extrabold text-2xl">Where in the world?</p>
			<button
				class="text-base font-semibold flex gap-2 cursor-pointer"
				@click="toggle"
			>
				<Sun v-if="isDarkMode" />
				<Moon v-else />
				{{ isDarkMode ? "Light Mode" : "Dark Mode" }}
			</button>
		</div>
	</div>
</template>
