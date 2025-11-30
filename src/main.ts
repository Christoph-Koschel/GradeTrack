import { App, createApp } from "vue";
import { createMVVM } from "vue-mvvm";
import { MVVMApp } from "vue-mvvm/router";

import "@extensions/math.extension";

import "@/main.css";
import AppConfig from "@/config";

const app: App = createApp(MVVMApp);
app.use(createMVVM(new AppConfig()));
app.mount("#app");
