import { useMachine, useSelector } from "@xstate/react";
import React from "react";
import { assign, createMachine } from "xstate";

interface ToggleMachineContext {
  count: number;
}

interface ToggleEvent {
  type: "TOGGLE";
}

type ToggleMachineEvent = ToggleEvent;

const toggleMachine = createMachine<ToggleMachineContext, ToggleMachineEvent>({
  id: "toggle",
  initial: "inactive",
  context: {
    count: 0,
  },
  states: {
    inactive: {
      on: { TOGGLE: "active" },
    },
    active: {
      entry: assign({ count: (ctx) => ctx.count + 1 }),
      on: { TOGGLE: "inactive" },
    },
  },
});

function App() {
  const [state, send, service] = useMachine(toggleMachine);

  const active = state.matches("active");

  const countFromSelector = useSelector(
    service,
    ({ context }) => context.count
  );
  console.log("countFromSelector", countFromSelector);

  const count = state.context.count;
  console.log("count", count);

  return (
    <div className="App">
      <h1>XState React Template</h1>
      <h2>Fork this template!</h2>
      <button onClick={() => send("TOGGLE")}>
        Click me ({active ? "✅" : "❌"})
      </button>{" "}
      <code>
        Toggled <strong>{count}</strong> times
      </code>
    </div>
  );
}

export default App;
