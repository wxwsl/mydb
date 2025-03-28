import { DurableObject } from "cloudflare:workers";
declare namespace Cloudflare {
	interface Env {
			MY_VARIABLE: "shrimp_value";
			MY_KV:KVNamespace;
			DB:D1Database;
	}
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		console.log(env.MY_VARIABLE)
		await env.MY_KV.put("test","llii")
		console.log(await env.MY_KV.get("test"))
		 // 插入数据示例
		const insertStmt = await env.DB.prepare(
					"INSERT INTO Customers (CompanyName) VALUES (?)"
		).bind("测试公司");
		await insertStmt.run();
        const { results } = await env.DB.prepare(
            "SELECT * FROM Customers"
        ).all();
		return new Response(JSON.stringify(results), {
			headers: { "Content-Type": "application/json" }
		});
		return new Response('Hello World!');
	},
} satisfies ExportedHandler<Env>;
