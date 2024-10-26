import { render, fireEvent, screen, waitFor } from "@testing-library/vue";
import HelloWorldVue from "../HelloWorld.vue";
import { mockResizeObserver } from "@heartlandone/vega-vue/dist/testing";
import { VegaComponentLibrary } from "@heartlandone/vega-vue";
import { waitForVega } from "@heartlandone/vega";
import { createApp } from "vue";
import "@testing-library/jest-dom";

createApp(HelloWorldVue).use(VegaComponentLibrary);

test("renders", async () => {
  let mockedResizeObserverController = mockResizeObserver();

  const renderResult = await render(HelloWorldVue);
  await waitForVega();

  mockedResizeObserverController.show("vega-form [data-vega-form]");

  const btn = document.querySelector("vega-button");
  const shadowContent = btn?.shadowRoot?.querySelector("button");

  await waitFor(async () => {
    expect(shadowContent).toBeDefined();
    expect(shadowContent).toMatchInlineSnapshot(`
      <button
        aria-label="Valid"
        class="vega-button-size-default vega-button-variant-primary"
        part="button"
        type="button"
      >
        <span>
          Valid
        </span>
      </button>
      `);
    expect(btn).toMatchInlineSnapshot(`
      <vega-button
        class="hydrated"
      />
`);

    const vegaForm = document.querySelector("vega-form");
    expect(vegaForm).toBeDefined();
    expect(await vegaForm.getValue()).toEqual({ field_1: "" });
    // const validResult = await vegaForm.valid();
    // expect(validResult).toEqual({ invalidFields: ["field_1"], isValid: false });
    const validBtn = document
      .querySelector("vega-button")
      .shadowRoot.querySelector("button");
    fireEvent.click(validBtn);
    expect(vegaForm.isValid).toEqual(false);
    const errorDom = document
      .querySelector("vega-input")
      .shadowRoot.querySelector(".vega-error");
    expect(errorDom).not.toHaveClass("vega-hidden");
    expect(errorDom).toMatchInlineSnapshot(`
    <label
      class="vega-error"
      part="field-error-message"
    >
      This field is required
    </label>
    `);

    fireEvent.click(
      document
        .querySelectorAll("vega-button")[1]
        .shadowRoot.querySelector("button")
    );
    expect(vegaForm.isValid).toEqual(false);
    await waitFor(() => {
      expect(errorDom).toHaveClass("vega-hidden");
      expect(errorDom).toMatchInlineSnapshot(`
        <label
          class="vega-error vega-hidden"
          part="field-error-message"
        >
          This field is required
        </label>
        `);
    });
  });
});
