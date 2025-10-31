import { createMemoryHistory, createRouter } from "vue-router";

import Country from "@/views/Country.vue";

const routes = [{ path: "/", component: Country }];

export const router = createRouter({
	history: createMemoryHistory(),
	routes,
});
