import { ref, shallowRef, nextTick } from "vue";
import type { IControl, Map } from "maplibre-gl";
import { mount } from "@vue/test-utils";
import { CustomControl } from "@/lib/components/controls/custom";
import CustomControlComponent from "@/lib/components/controls/custom.control";
import { map, isInitialized } from "@/lib/types";

test("Render nothing when the control was not attached", () => {
  const wrapper = mount(CustomControlComponent, {
    global: {
      provide: {
        [map]: {},
        [isInitialized]: {},
      },
    },
  });

  nextTick(() => {
    expect(wrapper.html()).toEqual("<!--custom-component-->");
  });
});

test("Add the classes to container", () => {
  expect.assertions(2);

  const wrapper = mount(CustomControlComponent, {
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
        }),
        [isInitialized]: ref(true),
      },
    },
    props: {
      class: "maplibregl-ctrl-test",
    },
  });
  nextTick(() => {
    expect(wrapper.html()).toEqual(
      "<!--teleport start-->\n<!--teleport end-->",
    );
  });
});

test("Set the default classes", () => {
  expect.assertions(1);

  const wrapper = mount(CustomControlComponent, {
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
        }),
        [isInitialized]: ref(true),
      },
    },
  });
});
