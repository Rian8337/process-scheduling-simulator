import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Providers } from "./hooks";
import "./index.css";

(async () => {
    // Load fonts
    const fonts = [
        ["Torus-Thin", 100],
        ["Torus-Light", 300],
        ["Torus-Regular", 400],
        ["Torus-SemiBold", 600],
        ["Torus-SemiBold", 700],
        ["Torus-Bold", 800],
        ["Torus-Heavy", 900],
    ] as const;

    for (const [fontFile, weight] of fonts) {
        try {
            const face = new FontFace("Torus", `url(./fonts/${fontFile}.otf)`, {
                weight: weight.toString(),
            });

            await face.load();

            document.fonts.add(face);
        } catch (e) {
            console.error(e);
        }
    }

    // Load React root
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    createRoot(document.getElementById("root")!).render(
        <StrictMode>
            <Providers>
                <App />
            </Providers>
        </StrictMode>
    );
})().catch(console.error);
