# requestidleinterval [![Build Status](https://travis-ci.org/azu/requestidleinterval.svg?branch=master)](https://travis-ci.org/azu/requestidleinterval)

setInterval + requestIdleCallback function

## Install

Install with [npm](https://www.npmjs.com/):

    npm install requestidleinterval

## Usage

Example: Do task per 1000ms

```js
import { requestIdleInterval } from "requestidleinterval";
const cancel = requestIdleInterval(() => {
    // Do interval task
}, {
        // interval msec
        interval: 1000,
        // if the enviroment is busy, the delay msec to do interval task
        timeout: 500
});

// if you want to cancel interval task
cancel(); 
```

## Changelog

See [Releases page](https://github.com/azu/requestidleinterval/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/requestidleinterval/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
