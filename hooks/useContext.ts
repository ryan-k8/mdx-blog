import { useContext } from "react";
import type { Context } from "react";

/**
generic useContex hook that throws error if not defined
*/
export const useCtx = <T>(ctx: Context<T | null>, name?: string): T => {
  const _ctx = useContext(ctx);

  if (!_ctx) throw new Error(`${name ?? ""} context is not defined! `);
  return _ctx;
};
