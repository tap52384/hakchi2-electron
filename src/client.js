'use strict';

import Vue from 'vue';
import Test from './test';

const app = new Vue(Test).$mount('#test');

// sets the "text" property of the "app" Vue object
app.text = "Electron Forge with Vue.js! Yeah!";

console.log( 'did this work?' );