import { createMemoryHistory, createRouter } from "vue-router";

import Countries from "@/views/Countries.vue";

const routes = [{ path: "/", component: Countries }];

export const router = createRouter({
	history: createMemoryHistory(),
	routes,
});
