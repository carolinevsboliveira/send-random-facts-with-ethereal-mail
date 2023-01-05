import { useState } from "react";

const HomepageLayout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { elements } = e.currentTarget;

    const name = (elements.namedItem("name") as HTMLInputElement).value;
    const lastName = (elements.namedItem("last-name") as HTMLInputElement)
      .value;
    const randomEmail = (elements.namedItem("email") as HTMLInputElement).value;
    try {
      setIsLoading(true);
      const response = await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify({
          name: name ? name : "nameless",
          lastName: lastName ? lastName : "L.",
          randomEmail: randomEmail ? randomEmail : "random@aleatorymail.com",
        }),
      });

      const finalUrl = await response.json();

      window.open(finalUrl, "_blank");
    } catch (_) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 py-6 min-[320px]:px-2 sm:py-12">
        <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 min-[320px]:rounded-lg sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
          <div className="mx-auto max-w-md">
            <div className="divide-y divide-gray-300/50">
              <div className="flex flex-col justify-center py-8">
                <div>
                  <img
                    src="https://media3.giphy.com/media/QvvVoRQfpK8V13kZVf/giphy.gif?cid=ecf05e47tuf5y0babdbrepg4vrbsncz3piydpdntr7p4sh6p&rid=giphy.gif&ct=s"
                    width="50%"
                    className="mx-auto"
                  />
                </div>
                <p className="text-center text-lg font-bold uppercase tracking-wide text-pink-600">
                  Give me your data and receive (or no) a random fact
                </p>
              </div>
              <div className="-mx-3 mb-6 flex flex-wrap py-8">
                <div className="mb-2 w-full px-3 md:w-1/2">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-pink-600">
                    Cute name
                  </label>
                  <input
                    className="mb-3 block w-full appearance-none rounded border bg-pink-200 py-3 px-4 leading-tight text-pink-600 focus:bg-white focus:outline-none"
                    type="text"
                    placeholder="Alicia"
                    id="name"
                  />
                </div>
                <div className="w-full px-3 md:w-1/2">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-pink-600">
                    Last Name
                  </label>
                  <input
                    className="mb-5 appearance-none block w-full bg-pink-200 text-pink-600 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    placeholder="Martines"
                    id="last-name"
                  />
                </div>

                <div className="w-full px-3">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-pink-600">
                    Random Email
                  </label>
                  <input
                    className="appearance-none block w-full bg-pink-200 text-pink-600 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                    type="email"
                    placeholder="alicia@martines.com"
                    id="email"
                  />
                </div>
              </div>

              <div className="pt-8 text-base font-semibold leading-7 flex justify-center">
                {isLoading ? (
                  <button className="text-white bg-gradient-to-r from-gray-500 to-gray-200 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    Waiting a new tab...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Receive a amazing fact
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default HomepageLayout;
