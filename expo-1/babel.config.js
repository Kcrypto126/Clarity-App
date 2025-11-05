module.exports = function (api) {
	api.cache(true);
	return {
		presets: [
			["babel-preset-expo", { jsxImportSource: "nativewind" }],
			"nativewind/babel",
		],
		plugins: [
			// Both plugins are needed but with unique names to avoid conflicts
			["react-native-worklets/plugin", {}, "worklets"],
			["react-native-reanimated/plugin", {}, "reanimated"],
		],
	};
};
