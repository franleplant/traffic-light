import { myFn } from "./index";

test("test jest setup", () => {
  myFn("jest");
  expect(true).toBe(true);
});
