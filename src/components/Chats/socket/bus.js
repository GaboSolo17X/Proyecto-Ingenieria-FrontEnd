import { createApp } from 'vue';

const bus = createApp({});
bus.config.globalProperties.bus = bus;
export default bus;