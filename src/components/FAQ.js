import { useState } from 'react';

export default function FAQ() {
  // Create an array to hold the open/close state for each FAQ item
  const [open, setOpen] = useState([false, false, false, false, false]);

  // Toggle the state of the FAQ item at the given index
  const toggle = index => {
    setOpen(prev => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <section className="flex my-16 h-screen">
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-xl font-semibold text-gray-800 lg:text-2xl">
          FAQ's
        </h1>
        <hr className="my-6 border-gray-200" />

        <div>
          {/* FAQ item 1 */}
          <div>
            <button
              onClick={() => toggle(0)}
              className="flex items-center focus:outline-none"
            >
              <svg
                className="flex-shrink-0 w-6 h-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {open[0] ? (
                  // Minus icon when open
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 12H4"
                  />
                ) : (
                  // Plus icon when closed
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                )}
              </svg>
              <h1 className="mx-4 text-xl text-gray-700">
                How can I pay for my appointment ?
              </h1>
            </button>

            {open[0] && (
              <div className="flex mt-8 md:mx-10">
                <span className="border border-indigo-600"></span>
                <p className="max-w-3xl px-4 text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Magni, eum quae. Harum officiis reprehenderit ex quia ducimus
                  minima id provident molestias optio nam vel, quidem iure
                  voluptatem, repellat et ipsa.
                </p>
              </div>
            )}
          </div>

          <hr className="my-8 border-gray-200" />

          {/* FAQ item 2 */}
          <div>
            <button
              onClick={() => toggle(1)}
              className="flex items-center focus:outline-none"
            >
              <svg
                className="flex-shrink-0 w-6 h-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {open[1] ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 12H4"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                )}
              </svg>
              <h1 className="mx-4 text-xl text-gray-700">
                What can I expect at my first consultation ?
              </h1>
            </button>

            {open[1] && (
              <div className="flex mt-8 md:mx-10">
                <span className="border border-indigo-600"></span>
                <p className="max-w-3xl px-4 text-gray-500">
                  Your consultation will cover an in-depth discussion of your
                  needs and an overview of our services.
                </p>
              </div>
            )}
          </div>

          <hr className="my-8 border-gray-200" />

          {/* FAQ item 3 */}
          <div>
            <button
              onClick={() => toggle(2)}
              className="flex items-center focus:outline-none"
            >
              <svg
                className="flex-shrink-0 w-6 h-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {open[2] ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 12H4"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                )}
              </svg>
              <h1 className="mx-4 text-xl text-gray-700">
                What are your opening hours ?
              </h1>
            </button>

            {open[2] && (
              <div className="flex mt-8 md:mx-10">
                <span className="border border-indigo-600"></span>
                <p className="max-w-3xl px-4 text-gray-500">
                  We are open Monday through Friday from 9am to 6pm.
                </p>
              </div>
            )}
          </div>

          <hr className="my-8 border-gray-200" />

          {/* FAQ item 4 */}
          <div>
            <button
              onClick={() => toggle(3)}
              className="flex items-center focus:outline-none"
            >
              <svg
                className="flex-shrink-0 w-6 h-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {open[3] ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 12H4"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                )}
              </svg>
              <h1 className="mx-4 text-xl text-gray-700">
                Do I need a referral ?
              </h1>
            </button>

            {open[3] && (
              <div className="flex mt-8 md:mx-10">
                <span className="border border-indigo-600"></span>
                <p className="max-w-3xl px-4 text-gray-500">
                  No referral is required to schedule an appointment.
                </p>
              </div>
            )}
          </div>

          <hr className="my-8 border-gray-200" />

          {/* FAQ item 5 */}
          <div>
            <button
              onClick={() => toggle(4)}
              className="flex items-center focus:outline-none"
            >
              <svg
                className="flex-shrink-0 w-6 h-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {open[4] ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 12H4"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                )}
              </svg>
              <h1 className="mx-4 text-xl text-gray-700">
                Is the cost of the appointment covered by private health
                insurance ?
              </h1>
            </button>

            {open[4] && (
              <div className="flex mt-8 md:mx-10">
                <span className="border border-indigo-600"></span>
                <p className="max-w-3xl px-4 text-gray-500">
                  Yes, many of our services are covered by private health
                  insurance.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
