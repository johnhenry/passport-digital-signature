var passport = require('passport-strategy')
  , util = require('util')
  , bitauth = require('bitauth');

function Strategy(options, verify) {
  if (typeof options == 'function') {
    verify = options;
    options = {};
  }
  if (!verify) { throw new TypeError('DigitalSignatureStrategy requires a verify callback'); }
  passport.Strategy.call(this);
  this.name = 'digital-signature';
  this._verify = verify;
  this._passReqToCallback = options.passReqToCallback;
}
/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(Strategy, passport.Strategy);

/**
 * Authenticate request based on the contents of a form submission.
 *
 * @param {Object} request
 * @api protected
 */
Strategy.prototype.authenticate = function(request, options) {
    options = options || {};
    var verified = function(err, user, info) {
      if (err) { return self.error(err); }
      if (!user) { return self.fail(info); }
      self.success(user, info);
    }
    var rawBody = "";
    request.on("data", function(chunk) {
        rawBody += chunk;
    });
    var fullUrl = request.signeduri || (request.protocol + "://" + request.get("host") + request.url);
    var data = fullUrl + rawBody;
    bitauth.verifySignature(
        data,
        request.publickey,
        request.signature,
        function(error, result) {
            if(error || !result)){
                self.error(error || "Unknown Error");
                return;
            }
            var credentials = {
                result : result,
                sin : bitauth.getSinFromPublicKey(request.publicKey)
            };
            try {
              if (self._passReqToCallback) {
                this._verify(request, credentials, verified);
              } else {
                this._verify(credentials, verified);
              }
            } catch (e) {
              return self.error(e);
            }
        }
    );
};
/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
