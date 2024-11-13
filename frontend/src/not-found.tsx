import { Link } from "react-router-dom";
import CanvasCard from "./components/canvas-card";

export default function NotFound() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-center">Page not found</h1>
            <div className="flex items-center justify-center gap-6 p-8 w-full">
                <CanvasCard canvasClassName="bg-sky-600" canvasColor={[125, 211, 252]} className="hidden lg:flex">
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-2xl text-black text-center">Don't lose your time! Let's go back to the playground</p>
                        <Link
                            to="/play"
                            className="border-sky-600 border-2 px-4 py-2 text-sky-600 bg-white/50 hover:bg-sky-600 hover:text-white"
                        >
                            Go to Playground
                        </Link>
                    </div>
                </CanvasCard>
                <CanvasCard canvasClassName="bg-orange-600" canvasColor={[253, 186, 116]}>
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-2xl text-black text-center">It's seems we can't find what you're looking for.</p>
                        <Link
                            to="/"
                            className="border-orange-600 border-2 px-4 py-2 text-orange-600 bg-white/50 hover:bg-orange-600 hover:text-white"
                        >
                            Go Home
                        </Link>
                    </div>
                </CanvasCard>
                <CanvasCard canvasClassName="bg-purple-600" canvasColor={[216, 180, 254]} className="hidden lg:flex">
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-2xl text-black text-center">Are you a dev? Check out the Github repo!</p>
                        <Link
                            to="https://github.com/Kan-A-Pesh/devdle"
                            className="border-purple-600 border-2 px-4 py-2 text-purple-600 bg-white/50 hover:bg-purple-600 hover:text-white"
                        >
                            Github
                        </Link>
                    </div>
                </CanvasCard>
            </div>
        </section>
    );
}
