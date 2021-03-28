import chalk from "chalk";

export enum ETrafficLight {
  Red = "red",
  YellowToGreen = "YellowToGreen",
  YellowToRed = "YellowToRed",
  Green = "green",
}

export function toColor(light: ETrafficLight): string {
  switch (light) {
    case ETrafficLight.Green: {
      return chalk.bgGreen(" ");
    }
    case ETrafficLight.YellowToGreen: {
      return chalk.bgYellow(" ");
    }
    case ETrafficLight.YellowToRed: {
      return chalk.bgYellow(" ");
    }
    case ETrafficLight.Red: {
      return chalk.bgRed(" ");
    }
  }
}

export interface IState {
  left: ETrafficLight;
  right: ETrafficLight;
  tick: number;
}

//export type IStateTuple = [tick: number, left: ETrafficLight | "*", right: ETrafficLight | "*" ]

//const rules: Array<[currentState: IStateTuple, nextState: IStateTuple]> = [
//[[5, ETrafficLight.Green, "*"], [ETrafficLight]]

//]

// can be expressed via a list of tupples for easier parameterization
export function getNextState(state: IState): IState {
  const { left, right, tick } = state;

  if (left === ETrafficLight.Green && tick === 5) {
    return {
      left: ETrafficLight.YellowToRed,
      right: ETrafficLight.Red,
      tick: 0,
    };
  }

  if (left === ETrafficLight.YellowToRed && tick === 2) {
    return {
      left: ETrafficLight.Red,
      right: ETrafficLight.YellowToGreen,
      tick: 0,
    };
  }

  if (left === ETrafficLight.YellowToGreen && tick === 1) {
    return {
      left: ETrafficLight.Green,
      right: ETrafficLight.Red,
      tick: 0,
    };
  }

  if (right === ETrafficLight.Green && tick === 5) {
    return {
      left,
      right: ETrafficLight.YellowToRed,
      tick: 0,
    };
  }

  if (right === ETrafficLight.YellowToRed && tick === 2) {
    return {
      left: ETrafficLight.YellowToGreen,
      right: ETrafficLight.Red,
      tick: 0,
    };
  }

  if (right === ETrafficLight.YellowToGreen && tick === 1) {
    return {
      left: ETrafficLight.Red,
      right: ETrafficLight.Green,
      tick: 0,
    };
  }

  return state;
}

/**
 * This whole thing acts as a "weird" Finate State Machine / Automata (FSM),
 * it has a a complex state made of three values (tick, leftLight, rightLight),
 * and the transitions are all with the same unimportant input (basically each
 * state has un way to go, but we do one transition per tick).
 *
 * There are also implicit states that advance automatically like (1,green,red),
 * we don't account specially for that, it will move over automatically to the next state
 * (2,green,red) on the next tick.
 *
 * Additionally you could consider the state (leftLight, rightLight) and the input the tick,
 * but the automata the higherlevel code also needs to keep that as a state so its about the same,
 * this solution is pretty simple but if you want math correctness perhaps it will bother you,
 * that is fine.
 */
export class Intersection {
  // can be parameterized
  private state: IState = {
    left: ETrafficLight.Green,
    right: ETrafficLight.Red,
    tick: 0,
  };

  constructor() {}

  tick(): void {
    this.state.tick += 1;
    this.state = getNextState(this.state);
  }

  printState(): void {
    const tick = this.state.tick.toString().padStart(2, "0");
    const left = toColor(this.state.left);
    const right = toColor(this.state.right);
    console.log(`Intersection [${left} ${tick} ${right}]`);
  }

  emergency(): void {
    this.state.left = ETrafficLight.Red;
    this.state.right = ETrafficLight.Red;
    this.state.tick = 0;
  }
}
