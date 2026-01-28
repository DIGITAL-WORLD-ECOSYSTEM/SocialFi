'use client';

import { useMemo, useCallback } from 'react';
import { isEqualPath } from 'minimal-shared/utils';
import { useRouter as useNextRouter } from 'next/navigation';

// ----------------------------------------------------------------------

export function useRouter() {
  const nextRouter = useNextRouter();

  const router = useMemo(
    () => ({
      back: nextRouter.back,
      forward: nextRouter.forward,
      push: nextRouter.push,
      replace: nextRouter.replace,
      prefetch: nextRouter.prefetch,
    }),
    [nextRouter]
  );

  return router;
}
