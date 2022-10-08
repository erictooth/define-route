import { paramProxy } from "../paramProxy";

it("reflects requested fields", () => {
	expect((paramProxy as any).random).toEqual(":random");
});
