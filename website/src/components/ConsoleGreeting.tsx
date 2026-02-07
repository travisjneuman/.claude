"use client";

import { useEffect } from "react";

export default function ConsoleGreeting() {
  useEffect(() => {
    const art = [
      "",
      "%c  ██╗     ██╗███╗   ██╗    ██████╗██╗      █████╗ ██╗   ██╗██████╗ ███████╗ ██╗",
      "  ██║     ██║████╗  ██║   ██╔════╝██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝██╔╝",
      "  ██║     ██║██╔██╗ ██║   ██║     ██║     ███████║██║   ██║██║  ██║█████╗ ██╔╝ ",
      "  ██║██   ██║██║╚██╗██║   ██║     ██║     ██╔══██║██║   ██║██║  ██║██╔══╝██╔╝  ",
      "  ╚██████╔╝██║ ╚████║██╗██████╗███████╗██║  ██║╚██████╔╝██████╔╝███████╗██╔╝   ",
      "   ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝╚═╝    ",
      "",
    ].join("\n");

    console.log(
      art,
      "color: #39ff14; font-family: monospace; font-size: 12px; line-height: 1.2;",
    );

    console.log(
      "%c  73 Skills  •  36 Agents  •  1,900+ Marketplace Skills  •  70 Repos",
      "color: #a855f7; font-family: monospace; font-size: 11px; font-weight: bold;",
    );

    console.log(
      "%c  https://claude.travisjneuman.com",
      "color: #7aa2f7; font-family: monospace; font-size: 11px;",
    );

    console.log("");
  }, []);

  return null;
}
