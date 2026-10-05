"use client";

import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SuppliersFound from "./SuppliersFound";

export default function SuppliersDrawer() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (isMobile === null) return null;

  if (!isMobile) {
    return (
      <div className="absolute inset-0 z-10 flex items-start justify-center bg-neutral-400">
        <SuppliersFound onBack={() => router.back()} />
      </div>
    );
  }

  return (
    <Drawer open onOpenChange={(open) => !open && router.back()}>
      <DrawerContent className="max-h-[85dvh] bg-neutral-400 [&>button]:hidden">
        <DrawerTitle className="sr-only">Suppliers found</DrawerTitle>
        <SuppliersFound onBack={() => router.back()} />
      </DrawerContent>
    </Drawer>
  );
}
