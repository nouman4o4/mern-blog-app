export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-red-600 rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-600 rounded-full blur-3xl opacity-10"></div>

      <div className="container mx-auto py-16 px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-3 text-black">
              Get In Touch
            </h1>
            <div className="h-1 w-20 bg-red-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-xl mx-auto">
              Have questions or feedback? Drop us a message and we'll
              get back to you as soon as possible.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your name"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your email"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Subject of your message"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Your message"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center">
                Send Message
              </button>
            </form>
          </div>

          {/* Decorative elements */}
          <div className="mt-12 flex items-center justify-center gap-4">
            <div className="h-px bg-gray-200 w-full max-w-xs"></div>
            <div className="text-gray-500 text-sm">OR</div>
            <div className="h-px bg-gray-200 w-full max-w-xs"></div>
          </div>

          {/* Alternative contact method */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Prefer to email us directly?{" "}
              <a
                href="mailto:contact@example.com"
                className="text-red-600 hover:text-red-700 font-medium">
                contact@example.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
