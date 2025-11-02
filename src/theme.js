import { ref, watchEffect } from "vue";

export function useTheme() {
	const isDarkMode = ref(false);

	const setInitialTheme = () => {
		const stored = localStorage.theme;
		if (stored === "dark") isDarkMode.value = true;
		else if (stored === "light") isDarkMode.value = false;
		else if (window.matchMedia("(prefers-color-scheme: dark)").matches)
			isDarkMode.value = true;
	};

	const toggle = () => (isDarkMode.value = !isDarkMode.value);

	watchEffect(() => {
		document.documentElement.classList.toggle("dark", isDarkMode.value);
		localStorage.theme = isDarkMode.value ? "dark" : "light";
	});

	setInitialTheme();

	return { isDarkMode, toggle };
}
