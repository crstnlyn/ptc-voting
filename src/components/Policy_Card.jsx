import React from "react";

const Policy_Card = () => {
  return (
    <div className="w-auto lg:h-140 h-120 flex lg:items-center justify-center ">
      <div
        id="card"
        className="w-[90%] lg:h-[80%] h-[95%] bg-amber-50 rounded-lg  flex flex-col items-center"
      >
        <div
          id="inside"
          className="w-[100 %] h-[100%] flex flex-col border-1 overflow-auto rounded-md"
        >
          <div id="privacy" className="flex flex-col space-y-2 ">
            <h1 className="text-xl font-bold text-center text-white bg-gray-600">
              Privacy Policy
            </h1>
            <div className="mx-4">
              <p>
                Effective Date: [Insert Date] Last Updated: [Insert Date] This
                Privacy Policy explains how [Your Platform Name] (“we,” “our,”
                or “us”) collects, uses, stores, and protects your personal
                information when you use our voting platform. By using our
                services, you agree to the terms outlined in this policy.
              </p>
              <section>
                <h3 className="text-lg font-bold">1. Information We Collect</h3>
                <article className="px-10">
                  We may collect the following types of data:
                  <p className="font-bold">a. Account Information</p>
                  <ul className="list-disc list-inside px-5">
                    <li>Name</li>
                    <li>
                      Email address or student ID (depending on your
                      institution)
                    </li>
                    <li>Password (encrypted)</li>
                  </ul>
                  <p className="font-bold">b. Election Participation</p>
                  <ul className="list-disc list-inside px-5">
                    <li>Name</li>
                    <li>Election entries and results</li>
                    <li>
                      Vote activity (anonymous — your specific vote is never
                      linked to your identity)
                    </li>
                  </ul>
                  <p className="font-bold">c. Technical Data</p>
                  <ul className="list-disc list-inside px-5">
                    <li>IP address</li>
                    <li>Device type and browser</li>
                    <li>Login timestamps</li>
                  </ul>
                </article>
              </section>
              <section>
                <h3 className="text-lg font-bold">
                  2. How We Use Your Information
                </h3>
                <article className="px-10">
                  We use the information we collect to:
                  <ul className="list-disc list-inside px-5">
                    <li>IP Authenticate users and manage accounts</li>
                    <li>
                      Enable voting functionality and enforce election integrity
                    </li>
                    <li>Display candidates and election results</li>
                    <li>Improve system performance and prevent abuse</li>
                    <li>Respond to user inquiries and support requests</li>
                  </ul>
                </article>
              </section>
              <section>
                <h3 className="text-lg font-bold">
                  3. How We Protect Your Data
                </h3>
                <article className="px-10">
                  We implement industry-standard measures to protect your data,
                  including:
                  <ul className="list-disc list-inside px-5">
                    <li>Encrypted passwords and secure database access</li>
                    <li>Role-based access control</li>
                    <li>Routine backups and data monitoring</li>
                  </ul>
                  Your vote is stored anonymously — no one can trace your
                  individual vote back to you.
                </article>
              </section>
              <section>
                <h3 className="text-lg font-bold">4. Data Sharing</h3>
                <article className="px-10">
                  We do not sell or share your personal information with third
                  parties. We may share limited data with your institution’s
                  administrators if required for managing elections or resolving
                  disputes.
                </article>
              </section>
              <section>
                <h3 className="text-lg font-bold">5. Cookies and Analytics</h3>
                <article className="px-10">
                  Our system may use cookies to keep you logged in or enhance
                  user experience. We do not use third-party advertising or
                  tracking tools.
                </article>
              </section>
              <section>
                <h3 className="text-lg font-bold">6. Your Rights</h3>
                <article className="px-10">
                  You have the right to:
                  <ul className="list-disc list-inside px-5">
                    <li>View or update your account details</li>
                    <li>
                      Request deletion of your account (subject to admin
                      policies)
                    </li>
                    <li>Contact us for any privacy-related concerns</li>
                  </ul>
                </article>
              </section>
              <section>
                <h3 className="text-lg font-bold">7. Data Retention</h3>
                <article className="px-10">
                  We retain your data only as long as necessary to fulfill the
                  purposes above, or as required by your institution's policies.
                </article>
              </section>
              <section>
                <h3 className="text-lg font-bold">8. Policy Updates</h3>
                <article className="px-10">
                  We may update this policy as our platform evolves. Changes
                  will be posted here with the updated date. Continued use means
                  you accept the new policy.
                </article>
              </section>
              <section>
                <h3 className="text-lg font-bold">9. Contact Us</h3>
                <article className="px-10">
                  If you have questions or concerns about this policy, reach us
                  at: 📧 [Insert contact email]
                </article>
              </section>
            </div>
          </div>
          <div id="terms" className="flex flex-col space-y-2">
            <h1>Terms of Service</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy_Card;
