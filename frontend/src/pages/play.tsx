import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

// TODO: Replace this with languages from API
const guessPlaceholders = ["Python", "Java", "C++", "C#", "Go", "Javascript", "Rust", "Swift", "Kotlin"];

export default function Play() {
    return (
        <section className="flex-1 flex flex-col items-center justify-center gap-6 p-4">
            <h2 className="text-2xl sm:text-4xl font-bold text-center">Make your first guess</h2>
            <PlaceholdersAndVanishInput
                values={guessPlaceholders}
                onValueSubmit={(id) => {
                    console.log(guessPlaceholders[id]);
                }}
            />
            <div className="grid grid-cols-[auto_auto_auto_auto_auto_auto_auto] max-w-3xl w-full rounded-2xl bg-white/75 dark:bg-zinc-800/75 gap-x-2 p-2">
                <div></div>
                <div className="font-bold pb-2">
                    <p>Name</p>
                </div>
                <div className="font-bold">
                    <p>Year</p>
                </div>
                <div className="font-bold">
                    <p>Creator</p>
                </div>
                <div className="font-bold">
                    <p>Paradigm</p>
                </div>
                <div className="font-bold">
                    <p>Typings</p>
                </div>
                <div className="font-bold">
                    <p>Applications</p>
                </div>

                <div>
                    <img src="https://via.placeholder.com/150" alt="" />
                </div>
                <div className="flex items-center">
                    <p>Python</p>
                </div>
                <div className="flex items-center">
                    <p>1991</p>
                </div>
                <div className="flex items-center">
                    <p>Guido van Rossum</p>
                </div>
                <div className="flex items-center">
                    <p>Procedural</p>
                </div>
                <div className="flex items-center">
                    <p>Strong, Dynamic</p>
                </div>
                <div className="flex items-center">
                    <p>Data science, Backend, DevOps, Applications</p>
                </div>
            </div>
        </section>
    );
}
