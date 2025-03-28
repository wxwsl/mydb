import { DurableObject } from "cloudflare:workers";

/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
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
        const { results } = await env.DB.prepare(
            "SELECT * FROM Customers"
        ).all();
		return new Response('Hello World!');
	},
} satisfies ExportedHandler<Env>;
