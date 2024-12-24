import Link from "next/link";

export default function Checkout() {
  return (
    <div className="flex flex-col items-center gap-4 text-wrap">
      Route Not Configured Yet... The Devs May Implement Stripe, PayPal Or
      RazorPay APIs For Payment Gateway...
      <Link href="/" className="btn btn-primary sm:w-[200px]">
        Go Back
      </Link>
    </div>
  );
}
