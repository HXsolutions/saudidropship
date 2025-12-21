
export default function RefundPolicyPage() {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          Refund Policy
        </h1>
        <div className="prose prose-lg text-gray-600 mx-auto">
          <p>
            This is a placeholder for your Refund Policy. You should replace
            this with your own policy regarding returns, refunds, and
            exchanges.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Returns</h2>
          <p>
            Our policy lasts 30 days. If 30 days have gone by since your
            purchase, unfortunately we can’t offer you a refund or exchange.
          </p>
          <p>
            To be eligible for a return, your item must be unused and in the
            same condition that you received it. It must also be in the
            original packaging.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Refunds</h2>
          <p>
            Once your return is received and inspected, we will send you an
            email to notify you that we have received your returned item. We
            will also notify you of the approval or rejection of your refund.
          </p>
          <p>
            If you are approved, then your refund will be processed, and a
            credit will automatically be applied to your credit card or
            original method of payment, within a certain amount of days.
          </p>
          <p className="mt-8 text-sm text-gray-500">
            This document was last updated on {new Date().toLocaleDateString()}.
          </p>
        </div>
      </div>
    </div>
  );
}
