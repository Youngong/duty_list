//test case
var checkfunctions = require("../checkparam.js");

it('test checkparam', () => {
  let url = "/api/update";
  let post = "{\"userId\":123,\"title\":\"just for test\"}";
  expect(checkfunctions.checkparam(url, post)).toBe(false)

  url = "/api/update";
  post = "{\"id\":12}";
  expect(checkfunctions.checkparam(url, post)).toBe(true)

  url = "/api/query";
  post = "{\"userId\":123,\"title\":\"just for test\"}";
  expect(checkfunctions.checkparam(url, post)).toBe(true)
})