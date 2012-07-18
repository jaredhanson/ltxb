/**
 * Set element name to `val`.
 *
 * The function is used to extend `ltx.Element` with a chainable mechanism to
 * set an element's name.
 *
 * The root element within a Less-Than XML builder file will be extended with
 * this function.  This is the recommended way of setting a root element's name,
 * since the element is not initialized directly by code, but rather by the
 * template engine.
 *
 * @param {String} val
 * @return {Element} for chaining
 * @api public
 */
exports.n = function(val) {
  this.name = val;
  return this;
}
