import { expect, test } from "vitest";
import { render } from "vitest-browser-vue";
import { ref, shallowRef } from "vue";
import type { IControl, Map } from "maplibre-gl";
import { CustomControl } from "../lib/components/controls/custom";
import CustomControlComponent from "../lib/components/controls/custom.control";
import { map, isInitialized } from "../lib/types";

test("Render nothing when the control was not attached", async () => {
  const screen = await render(CustomControlComponent, {
    global: {
      provide: {
        [map]: {},
        [isInitialized]: {},
      },
    },
  });

  expect(screen.container.innerHTML).toEqual("<!--custom-component-->");
});

test("Add the classes to container", async () => {
  expect.assertions(2);

  const screen = await render(CustomControlComponent, {
    global: {
      provide: {
        [map]: shallowRef({
          addControl(control: CustomControl) {
            const container = control.onAdd();
            expect(container.className).toEqual("maplibregl-ctrl-test");
          },
          hasControl() {
            return false;
          },
          removeControl() {},
        }),
        [isInitialized]: ref(true),
      },
    },
    props: {
      class: "maplibregl-ctrl-test",
    },
  });
  expect(screen.container.innerHTML).toEqual(
    "<!--teleport start--><!--teleport end-->",
  );
});

test("Set the default classes", async () => {
  expect.assertions(1);

  await render(CustomControlComponent, {
    global: {
      provide: {
        [map]: shallowRef({
          addControl(control: CustomControl) {
            const container = control.onAdd();
            expect(container.className).toEqual(
              "maplibregl-ctrl maplibregl-ctrl-group",
            );
          },
          hasControl() {
            return false;
          },
          removeControl() {},
        }),
        [isInitialized]: ref(true),
      },
    },
  });
});
