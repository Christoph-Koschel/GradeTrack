import { App, createApp } from "vue";
import { useMVVM } from "vue-mvvm";
import { MVVMApp } from "vue-mvvm/router";

import "./main.css";
import AppConfig from "./config";

const app: App = createApp(MVVMApp)
useMVVM(app, new AppConfig());
app.mount("#app");
