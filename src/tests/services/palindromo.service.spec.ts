import { palindromesService } from "../../services/palindromos"

describe("Palindromes test", () => {

    test("Should return 3 palindromes", async () => {
        const response = await palindromesService(10,33)

        expect(response).toHaveLength(3)
        expect(response).toContain(11)
        expect(response).toContain(22)
        expect(response).toContain(33)
    } )

    test("Should return a empty array", async () => {
        const response = await palindromesService(12,21)

        expect(response).toHaveLength(0)
    } )
})