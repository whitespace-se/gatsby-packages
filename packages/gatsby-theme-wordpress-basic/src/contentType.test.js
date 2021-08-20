import { makeUri } from "./contentType";

describe("makeUri", () => {
  it("removes trailing slashes", () => {
    expect(makeUri("/foo/")).toBe("/foo");
  });
  it("adds leading slash", () => {
    expect(makeUri("foo")).toBe("/foo");
  });
  it("skips empty candidates", () => {
    expect(makeUri("", "foo")).toBe("/foo");
  });
  it("treats single slash as empty", () => {
    expect(makeUri("/", "foo")).toBe("/foo");
  });
  it("removes consecutive slashes", () => {
    expect(makeUri("/foo//bar")).toBe("/foo/bar");
  });
  it("changes camel to kebab", () => {
    expect(makeUri("/fooBar")).toBe("/foo-bar");
  });
});
