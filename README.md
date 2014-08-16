# Passport Digital Signature
Authenticate Using Digital Signatures

## Install

    $ npm install passport-digital-signature

## Usage

#### Configure Strategy

The local authentication strategy authenticates users using a publicKey and a
signature field provided in the request. The strategy requires a `verify` callback,
which accepts these a credentials object and calls `done` providing a user.
```js
    passport.use(new DigitalSignatureStrategy(
      function(credentials, done) {
        User.findOne({ sin: credentials.sin }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          if (!user.verifyPassword(password)) { return done(null, false); }
          return done(null, user);
        });
      }
    ));
```
#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'signature'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:
```js
    app.post('/login',
      passport.authenticate('digital-signature'),
      function(req, res) {
        res.redirect('/');
      });
```
## See Also

- [Signature Extraction Middleware](https://github.com/johnhenry/signature-extract)
- [Signature Storage Middleware](https://github.com/johnhenry/signature-store)
- [Signature Verification Middleware](https://github.com/johnhenry/signature-verify)

## Credits
  - [John Henry](http://github.com/johnhenry)

## License

The MIT License (MIT)

Copyright (c) 2014 John Henry john@iamjohnhenry.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
