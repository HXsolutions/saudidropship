
export default function TermsOfServicePage() {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          Terms of Service
        </h1>
        <div className="prose prose-lg text-gray-600 mx-auto">
          <p>
            This is a placeholder for your Terms of Service. You should
            replace this with your own terms, outlining the rules and
            regulations for the use of your website.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
          <p>
            These Website Standard Terms and Conditions written on this webpage
            shall manage your use of our website, SaudiDropship accessible at
            [Your Website URL].
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">2. Intellectual Property Rights</h2>
          <p>
            Other than the content you own, under these Terms, SaudiDropship
            and/or its licensors own all the intellectual property rights and
            materials contained in this Website.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">3. Restrictions</h2>
          <p>You are specifically restricted from all of the following:</p>
          <ul>
            <li>Publishing any Website material in any other media;</li>
            <li>
              Selling, sublicensing and/or otherwise commercializing any
              Website material;
            </li>
            <li>Publicly performing and/or showing any Website material;</li>
            <li>
              Using this Website in any way that is or may be damaging to this
              Website;
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
