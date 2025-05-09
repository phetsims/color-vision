/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAYAAADhXXHAAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gYRFAoL9RcoCwAAAcFJREFUWMPtmcFtwjAYhZ8Ryi1SpDAAnaAZIZ2g9MK19MS1GxQm4MyJdgM2IEwAG5AFUIgywOuhiYSqqtjxb5dUvFOkWMkn2/n/9xyQAIlOqA8AStk9hGQKIAVwDyA6u7UFkANYK6VO1rRtZ5VkRHJGsqCeViQT77AkRwaQ37UgGXmBrV9mq10rYBPYeimlZA6sC0tyQnltxGFJDi326CW9SsOu6E6F7nbo6ZQoABOHtV77+T2NMSMPzelZCvbRA2wiBTv00ffrlm0Nm+BK1EOH9O9gM08suQTs3geoUkoE9sMD7FpnkCIvJwWSB8cl7E5qZgFg7hB0rgNqahF3DkyMmac1gE0cuC2zhmOYFGaCsOZOrkUG2wiALnwFxojkwVuUEYjiScuYU7SO4ZaHHDOnecvBiYzp7Fo1ltauqz67MjE5J+3i78gibg3GWhsiW9isM7BKKROA8hqSQuZgFZzBbn1tAy0/+5uWy2UahuEmjmPEcYwgCDAYDFBVFaqqwvF4RFmW2Xg8frCF7UsY0gYsz3O41C2K32CF9uweQPPxpADemvYK4OnsGn9eDX6oDgW+zlzfp9Ppi+jUduXvIgB8Ahed0TGZX+vSAAAAAElFTkSuQmCC';
export default image;