import { defineConfig } from "nitro/config";

export default defineConfig({
  vercel: {
    functions: {
      runtime: "nodejs22.x",
    },
  },
});
