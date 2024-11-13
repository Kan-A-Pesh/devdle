import { AuroraBackground } from "@/components/ui/aurora-background";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { Outlet } from "react-router-dom";
import { FloatingDock } from "@/components/ui/floating-dock";

import { GithubIcon } from "@/components/icons/animated/github";
import { HomeIcon } from "@/components/icons/animated/home";
import { PartyPopperIcon } from "@/components/icons/animated/party-popper";
import { SettingsGearIcon } from "@/components/icons/animated/settings-gear";
import { UserIcon } from "@/components/icons/animated/user";

export default function App() {
    return (
        <main className="min-h-screen flex flex-col md:pb-24">
            <AuroraBackground />
            <TextHoverEffect text="Devdle" />
            <Outlet />
            <FloatingDock
                items={[
                    {
                        title: "Home",
                        icon: HomeIcon,
                        to: "/",
                    },
                    {
                        title: "Play",
                        icon: PartyPopperIcon,
                        to: "/play",
                    },
                    {
                        title: "Profile",
                        icon: UserIcon,
                        to: "/profile",
                    },
                    {
                        title: "Settings",
                        icon: SettingsGearIcon,
                        to: "/settings",
                    },
                    {
                        title: "Github",
                        icon: GithubIcon,
                        to: "https://github.com/Kan-A-Pesh/devdle",
                    },
                ]}
                mobileClassName="fixed bottom-4 right-4"
                desktopClassName="bg-white dark:bg-neutral-900 fixed bottom-4 left-[50%] -translate-x-1/2"
            />
        </main>
    );
}
