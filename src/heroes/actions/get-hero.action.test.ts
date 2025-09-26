import { describe, expect, test } from "vitest";
import { heroApi } from "../api/hero.api";
import { getHero } from "./get-hero.action";

describe('GetHeroAction', () => {
    test("should get hero data and return complete image url", async () => {
        expect(heroApi).toBeDefined();
        const response = await getHero("clark-kent");
        expect(response).not.toBeNull();
        expect(response.image).toContain("/images/");
    });

    test("should throw an error if hero is not found", async () => {
        const result = await getHero("clark-kenton").catch(error => {
            // console.log( error.response.data);
            expect(error).not.toBeNull();
            // expect(error).toContain("message");
            expect(error.message).toBe("Request failed with status code 404");
            expect(error.response.data).toStrictEqual({
                "message": "Hero not found",
                "error": "Not Found",
                "statusCode": 404
            });
        });

        expect(result).toBeUndefined();
    });
});