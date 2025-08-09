# Adding controls

All native controls of MapLibre are supported:

- NavigationControl
- GeolocateControl
- AttributionControl
- FullscreenControl
- LogoControl
- ScaleControl

To display them, add them a child component of the map:

```html
<mgl-map map-style="...">
  <mgl-navigation-control />
</mgl-map>
```

The position can be customized using the `position` prop.

```html
<mgl-navigation-control position="top-left" />
```

[See the example](../examples/basic).

## Custom control

The library also add a custom control component. They support the `position` and the `class` props.
Put your html as child of the component.

```html
<mgl-map map-style="...">
  <mgl-custom-control>Your code</mgl-custom-control>
</mgl-map>
```

[See the example](../examples/custom-control).

## useControl composable

The `useControl` composable allow to add controls that implement the [IControl interface](https://maplibre.org/maplibre-gl-js/docs/API/interfaces/IControl/).

[See the example](../examples/use-control).
