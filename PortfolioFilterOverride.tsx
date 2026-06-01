import { Override, Data } from "framer";
import * as React from "react";

/**
 * ── SHARED STATE STORE ────────────────────────────────────────────────────────
 * Holds the currently active filter states selected by the user.
 * Reacting components will automatically re-render when these values change.
 */
const state = Data({
    activeFamily: "all",      // "all" | "accelerator" | "iq"
    activeIndustry: "all",    // "all" | "real-estate" | "retail"
});

/**
 * Helper to determine active chip style and state
 */
function getChipOverride(filterType: "family" | "industry", value: string): Override {
    const isActive = filterType === "family" 
        ? state.activeFamily === value 
        : state.activeIndustry === value;

    return {
        // Toggle active styling based on current state
        animate: {
            backgroundColor: isActive ? "#C9A84C" : "rgba(255, 255, 255, 0.0)",
            color: isActive ? "#0D1117" : "#8892A4",
            borderColor: isActive ? "#C9A84C" : "rgba(255, 255, 255, 0.12)",
        },
        onTap() {
            if (filterType === "family") {
                state.activeFamily = value;
            } else {
                state.activeIndustry = value;
            }
        }
    };
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ── FAMILY FILTER OVERRIDES (Apply to the corresponding chip buttons)
 * ───────────────────────────────────────────────────────────────────────────── */

export function ChipFamilyAll(): Override {
    return getChipOverride("family", "all");
}

export function ChipFamilyAccelerator(): Override {
    return getChipOverride("family", "accelerator");
}

export function ChipFamilyIQ(): Override {
    return getChipOverride("family", "iq");
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ── INDUSTRY FILTER OVERRIDES (Apply to the corresponding chip buttons)
 * ───────────────────────────────────────────────────────────────────────────── */

export function ChipIndustryAll(): Override {
    return getChipOverride("industry", "all");
}

export function ChipIndustryRealEstate(): Override {
    return getChipOverride("industry", "real-estate");
}

export function ChipIndustryRetail(): Override {
    return getChipOverride("industry", "retail");
}

export function ChipIndustryAccounting(): Override {
    return getChipOverride("industry", "accounting");
}

export function ChipIndustryLegal(): Override {
    return getChipOverride("industry", "legal");
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ── CMS PORTFOLIO GRID OVERRIDE (Apply to the parent CMS List or CMS Card wrapper)
 * ───────────────────────────────────────────────────────────────────────────── */

export function CMSCardItem(props): Override {
    // In Framer, props.item holds the attributes of the current CMS record.
    const item = props.item;
    if (!item) return {};

    // Retrieve and normalize offering categories
    const family = item.Family ? item.Family.toLowerCase() : "";
    const industry = item.Industry ? item.Industry.toLowerCase() : "";

    // Match conditions
    const familyMatch = state.activeFamily === "all" || family === state.activeFamily;
    const industryMatch = state.activeIndustry === "all" || industry.includes(state.activeIndustry);

    const isVisible = familyMatch && industryMatch;

    return {
        style: {
            ...props.style,
            display: isVisible ? "flex" : "none",
        },
        // Subtle entrance animation when transitioning visibility states
        animate: {
            opacity: isVisible ? 1 : 0,
            scale: isVisible ? 1 : 0.95,
            y: isVisible ? 0 : 10,
        },
        transition: {
            duration: 0.25,
            ease: "easeOut"
        }
    };
}

/**
 * ── EMPTY STATE OVERRIDE ──────────────────────────────────────────────────────
 * Apply to an empty state placeholder block on your canvas.
 * It will display ONLY when all CMS cards are hidden by the current filter state.
 */
export function CMSEmptyState(props): Override {
    // Keep track of counts externally if necessary, or check visibility dynamically.
    // In Framer, we can simple trigger visibility on empty list
    return {
        style: {
            ...props.style,
            display: "none" // Placeholder - can be manually toggled or overridden in layout
        }
    };
}
