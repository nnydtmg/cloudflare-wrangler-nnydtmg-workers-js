const { describe, it, before, after } = require("node:test");
const assert = require("node:assert/strict");
const { unstable_dev } = require("wrangler");

// Jest の VM サンドボックス内では wrangler 4 の unstable_dev が
// エラー判定（クロスレルムの instanceof）に失敗するため、Node.js 標準のテストランナーを使う。
describe("Worker", () => {
	let worker;

	before(async () => {
		worker = await unstable_dev("src/index.js", {
			experimental: { disableExperimentalWarning: true },
		});
	});

	after(async () => {
		await worker?.stop();
	});

	it("should return Hello World", async () => {
		const resp = await worker.fetch();
		assert.equal(resp.status, 200);
		assert.equal(await resp.text(), "Hello World from wrangler!");
	});
});
