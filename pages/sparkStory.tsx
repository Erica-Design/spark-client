"use client";

import DesktopSparkStory from "@components/desktop/pages/sparkstory";
import MobileSparkStory from "@components/mobile/pages/sparkstory";
import useMobile from "@hooks/useMobile";


export default function SparkStoryPage() {
    const isMobile = useMobile();
    if (isMobile) return <MobileSparkStory />
    return (
        <DesktopSparkStory />
    );
}