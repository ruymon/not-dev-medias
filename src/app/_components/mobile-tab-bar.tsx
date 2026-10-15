import { NAVBAR_ITEMS } from "@/config/navbar";
import { NavLink } from "./nav-link";

/**
 * iOS-style tab bar. The bar itself is 49px; the home-indicator inset is added
 * below it as padding, so the targets stay clear of the system gesture area
 * when the app is opened from the home screen.
 */
export function MobileTabBar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background/80 pb-safe backdrop-blur-xl backdrop-saturate-150 md:hidden">
      <div className="flex h-tab-bar">
        {NAVBAR_ITEMS.map((item) => (
          <NavLink key={item.href} href={item.href} variant="tab" />
        ))}
      </div>
    </nav>
  );
}
