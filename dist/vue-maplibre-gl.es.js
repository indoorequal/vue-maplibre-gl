/*!
* @indoorequal/vue-maplibre-gl v8.4.3
* (c) 2026 François de Metz <francois@2metz.fr>
* @license MIT
*/
import { Teleport as e, createCommentVNode as t, defineComponent as n, getCurrentInstance as r, h as i, inject as a, isRef as o, markRaw as s, nextTick as c, onBeforeUnmount as l, onMounted as u, provide as d, reactive as f, ref as p, shallowRef as m, warn as h, watch as g } from "vue";
import { AttributionControl as _, FullscreenControl as v, GeolocateControl as y, LngLat as b, LogoControl as x, Map as ee, Marker as te, NavigationControl as ne, Popup as re, ScaleControl as ie } from "maplibre-gl";
//#region \0rolldown/runtime.js
var ae = Object.defineProperty, oe = (e, t) => {
	let n = {};
	for (var r in e) ae(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || ae(n, Symbol.toStringTag, { value: "Module" }), n;
}, se = Symbol("map"), S = se, C = Symbol("isLoaded"), w = Symbol("isInitialized"), T = w, E = Symbol("componentId"), D = Symbol("sourceId"), O = Symbol("sourceLayerRegistry"), k = Symbol("marker"), ce = /* @__PURE__ */ "error.load.idle.remove.render.resize.webglcontextlost.webglcontextrestored.dataloading.data.tiledataloading.sourcedataloading.styledataloading.sourcedata.styledata.styleimagemissing.dataabort.sourcedataabort.boxzoomcancel.boxzoomstart.boxzoomend.touchcancel.touchmove.touchend.touchstart.click.contextmenu.dblclick.mousemove.mouseup.mousedown.mouseout.mouseover.movestart.move.moveend.zoomstart.zoom.zoomend.rotatestart.rotate.rotateend.dragstart.drag.dragend.pitchstart.pitch.pitchend.wheel.terrain.cooperativegestureprevented".split(".");
function le(e, t, n, r) {
	return (i) => n.emit(r, {
		type: i.type,
		map: t,
		component: e,
		event: i
	});
}
//#endregion
//#region lib/lib/lng_lat.ts
function ue(e, t) {
	let n = b.convert(e), r = b.convert(t);
	return n.lng === r.lng && n.lat === r.lat;
}
//#endregion
//#region lib/components/controls/position.enum.ts
var A = /* @__PURE__ */ function(e) {
	return e.TOP_LEFT = "top-left", e.TOP_RIGHT = "top-right", e.BOTTOM_LEFT = "bottom-left", e.BOTTOM_RIGHT = "bottom-right", e;
}({}), j = Object.values(A), M = /* @__PURE__ */ new Map(), N = Symbol("default");
function de(e = N) {
	let t = M.get(e);
	return t || (t = f({
		isLoaded: !1,
		isMounted: !1,
		language: null
	}), M.set(e, t)), t;
}
function fe(e, t, n = N) {
	let r = M.get(n);
	return r || (r = f({
		isLoaded: !1,
		isMounted: !1,
		language: null
	}), M.set(n, r)), r.isLoaded = t.value?.loaded() || !1, r.isMounted = !1, r.component = e, r.map = t.value, r;
}
//#endregion
//#region lib/components/map.component.ts
var P = n({
	name: "MglMap",
	props: {
		width: {
			type: [Number, String],
			default: "100%"
		},
		height: {
			type: [Number, String],
			default: "100%"
		},
		attributionControl: {
			type: [Boolean, Object],
			default: void 0
		},
		bearing: { type: Number },
		bearingSnap: { type: Number },
		bounds: { type: [Array, Object] },
		boxZoom: {
			type: Boolean,
			default: void 0
		},
		center: { type: [Array, Object] },
		clickTolerance: { type: Number },
		collectResourceTiming: {
			type: Boolean,
			default: void 0
		},
		crossSourceCollisions: {
			type: Boolean,
			default: void 0
		},
		dragPan: {
			type: Boolean,
			default: void 0
		},
		dragRotate: {
			type: Boolean,
			default: void 0
		},
		doubleClickZoom: {
			type: Boolean,
			default: void 0
		},
		hash: {
			type: [Boolean, String],
			default: void 0
		},
		fadeDuration: { type: Number },
		fitBoundsOptions: { type: Object },
		interactive: {
			type: Boolean,
			default: void 0
		},
		keyboard: {
			type: Boolean,
			default: void 0
		},
		locale: { type: Object },
		localIdeographFontFamily: { type: String },
		logoPosition: {
			type: [String],
			validator: (e) => e in A
		},
		maxBounds: { type: [Array, Object] },
		maxPitch: { type: Number },
		maxZoom: { type: Number },
		minPitch: { type: Number },
		minZoom: { type: Number },
		pitch: { type: Number },
		pitchWithRotate: {
			type: Boolean,
			default: void 0
		},
		canvasContextAttributes: { type: Object },
		refreshExpiredTiles: {
			type: Boolean,
			default: void 0
		},
		renderWorldCopies: {
			type: Boolean,
			default: void 0
		},
		scrollZoom: {
			type: Boolean,
			default: void 0
		},
		mapStyle: { type: [String, Object] },
		trackResize: {
			type: Boolean,
			default: void 0
		},
		transformRequest: { type: Function },
		transformCameraUpdate: { type: Function },
		touchZoomRotate: {
			type: Boolean,
			default: void 0
		},
		touchPitch: {
			type: Boolean,
			default: void 0
		},
		zoom: { type: Number },
		maxTileCacheSize: { type: Number },
		mapKey: { type: [String, Symbol] },
		pixelRatio: { type: Number },
		validateStyle: {
			type: Boolean,
			default: void 0
		},
		cooperativeGestures: { type: Boolean }
	},
	emits: /* @__PURE__ */ "map:error.map:load.map:idle.map:remove.map:render.map:resize.map:webglcontextlost.map:webglcontextrestored.map:dataloading.map:data.map:tiledataloading.map:sourcedataloading.map:styledataloading.map:sourcedata.map:styledata.map:styleimagemissing.map:dataabort.map:sourcedataabort.map:boxzoomcancel.map:boxzoomstart.map:boxzoomend.map:touchcancel.map:touchmove.map:touchend.map:touchstart.map:click.map:contextmenu.map:dblclick.map:mousemove.map:mouseup.map:mousedown.map:mouseout.map:mouseover.map:movestart.map:move.map:moveend.map:zoomstart.map:zoom.map:zoomend.map:rotatestart.map:rotate.map:rotateend.map:dragstart.map:drag.map:dragend.map:pitchstart.map:pitch.map:pitchend.map:wheel.map:terrain.map:cooperativegestureprevented.map:projectiontransition.update:center.update:zoom.update:pitch.update:bearing".split("."),
	slots: Object,
	setup(e, t) {
		let n = s(r()), a = m(), o = m(), f = p(!1), h = p(!1), _ = /* @__PURE__ */ new Map(), v = fe(n, o, e.mapKey);
		d(S, o), d(C, h), d(T, f), d(E, n.uid), d(D, ""), g(() => e.bearing, (e) => {
			e && o.value?.setBearing(e);
		}), g(() => e.bounds, (t) => {
			t && o.value?.fitBounds(t, e.fitBoundsOptions);
		}), g(() => e.center, (e) => {
			let t = o.value?.getCenter();
			e && t && !ue(e, t) && o.value?.setCenter(e);
		}), g(() => e.maxBounds, (e) => {
			e && o.value?.setMaxBounds(e);
		}), g(() => e.maxPitch, (e) => {
			e && o.value?.setMaxPitch(e);
		}), g(() => e.maxZoom, (e) => {
			e && o.value?.setMaxZoom(e);
		}), g(() => e.minPitch, (e) => {
			e && o.value?.setMinPitch(e);
		}), g(() => e.minZoom, (e) => {
			e && o.value?.setMinZoom(e);
		}), g(() => e.pitch, (e) => {
			e && o.value?.setPitch(e);
		}), g(() => e.renderWorldCopies, (e) => {
			e && o.value?.setRenderWorldCopies(e);
		}), g(() => e.mapStyle, (e) => {
			e && o.value?.setStyle(e);
		}), g(() => e.transformRequest, (e) => {
			e && o.value?.setTransformRequest(e);
		}), g(() => e.zoom, (e) => {
			e && o.value?.setZoom(e);
		}), g(() => e.zoom, (e) => {
			e && o.value?.setZoom(e);
		});
		function y() {
			v.isMounted = !0;
			let r = {
				...e,
				style: e.mapStyle,
				container: a.value
			};
			for (let e of Object.keys(r)) r[e] === void 0 && delete r[e];
			if (o.value = s(new ee(r)), v.map = o.value, f.value = !0, _.set("__load", () => (h.value = !0, v.isLoaded = !0)), o.value.on("load", _.get("__load")), _.set("__moveend", () => t.emit("update:center", o.value.getCenter())), o.value.on("moveend", _.get("__moveend")), _.set("__zoomend", () => t.emit("update:zoom", o.value.getZoom())), o.value.on("zoomend", _.get("__zoomend")), _.set("__pitchend", () => t.emit("update:pitch", o.value.getPitch())), o.value.on("pitchend", _.get("__pitchend")), _.set("__rotateend", () => t.emit("update:bearing", o.value.getBearing())), o.value.on("rotateend", _.get("__rotateend")), n.vnode.props) {
				for (let e of ce) if (n.vnode.props["onMap:" + e]) {
					let r = `map:${e}`, i = le(n, o.value, t, r);
					_.set(e, i), o.value.on(e, i);
				}
			}
			o.value.getCanvas().addEventListener("webglcontextlost", x);
		}
		async function b() {
			v.isMounted = !1, v.isLoaded = !1, h.value = !1, o.value && (o.value.getCanvas().removeEventListener("webglcontextlost", x), f.value = !1, _.forEach((e, t) => {
				o.value.off(t.startsWith("__") ? t.substring(2) : t, e);
			}), o.value.remove());
		}
		function x() {
			b(), c(y);
		}
		return u(y), l(b), t.expose({ map: o }), () => [i("div", {
			ref: a,
			style: {
				height: e.height,
				width: e.width
			}
		}), f.value && t.slots.default ? t.slots.default({}) : void 0];
	},
	render() {
		return null;
	}
});
//#endregion
//#region lib/composable/usePositionWatcher.ts
function F(e, t, n) {
	g(e, (e) => {
		e && j.indexOf(e) === -1 || (t.value?.hasControl(n) && t.value.removeControl(n), t.value?.addControl(n, e));
	}, { immediate: !0 });
}
//#endregion
//#region lib/composable/useControl.ts
function I(e, t) {
	let n = a(S), r = a(T), i = m();
	return i.value = e(), F(() => t.position, n, i.value), l(() => r.value && n.value?.removeControl(i.value)), {
		control: i,
		map: n
	};
}
//#endregion
//#region lib/components/controls/attribution.control.ts
var L = n({
	name: "MglAttributionControl",
	props: {
		position: {
			type: String,
			validator: (e) => j.indexOf(e) !== -1
		},
		compact: Boolean,
		customAttribution: [String, Array]
	},
	setup(e) {
		I(() => new _({
			compact: e.compact,
			customAttribution: e.customAttribution
		}), e);
	},
	render() {
		return null;
	}
}), pe = class {
	isAdded;
	container;
	constructor(e, t) {
		this.isAdded = e, this.container = document.createElement("div"), this.setClasses(t);
	}
	getDefaultPosition() {
		return A.TOP_LEFT;
	}
	onAdd() {
		return c(() => this.isAdded.value = !0), this.container;
	}
	onRemove() {
		this.isAdded.value = !1, this.container.remove();
	}
	setClasses(e) {
		this.container.className = e;
	}
}, R = n({
	name: "MglCustomControl",
	props: {
		position: {
			type: String,
			validator: (e) => j.indexOf(e) !== -1
		},
		class: {
			type: String,
			default: "maplibregl-ctrl maplibregl-ctrl-group"
		}
	},
	slots: Object,
	setup(n, { slots: r }) {
		let a = p(!1), { control: o } = I(() => new pe(a, n.class), n);
		return g(() => n.class, () => o.value.setClasses(n.class)), () => a.value ? i(e, { to: o.value.container }, r.default?.({})) : t("custom-component");
	},
	render() {
		return null;
	}
}), z = n({
	name: "MglFullscreenControl",
	props: {
		position: {
			type: String,
			validator: (e) => j.indexOf(e) !== -1
		},
		container: {
			type: Object,
			default: null
		}
	},
	setup(e) {
		let { control: t, map: n } = I(() => new v({ container: e.container || void 0 }), e);
		function r() {
			c(() => n.value?.resize());
		}
		t.value.on("fullscreenstart", r), t.value.on("fullscreenend", r), l(() => {
			t.value.off("fullscreenstart", r), t.value.off("fullscreenend", r);
		});
	},
	render() {
		return null;
	}
}), B = n({
	name: "MglGeolocateControl",
	props: {
		position: {
			type: String,
			default: A.TOP_RIGHT,
			validator: (e) => j.indexOf(e) !== -1
		},
		positionOptions: {
			type: Object,
			default: () => ({
				enableHighAccuracy: !1,
				timeout: 6e3
			})
		},
		fitBoundsOptions: {
			type: Object,
			default: () => ({ maxZoom: 15 })
		},
		trackUserLocation: {
			type: Boolean,
			default: !1
		},
		showAccuracyCircle: {
			type: Boolean,
			default: !0
		},
		showUserLocation: {
			type: Boolean,
			default: !0
		}
	},
	emits: [
		"trackuserlocationstart",
		"trackuserlocationend",
		"userlocationlostfocus",
		"userlocationfocus",
		"geolocate",
		"error",
		"outofmaxbounds"
	],
	setup(e, t) {
		let { control: n } = I(() => new y({
			positionOptions: e.positionOptions,
			fitBoundsOptions: e.fitBoundsOptions,
			trackUserLocation: e.trackUserLocation,
			showAccuracyCircle: e.showAccuracyCircle,
			showUserLocation: e.showUserLocation
		}), e);
		function r(e) {
			let r = (n) => {
				t.emit(e, n);
			};
			n.value.on(e, r), l(() => {
				n.value.off(e, r);
			});
		}
		r("trackuserlocationstart"), r("trackuserlocationend"), r("userlocationlostfocus"), r("userlocationfocus"), r("geolocate"), r("error"), r("outofmaxbounds");
	},
	render() {
		return null;
	}
}), V = n({
	name: "MglNavigationControl",
	props: {
		position: {
			type: String,
			validator: (e) => j.indexOf(e) !== -1
		},
		showCompass: {
			type: Boolean,
			default: !0
		},
		showZoom: {
			type: Boolean,
			default: !0
		},
		visualizePitch: Boolean
	},
	setup(e) {
		I(() => new ne({
			showCompass: e.showCompass,
			showZoom: e.showZoom,
			visualizePitch: e.visualizePitch
		}), e);
	},
	render() {
		return null;
	}
}), me = Object.values(/* @__PURE__ */ function(e) {
	return e.IMPERIAL = "imperial", e.METRIC = "metric", e.NAUTICAL = "nautical", e;
}({})), H = n({
	name: "MglScaleControl",
	props: {
		position: {
			type: String,
			validator: (e) => j.indexOf(e) !== -1
		},
		maxWidth: {
			type: Number,
			default: 100
		},
		unit: {
			type: String,
			default: "metric",
			validator: (e) => me.indexOf(e) !== -1
		}
	},
	setup(e) {
		I(() => new ie({
			maxWidth: e.maxWidth,
			unit: e.unit
		}), e);
	},
	render() {
		return null;
	}
}), U = n({
	name: "MglLogoControl",
	props: {
		position: {
			type: String,
			validator: (e) => j.indexOf(e) !== -1
		},
		compact: { type: Boolean }
	},
	setup(e) {
		I(() => new x({ compact: e.compact }), e);
	},
	render() {
		return null;
	}
}), W = n({
	name: "MglMarker",
	emits: [
		"dragstart",
		"drag",
		"dragend",
		"update:coordinates"
	],
	props: {
		coordinates: {
			type: [Object, Array],
			required: !0
		},
		className: String,
		offset: [Object, Array],
		anchor: String,
		color: String,
		draggable: Boolean,
		clickTolerance: Number,
		rotation: Number,
		rotationAlignment: String,
		pitchAlignment: String,
		scale: Number,
		opacity: String,
		opacityWhenCovered: String,
		subpixelPositioning: {
			type: Boolean,
			default: !1
		}
	},
	setup(e, { slots: t, emit: n }) {
		let r = a(S), o = m(), s = p(), c = p(!1), f = /* @__PURE__ */ new Map();
		function h(e, t) {
			let r = (r) => {
				t && t(), n(e, r);
			};
			o.value.on(e, r), f.set(e, r);
		}
		return d(k, o), u(() => {
			let i = { ...e };
			t.marker && (i.element = s.value), o.value = new te(i), o.value.setLngLat(e.coordinates).addTo(r.value), h("dragstart"), h("drag", () => {
				n("update:coordinates", o.value?.getLngLat());
			}), h("dragend", () => {
				n("update:coordinates", o.value?.getLngLat());
			}), c.value = !0;
		}), g(() => e.coordinates, (e) => o.value?.setLngLat(e), { deep: !0 }), g(() => e.draggable, (e) => o.value?.setDraggable(e)), g(() => e.offset, (e) => o.value?.setOffset(e || [0, 0])), g(() => e.pitchAlignment, (e) => o.value?.setPitchAlignment(e || "auto")), g(() => e.rotation, (e) => o.value?.setRotation(e)), g(() => e.rotationAlignment, (e) => o.value?.setRotationAlignment(e || "auto")), g(() => e.opacity, (t) => o.value?.setOpacity(t, e.opacityWhenCovered)), g(() => e.opacityWhenCovered, (t) => o.value?.setOpacity(e.opacity, t)), g(() => e.subpixelPositioning, (e) => o.value?.setSubpixelPositioning(e)), g(() => e.className, (e, t) => {
			t && o.value?.removeClassName(t), e && o.value?.addClassName(e);
		}), l(() => {
			f.forEach((e, t) => {
				o.value?.off(t, e);
			}), o.value?.remove();
		}), () => [i("div", t.default && c.value ? t.default({}) : void 0), i("div", { ref: s }, t.marker ? t.marker() : void 0)];
	},
	render() {
		return null;
	}
}), he = n({
	name: "MglPopup",
	emits: ["open", "close"],
	props: {
		coordinates: {
			type: [Object, Array],
			required: !1
		},
		closeButton: {
			type: Boolean,
			required: !1,
			default: !0
		},
		closeOnClick: {
			type: Boolean,
			required: !1,
			default: !0
		},
		closeOnMove: {
			type: Boolean,
			required: !1,
			default: !1
		},
		focusAfterOpen: {
			type: Boolean,
			required: !1,
			default: !0
		},
		anchor: {
			type: String,
			required: !1
		},
		offset: {
			type: [
				Number,
				Object,
				Array
			],
			required: !1
		},
		className: {
			type: String,
			required: !1
		},
		maxWidth: {
			type: String,
			default: "240px"
		},
		subpixelPositioning: {
			type: Boolean,
			default: !1
		},
		text: {
			type: String,
			required: !1
		}
	},
	setup(e, { slots: t, emit: n, expose: r }) {
		let o = a(S), s = a(k, void 0), c = p(), d = new re(e);
		s && s.value ? s.value.setPopup(d) : e.coordinates && o && d.setLngLat(e.coordinates).addTo(o.value), e.text && d.setText(e.text);
		function f(e) {
			let t = () => n(e);
			d.on(e, t), l(() => {
				d.off(e, t);
			});
		}
		return f("open"), f("close"), r({ remove() {
			d.remove();
		} }), g(() => e.coordinates, (e) => {
			e && d.setLngLat(e);
		}, { deep: !0 }), g(() => e.text, (e) => d.setText(e || "")), g(() => e.offset, (e) => d.setOffset(e)), g(() => e.maxWidth, (e) => d.setMaxWidth(e)), g(() => e.className, (e, t) => {
			t && d.removeClassName(t), e && d.addClassName(e);
		}), g(() => e.subpixelPositioning, (e) => d.setSubpixelPositioning(e)), u(() => {
			c.value && !e.text && d.setDOMContent(c.value);
		}), l(() => {
			d.remove();
		}), () => [i("div", { ref: c }, t.default ? t.default() : void 0)];
	},
	render() {
		return null;
	}
}), ge = n({
	name: "MglImage",
	props: {
		id: {
			type: String,
			required: !0
		},
		image: Object,
		url: String,
		options: Object
	},
	setup(e) {
		let t = a(S);
		if (!e.url && !e.image) return h(`${e.id} image: missing prop url or image`), () => [];
		if (!t.value.hasImage(e.id)) return (async () => {
			let n = e.image;
			e.url && (n = (await t.value.loadImage(e.url)).data), t.value.addImage(e.id, n, e.options);
		})(), () => [];
	}
}), G = class {
	unmountHandlers = /* @__PURE__ */ new Map();
	registerUnmountHandler(e, t) {
		this.unmountHandlers.set(e, t);
	}
	unregisterUnmountHandler(e) {
		this.unmountHandlers.delete(e);
	}
	unmount() {
		this.unmountHandlers.forEach((e) => e());
	}
}, K = class e {
	static REFS = /* @__PURE__ */ new Map();
	static genSourceOpts(e) {
		let t = { ...e };
		for (let e of Object.keys(t)) (t[e] === void 0 || e === "sourceId") && delete t[e];
		return t;
	}
	static getSourceRef(t, n) {
		let r = typeof n == "string", i = String(t) + (r ? n : ""), a = e.REFS.get(i);
		return a || (a = p(r ? null : void 0), e.REFS.set(i, a)), a;
	}
};
//#endregion
//#region lib/composable/useSource.ts
function q(e, t, n) {
	let r = a(S), i = a(C);
	function o() {
		i.value && !r.value?.getSource(t.sourceId) && (r.value.addSource(t.sourceId, K.genSourceOpts(t)), e.value = r.value.getSource(t.sourceId));
	}
	return g(i, o, { immediate: !0 }), r.value.on("styledata", o), l(() => {
		i.value && r.value?.getSource(t.sourceId) && (n.unmount(), r.value.removeSource(t.sourceId)), r.value.off("styledata", o), e.value = void 0;
	});
}
//#endregion
//#region lib/components/sources/canvas.source.ts
var _e = n({
	name: "MglCanvasSource",
	props: {
		sourceId: {
			type: String,
			required: !0
		},
		coordinates: Array,
		animate: Boolean,
		canvas: [Object, String]
	},
	slots: Object,
	setup(e, { slots: n }) {
		let r = a(E), i = K.getSourceRef(r, e.sourceId), s = new G(), c = {
			...e,
			type: "canvas"
		};
		return d(D, e.sourceId), d(O, s), q(i, c, s), g([o(e.coordinates) ? e.coordinates : () => e.coordinates, i], ([e, t]) => {
			t?.setCoordinates(e);
		}, { immediate: !0 }), () => [t("Canvas Source"), i.value && n.default ? n.default({}) : void 0];
	}
}), ve = n({
	name: "MglGeoJsonSource",
	props: {
		sourceId: {
			type: String,
			required: !0
		},
		data: {
			type: [Object, String],
			required: !0
		},
		maxzoom: Number,
		attribution: String,
		buffer: Number,
		tolerance: Number,
		cluster: Boolean,
		clusterRadius: Number,
		clusterMaxZoom: Number,
		clusterMinPoints: Number,
		clusterProperties: Object,
		lineMetrics: Boolean,
		generateId: Boolean,
		promoteId: [Object, String],
		filter: [
			Array,
			String,
			Object
		]
	},
	slots: Object,
	setup(e, { slots: n }) {
		let r = a(E), i = K.getSourceRef(r, e.sourceId), s = new G(), c = {
			...e,
			type: "geojson"
		};
		return d(D, e.sourceId), d(O, s), q(i, c, s), g([o(e.data) ? e.data : () => e.data, i], ([e, t]) => {
			t?.loaded() && t?.setData(e || {
				type: "FeatureCollection",
				features: []
			});
		}, { immediate: !0 }), () => [t("GeoJSON Source"), i.value && n.default ? n.default({}) : void 0];
	}
}), ye = n({
	name: "MglImageSource",
	props: {
		sourceId: {
			type: String,
			required: !0
		},
		url: String,
		coordinates: Array
	},
	slots: Object,
	setup(e, { slots: n }) {
		let r = a(E), i = K.getSourceRef(r, e.sourceId), s = new G(), c = {
			...e,
			type: "image"
		};
		return d(D, e.sourceId), d(O, s), q(i, c, s), g([o(e.coordinates) ? e.coordinates : () => e.coordinates, i], ([e, t]) => {
			t?.setCoordinates(e);
		}, { immediate: !0 }), () => [t("Image Source"), i.value && n.default ? n.default({}) : void 0];
	}
}), be = n({
	name: "MglRasterSource",
	props: {
		sourceId: {
			type: String,
			required: !0
		},
		url: String,
		tiles: Array,
		bounds: Array,
		minzoom: Number,
		maxzoom: Number,
		tileSize: Number,
		scheme: String,
		attribution: String,
		volatile: Boolean
	},
	slots: Object,
	setup(e, { slots: n }) {
		let r = a(E), i = K.getSourceRef(r, e.sourceId), o = new G(), s = {
			...e,
			type: "raster"
		};
		return d(D, e.sourceId), d(O, o), q(i, s, o), () => [t("Raster Source"), i.value && n.default ? n.default({}) : void 0];
	}
}), xe = n({
	name: "MglRasterDemSource",
	props: {
		sourceId: {
			type: String,
			required: !0
		},
		url: String,
		tiles: Array,
		bounds: Array,
		minzoom: Number,
		maxzoom: Number,
		tileSize: Number,
		attribution: String,
		encoding: String,
		volatile: Boolean,
		redFactor: Number,
		blueFactor: Number,
		greenFactor: Number,
		baseShift: Number
	},
	slots: Object,
	setup(e, { slots: n }) {
		let r = a(E), i = K.getSourceRef(r, e.sourceId), o = new G(), s = {
			...e,
			type: "raster-dem"
		};
		return d(D, e.sourceId), d(O, o), q(i, s, o), () => [t("RasterDem Source"), i.value && n.default ? n.default({}) : void 0];
	}
}), Se = n({
	name: "MglVectorSource",
	props: {
		sourceId: {
			type: String,
			required: !0
		},
		url: String,
		tiles: Array,
		bounds: {
			type: Array,
			validator: function(e) {
				return e.length === 4;
			}
		},
		scheme: String,
		minzoom: Number,
		maxzoom: Number,
		attribution: String,
		promoteId: [Object, String],
		volatile: Boolean
	},
	slots: Object,
	setup(e, { slots: n }) {
		let r = a(E), i = K.getSourceRef(r, e.sourceId), s = new G(), c = {
			...e,
			type: "vector"
		};
		return d(D, e.sourceId), d(O, s), q(i, c, s), g([o(e.tiles) ? e.tiles : () => e.tiles, i], ([e, t]) => {
			t?.loaded() && t.setTiles(e || []);
		}, { immediate: !0 }), g([o(e.url) ? e.url : () => e.url, i], ([e, t]) => {
			t?.loaded() && t.setUrl(e || "");
		}, { immediate: !0 }), () => [t("Vector Source"), i.value && n.default ? n.default({}) : void 0];
	}
}), Ce = n({
	name: "MglVideoSource",
	props: {
		sourceId: {
			type: String,
			required: !0
		},
		urls: Array,
		coordinates: Array
	},
	slots: Object,
	setup(e, { slots: n }) {
		let r = a(E), i = K.getSourceRef(r, e.sourceId), s = new G(), c = {
			...e,
			type: "video"
		};
		return d(D, e.sourceId), d(O, s), q(i, c, s), g([o(e.coordinates) ? e.coordinates : () => e.coordinates, i], ([e, t]) => {
			t?.setCoordinates(e);
		}, { immediate: !0 }), () => [t("Video Source"), i.value && n.default ? n.default({}) : void 0];
	}
}), J = [
	"click",
	"dblclick",
	"mousedown",
	"mouseup",
	"mousemove",
	"mouseenter",
	"mouseleave",
	"mouseover",
	"mouseout",
	"contextmenu",
	"touchstart",
	"touchend",
	"touchcancel"
];
function Y() {
	return {
		layerId: {
			type: String,
			required: !0
		},
		source: { type: String },
		metadata: { type: [
			Object,
			Array,
			String,
			Number
		] },
		sourceLayer: { type: String },
		minzoom: { type: Number },
		maxzoom: { type: Number },
		filter: { type: Object },
		before: { type: String },
		layout: { type: Object },
		paint: { type: Object }
	};
}
function we(e, t, n, r) {
	let i = {
		id: e,
		type: t,
		source: n.source || r,
		metadata: n.metadata,
		minzoom: n.minzoom,
		maxzoom: n.maxzoom,
		"source-layer": n.sourceLayer,
		filter: n.filter,
		paint: n.paint,
		layout: n.layout
	};
	for (let e of Object.keys(i)) i[e] === void 0 && delete i[e];
	return i;
}
function Te(e, t, n) {
	if (n.props) for (let r of J) {
		let i = "on" + r.charAt(0).toUpperCase() + r.substr(1);
		n.props[i] && e.on(r, t, n.props[i]);
	}
}
function Ee(e, t, n) {
	if (n.props) for (let r of J) {
		let i = "on" + r.charAt(0).toUpperCase() + r.substr(1);
		n.props[i] && e.off(r, t, n.props[i]);
	}
}
//#endregion
//#region lib/composable/useDisposableLayer.ts
function X(e, t) {
	let n = a(S), r = a(C), i = a(O);
	function o() {
		r.value && (t && Ee(n.value, e, t.vnode), n.value.getLayer(e) && n.value.removeLayer(e));
	}
	i.registerUnmountHandler(e, o), l(() => {
		i.unregisterUnmountHandler(e), o();
	});
}
//#endregion
//#region lib/components/layers/background.layer.ts
var De = n({
	name: "MglBackgroundLayer",
	props: {
		layerId: {
			type: String,
			required: !0
		},
		metadata: [
			Object,
			Array,
			String,
			Number
		],
		minzoom: Number,
		maxzoom: Number,
		before: String,
		layout: Object,
		paint: Object
	},
	emits: [...J],
	setup(e) {
		let n = a(S), r = a(C);
		return X(e.layerId), g(() => e.layout, (t) => {
			if (t) for (let [r, i] of Object.entries(t)) n.value.setLayoutProperty(e.layerId, r, i);
		}), g(() => e.paint, (t) => {
			if (t) for (let [r, i] of Object.entries(t)) n.value.setPaintProperty(e.layerId, r, i);
		}), g(r, (t) => {
			t && n.value.addLayer({
				id: e.layerId,
				type: "background",
				metadata: e.metadata,
				minzoom: e.minzoom,
				maxzoom: e.maxzoom,
				layout: e.layout,
				paint: e.paint
			}, e.before || void 0);
		}, { immediate: !0 }), () => t("Background Layer");
	}
});
//#endregion
//#region lib/composable/useLayer.ts
function Z(e, n) {
	let i = a(D);
	if (!i && !n.source) {
		h(`${e} Layer: layer must be used inside source tag or source prop must be set`);
		return;
	}
	let o = r(), s = a(S), c = a(C), l = a(E), u = K.getSourceRef(l, n.source || i);
	return X(n.layerId, o), g(() => n.minzoom, () => s.value.setLayerZoomRange(n.layerId, n.minzoom || 0, n.maxzoom || 24)), g(() => n.maxzoom, () => s.value.setLayerZoomRange(n.layerId, n.minzoom || 0, n.maxzoom || 24)), g(() => n.layout, (e) => {
		if (e) for (let [t, r] of Object.entries(e)) s.value.setLayoutProperty(n.layerId, t, r);
	}, { deep: !0 }), g(() => n.paint, (e) => {
		if (e) for (let [t, r] of Object.entries(e)) s.value.setPaintProperty(n.layerId, t, r);
	}, { deep: !0 }), g(() => n.filter, (e) => s.value.setFilter(n.layerId, e), { deep: !0 }), g([c, u], ([t, r]) => {
		t && (r || r === void 0) && (s.value.addLayer(we(n.layerId, e, n, i), n.before || void 0), Te(s.value, n.layerId, o.vnode));
	}, { immediate: !0 }), () => t(`${e} Layer`);
}
//#endregion
//#region lib/components/layers/circle.layer.ts
var Oe = n({
	name: "MglCircleLayer",
	props: Y(),
	emits: [...J],
	setup(e) {
		return Z("circle", e);
	}
}), ke = n({
	name: "MglFillLayer",
	props: Y(),
	emits: [...J],
	setup(e) {
		return Z("fill", e);
	}
}), Ae = n({
	name: "MglFillExtrusionLayer",
	props: Y(),
	emits: [...J],
	setup(e) {
		return Z("fill-extrusion", e);
	}
}), je = n({
	name: "MglHeatmapLayer",
	props: Y(),
	emits: [...J],
	setup(e) {
		return Z("heatmap", e);
	}
}), Q = n({
	name: "MglHillshadeLayer",
	props: Y(),
	emits: [...J],
	setup(e) {
		return Z("hillshade", e);
	}
}), Me = n({
	name: "MglLineLayer",
	props: Y(),
	emits: [...J],
	setup(e) {
		return Z("line", e);
	}
}), Ne = n({
	name: "MglRasterLayer",
	props: Y(),
	emits: [...J],
	setup(e) {
		return Z("raster", e);
	}
}), $ = n({
	name: "MglSymbolLayer",
	props: Y(),
	emits: [...J],
	setup(e) {
		return Z("symbol", e);
	}
}), Pe = /* @__PURE__ */ oe({
	MglAttributionControl: () => L,
	MglBackgroundLayer: () => De,
	MglCanvasSource: () => _e,
	MglCircleLayer: () => Oe,
	MglCustomControl: () => R,
	MglFillExtrusionLayer: () => Ae,
	MglFillLayer: () => ke,
	MglFullscreenControl: () => z,
	MglGeoJsonSource: () => ve,
	MglGeolocateControl: () => B,
	MglHeatmapLayer: () => je,
	MglHillshadeLayer: () => Q,
	MglImage: () => ge,
	MglImageSource: () => ye,
	MglLineLayer: () => Me,
	MglLogoControl: () => U,
	MglMap: () => P,
	MglMarker: () => W,
	MglNavigationControl: () => V,
	MglPopup: () => he,
	MglRasterDemSource: () => xe,
	MglRasterLayer: () => Ne,
	MglRasterSource: () => be,
	MglScaleControl: () => H,
	MglSymbolLayer: () => $,
	MglVectorSource: () => Se,
	MglVideoSource: () => Ce
}), Fe = function(e) {
	Object.entries(Pe).forEach(([t, n]) => {
		e.component(t, n);
	});
};
//#endregion
export { L as MglAttributionControl, De as MglBackgroundLayer, _e as MglCanvasSource, Oe as MglCircleLayer, R as MglCustomControl, Ae as MglFillExtrusionLayer, ke as MglFillLayer, z as MglFullscreenControl, ve as MglGeoJsonSource, B as MglGeolocateControl, je as MglHeatmapLayer, Q as MglHillshadeLayer, ge as MglImage, ye as MglImageSource, Me as MglLineLayer, U as MglLogoControl, P as MglMap, W as MglMarker, V as MglNavigationControl, he as MglPopup, xe as MglRasterDemSource, Ne as MglRasterLayer, be as MglRasterSource, H as MglScaleControl, $ as MglSymbolLayer, Se as MglVectorSource, Ce as MglVideoSource, A as Position, E as componentIdSymbol, Fe as default, w as isInitialized, T as isInitializedSymbol, C as isLoadedSymbol, se as map, S as mapSymbol, k as markerSymbol, D as sourceIdSymbol, O as sourceLayerRegistry, I as useControl, X as useDisposableLayer, de as useMap, F as usePositionWatcher, q as useSource };

//# sourceMappingURL=vue-maplibre-gl.es.js.map