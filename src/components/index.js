import Vue from 'vue';
import Message from './Message';


const components = {
  Message
};

for (const [key, value] of Object.entries(components)) {
  Vue.component(key, value);
}
