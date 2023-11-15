const Layouts = () => {
  return (
    <>
      <div className="bg-gradient-to-br from-gray-900 to-white">
        <div className="text-gray-300 container mx-auto p-8 overflow-hidden md:rounded-lg md:p-10 lg:p-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col justify-center md:col-span-2">
              <p className="self-start inline font-sans text-xl font-medium text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-600">
                Business Benchmarking Machine
              </p>
              <h2 className="text-4xl font-bold">
                Unlock the Power of Financial Data
              </h2>
              <div className="h-6"></div>
              <p className="font-serif text-xl text-gray-300 md:pr-10">
                Experience the best aggregation of publicly available financial
                data, meticulously structured in a business-ready report to
                empower your strategic decision-making.
              </p>
              <div className="h-8"></div>
              <div className="grid gap-6 pt-8 border-t border-gray-800 lg:grid-cols-3">
                <div>
                  <p className="font-semibold text-black">Made with love</p>
                  <div className="h-4"></div>
                  <p className="font-serif text-gray-700">
                    Our platform is crafted with utmost care and dedication,
                    ensuring a seamless experience for our users.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-black">It's easy to build</p>
                  <div className="h-4"></div>
                  <p className="font-serif text-gray-700">
                    We have designed our solution to be user-friendly and
                    straightforward, enabling you to leverage the power of
                    financial data effortlessly.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-black">
                    Unlock the potential
                  </p>
                  <div className="h-4"></div>
                  <p className="font-serif text-gray-700">
                    Gain valuable insights and unlock the potential of your
                    business with our comprehensive financial data, tailored to
                    your specific needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layouts;
