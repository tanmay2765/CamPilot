//#region node_modules/.nitro/vite/services/ssr/assets/utils-D3up8z9V.js
/** Format a number as Indian Rupee shorthand (₹1.2K, ₹4.50L, ₹1.20Cr) */
function inr(n) {
	if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)}Cr`;
	if (n >= 1e5) return `₹${(n / 1e5).toFixed(2)}L`;
	if (n >= 1e3) return `₹${(n / 1e3).toFixed(1)}K`;
	return `₹${n.toLocaleString("en-IN")}`;
}
/** Format a number with compact notation (1.2K, 2.50M) */
function num(n) {
	if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
	if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
	return n.toLocaleString("en-IN");
}
//#endregion
export { num as n, inr as t };
