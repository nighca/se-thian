# Sanzo

Sanzo is a demo for customized resource retrieval based on [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API).

[Try it online](https://sanzo.vercel.app/)

### Details

This demo includes

1. Hijack resource (`<img>` / `<video>` / `<audio>`) requests with Service Worker API
2. Find target servers by call some resolve API
3. Check net connection of target servers and choose the best one
4. Retrieve resource content from the chosen target server
5. Use the result from the chosen target server

### Others

* Browser support for Service Workers: https://caniuse.com/serviceworkers
