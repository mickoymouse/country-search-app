<script setup>
import Navbar from "@/components/Navbar.vue";
</script>

<template>
	<div class="flex flex-col h-screen bg-(--grey-50) dark:bg-(--blue-950)">
		<Navbar />
		<main
			class="flex-1 overflow-y-hidden w-full max-w-[1440px] mx-auto"
			style="height: calc(100vh - 80px)"
		>
			<RouterView />
		</main>
	</div>
</template>
