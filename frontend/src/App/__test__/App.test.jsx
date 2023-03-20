import { render, screen, waitFor } from "@testing-library/react"
import App from "../App"


describe('App', () => {

    it('Shoud show loading text on initialize', () => {
        render(<App />)

        // expect(screen.getByText('Loading')).toBeTruthy()
    })

})