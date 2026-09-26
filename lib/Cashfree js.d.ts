// lib/cashfree-js.d.ts
//
// @cashfreepayments/cashfree-js ships as a plain .js file with no bundled
// TypeScript declarations, and there's no separate @types/ package for it
// either — hence the TS7016 error. This file supplies just enough typing
// for what lib/cashfree.ts actually uses (`load` and the checkout result
// shape), rather than falling back to `any` everywhere.

declare module '@cashfreepayments/cashfree-js' {
  export interface CashfreeCheckoutOptions {
    paymentSessionId: string
    redirectTarget?: '_self' | '_blank' | '_modal' | (string & {})
  }

  export interface CashfreeCheckoutResult {
    error?: { message?: string; [key: string]: unknown }
    redirect?: boolean
    paymentDetails?: { paymentMessage?: string; [key: string]: unknown }
  }

  export interface Cashfree {
    checkout(options: CashfreeCheckoutOptions): Promise<CashfreeCheckoutResult>
  }

  export function load(options: { mode: 'sandbox' | 'production' }): Promise<Cashfree>
}