import { createWebHistory, createRouter } from "vue-router";

import Countries from "@/views/Countries.vue";
import Country from "@/views/Country.vue";

const routes = [
	{ path: "/", component: Countries },
	{ path: "/country/:name", component: Country },
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
