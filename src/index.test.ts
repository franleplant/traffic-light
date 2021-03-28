import { Intersection } from "./index";

test("basic use case", () => {
  const inte = new Intersection();
  for (let i = 0; i <= 15; i++) {
    inte.tick();
    inte.printState();
  }
});
