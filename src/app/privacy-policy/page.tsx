
export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          Privacy Policy
        </h1>
        <div className="prose prose-lg text-gray-600 mx-auto">
          <p>
            This is a placeholder for your Privacy Policy. You should replace
            this with your own policy, detailing how you collect, use, and
            protect your users' data.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
          <p>
            We collect information you provide directly to us. For example, we
            collect information when you create an account, subscribe,
            participate in any interactive features of our services, fill out a
            form, request customer support, or otherwise communicate with us.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve
            our services, such as to process transactions, develop new products
            and services, and personalize the services.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Sharing of Information</h2>
          <p>
            We may share information about you as follows or as otherwise
            described in this Privacy Policy:
          </p>
          <ul>
            <li>
              With vendors, consultants, and other service providers who need
              access to such information to carry out work on our behalf;
            </li>
            <li>
              In response to a request for information if we believe
              disclosure is in accordance with, or required by, any applicable
              law or legal process;
            </li>
          </ul>
          <p className="mt-8 text-sm text-gray-500">
            This document was last updated on {new Date().toLocaleDateString()}.
          </p>
        </div>
      </div>
    </div>
  );
}
