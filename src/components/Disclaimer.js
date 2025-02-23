export default function Disclaimer() {
  return (
    <div>
      <section className="flex items-start my-24 justify-center min-h-screen px-4">
        <div className="container mx-auto">
          <div className="rounded-lg text-justify">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">
              Disclaimer
            </h1>
            <p className="text-gray-700 mb-4">
              Welcome to <strong>searchmyclub</strong>'s Disclaimer page. Please
              read the following terms carefully before using our platform. Our
              application is designed to facilitate the creation and management
              of college clubs and events, offering a space where users can
              connect, share information, and organize activities.
            </p>
            <p className="text-gray-700 mb-4">
              All information provided on <strong>searchmyclub</strong> is
              intended for general informational purposes only and is provided
              on an "as is" basis. While we strive to keep the content accurate
              and up-to-date, we make no guarantees regarding the completeness,
              accuracy, reliability, or suitability of any information available
              on our site. Your reliance on any information from this site is
              strictly at your own risk.
            </p>
            <p className="text-gray-700 mb-4">
              The clubs, events, and other user-generated content featured on{' '}
              <strong>searchmyclub</strong> are submitted by individual users
              and are not independently verified by us. As a result, we do not
              warrant the accuracy or authenticity of any details, including
              event schedules, locations, or descriptions. It is your
              responsibility to verify any information before participating in
              an event or relying on club details.
            </p>
            <p className="text-gray-700 mb-4">
              Under no circumstances will <strong>searchmyclub</strong> be held
              liable for any direct, indirect, incidental, consequential, or
              punitive damages arising out of your access to, or use of, our
              platform. This includes any loss of data, revenue, or profits
              resulting from the reliance on or use of information provided.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>searchmyclub</strong> reserves the right to modify,
              update, or remove any content on our platform at any time without
              prior notice. Changes to this disclaimer may be made at our sole
              discretion, and it is your responsibility to review the disclaimer
              periodically for any updates. Continued use of our site after such
              modifications signifies your acceptance of the updated terms.
            </p>
            <p className="text-gray-700 mb-4">
              All trademarks, logos, and brand names displayed on{' '}
              <strong>searchmyclub</strong> are the property of their respective
              owners. Nothing in this disclaimer shall be construed as granting
              any license or right to use any trademark or logo without the
              express written permission of the respective owner.
            </p>
            <p className="text-gray-700">
              If you have any questions, concerns, or require further
              clarification regarding this disclaimer, please contact our
              support team at{' '}
              <a
                href="mailto:support@searchmyclub.com"
                className="text-blue-500 underline"
              >
                support@searchmyclub.com
              </a>
              .
            </p>
            <div className="mt-8 text-right">
              <span className="text-sm text-gray-500">
                © {new Date().getFullYear()} searchmyclub. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
