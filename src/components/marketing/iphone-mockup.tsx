"use client";

import React, { useEffect, useState } from "react";

interface IPhoneMockupProps {
  children: React.ReactNode;
  scale?: number;
  url?: string;
}

import {
  PHONE_BEZEL,
  PHONE_OUTER_RADIUS,
  PHONE_SCREEN_RADIUS,
  PHONE_OUTER_WIDTH,
  PHONE_OUTER_HEIGHT,
} from "@/lib/phone-mockup";
import { CARD_HOST_PREFIX } from "@/lib/constants";

const STATUS_AND_URL_BAR_HEIGHT = 88;

/** iPhone shell matching onetap-app admin preview (FloatingPhonePreview / IPhoneMockup). */
export function IPhoneMockup({ children, scale = 0.55, url }: IPhoneMockupProps) {
  const outerWidth = PHONE_OUTER_WIDTH;
  const outerHeight = PHONE_OUTER_HEIGHT;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const displayBaseUrl = CARD_HOST_PREFIX;

  return (
    <div
      className="relative shrink-0 leading-none overflow-hidden"
      style={{
        width: outerWidth * scale,
        height: outerHeight * scale,
        borderRadius: PHONE_OUTER_RADIUS * scale,
      }}
    >
      <div
        style={{
          width: outerWidth,
          height: outerHeight,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <div
          className="relative overflow-hidden bg-[#1a1a1a] shadow-2xl"
          style={{
            width: outerWidth,
            height: outerHeight,
            borderRadius: PHONE_OUTER_RADIUS,
            padding: PHONE_BEZEL,
          }}
        >
          <div
            className="absolute bg-[#2a2a2a] rounded-r-sm"
            style={{ left: -2, top: 120, width: 3, height: 32 }}
          />
          <div
            className="absolute bg-[#2a2a2a] rounded-r-sm"
            style={{ left: -2, top: 170, width: 3, height: 56 }}
          />
          <div
            className="absolute bg-[#2a2a2a] rounded-r-sm"
            style={{ left: -2, top: 235, width: 3, height: 56 }}
          />
          <div
            className="absolute bg-[#2a2a2a] rounded-l-sm"
            style={{ right: -2, top: 190, width: 3, height: 72 }}
          />

          <div
            className="relative isolate h-full w-full overflow-hidden bg-white"
            style={{ borderRadius: PHONE_SCREEN_RADIUS }}
          >
            <div className="absolute top-0 left-0 right-0 z-[100] bg-white pointer-events-none" dir="ltr">
              <div
                className="relative flex items-center justify-between px-6 pt-[14px] pb-0"
                style={{ height: 54 }}
              >
                <span className="text-[15px] font-semibold text-black/90 w-12">
                  {isClient
                    ? new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: false })
                    : "09:41"}
                </span>
                <div
                  className="bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-[10px]"
                  style={{ width: 126, height: 36 }}
                />
                <div className="flex items-center gap-[5px]">
                  <svg width="17" height="12" viewBox="0 0 17 12" fill="none" className="text-black/90">
                    <rect x="0" y="7" width="3" height="5" rx="0.5" fill="currentColor" opacity="0.4" />
                    <rect x="4.5" y="5" width="3" height="7" rx="0.5" fill="currentColor" opacity="0.6" />
                    <rect x="9" y="2.5" width="3" height="9.5" rx="0.5" fill="currentColor" opacity="0.8" />
                    <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="currentColor" />
                  </svg>
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className="text-black/90">
                    <path
                      d="M8 2.4C10.6 2.4 12.9 3.5 14.5 5.3L15.3 4.5C13.5 2.4 10.9 1.1 8 1.1C5.1 1.1 2.5 2.4 0.7 4.5L1.5 5.3C3.1 3.5 5.4 2.4 8 2.4Z"
                      fill="currentColor"
                      opacity="0.4"
                    />
                    <path
                      d="M8 5.6C9.8 5.6 11.4 6.3 12.5 7.5L13.3 6.7C12 5.2 10.1 4.3 8 4.3C5.9 4.3 4 5.2 2.7 6.7L3.5 7.5C4.6 6.3 6.2 5.6 8 5.6Z"
                      fill="currentColor"
                      opacity="0.6"
                    />
                    <path
                      d="M8 8.8C9 8.8 9.9 9.2 10.5 9.9L11.3 9.1C10.5 8.2 9.3 7.5 8 7.5C6.7 7.5 5.5 8.2 4.7 9.1L5.5 9.9C6.1 9.2 7 8.8 8 8.8Z"
                      fill="currentColor"
                      opacity="0.8"
                    />
                    <circle cx="8" cy="11.2" r="1.2" fill="currentColor" />
                  </svg>
                  <svg width="27" height="13" viewBox="0 0 27 13" fill="none" className="text-black/90">
                    <rect
                      x="0"
                      y="1"
                      width="23"
                      height="11"
                      rx="2.5"
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                      opacity="0.35"
                    />
                    <rect x="24" y="4" width="2" height="5" rx="1" fill="currentColor" opacity="0.35" />
                    <rect x="1.5" y="2.5" width="18" height="8" rx="1.5" fill="currentColor" />
                  </svg>
                </div>
              </div>

              <div className="mx-4 mt-0.5 mb-1">
                <div className="bg-black/[0.06] rounded-full h-[30px] flex items-center justify-center px-3">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="mr-1 shrink-0 opacity-40">
                    <path
                      d="M5 0.5C4.17 0.5 3.5 1.17 3.5 2V3.5H2C1.17 3.5 0.5 4.17 0.5 5V8C0.5 8.83 1.17 9.5 2 9.5H8C8.83 9.5 9.5 8.83 9.5 8V5C9.5 4.17 8.83 3.5 8 3.5H6.5V2C6.5 1.17 5.83 0.5 5 0.5ZM4.5 2C4.5 1.72 4.72 1.5 5 1.5C5.28 1.5 5.5 1.72 5.5 2V3.5H4.5V2Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="text-[13px] text-black/50 truncate">
                    {displayBaseUrl}
                    {url ?? <span className="text-black/30">username</span>}
                  </span>
                </div>
              </div>
            </div>

            <div
              className="absolute left-0 right-0 bottom-0 overflow-hidden"
              style={{ top: STATUS_AND_URL_BAR_HEIGHT }}
            >
              <div className="relative h-full w-full overflow-hidden">{children}</div>
            </div>

            <div className="absolute bottom-2 left-0 right-0 z-[100] flex justify-center pointer-events-none">
              <div className="w-[134px] h-[5px] bg-black/20 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
