import { JSX, useEffect, useState } from "react";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Send,
  User,
  MessageSquare,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface SocialLink {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  url: string;
  color: string;
  description: string;
}

export default function Contact(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const env = import.meta.env;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();

    try {
      setIsLoading(true);
      if (
        !formData.name ||
        !formData.email ||
        !formData.subject ||
        !formData.message
      ) {
        toast("Please fill in all the fields", {
          icon: "⚠️",
          style: {
            padding: "5px",
            color: "white",
            background: "red",
          },
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
          },
        });
        return;
      }
      const resultOfSendingEmail = await emailjs.send(
        env.VITE_EMAILJS_SERVICE_ID,
        env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        { publicKey: env.VITE_EMAILJS_PUBLIC_KEY }
      );

      if (resultOfSendingEmail.text !== "OK") {
        toast.error("Error sending email, try again!");
        setIsLoading(false);
        return;
      }
      toast.success("Email sent successfully!");
      setFormData({ name: "", subject: "", email: "", message: "" });
    } catch (error) {
      toast.error("Error sending email, try again!");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const socialLinks: SocialLink[] = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/nouman4o4",
      color: "hover:bg-gray-900",
      description: "View my code",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/yourusernamenouman-khan-68372228b/",
      color: "hover:bg-blue-600",
      description: "Professional network",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com",
      color: "hover:bg-blue-500",
      description: "Follow updates",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:contact@example.com",
      color: "hover:bg-red-600",
      description: "Send direct email",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Enhanced decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-red-600/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gray-900/5 rounded-full blur-3xl"></div>

      {/* Geometric patterns */}
      <div className="absolute top-40 right-10 w-4 h-4 bg-red-600 rotate-45 opacity-20"></div>
      <div className="absolute bottom-40 left-10 w-6 h-6 bg-gray-900 rotate-45 opacity-10"></div>

      <div className="container mx-auto py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-2xl mb-6 shadow-lg">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight mb-4 text-gray-900">
              Let's <span className="text-red-600">Connect</span>
            </h1>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-red-600 to-transparent w-20"></div>
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              <div className="h-px bg-gradient-to-r from-transparent via-red-600 to-transparent w-20"></div>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Have an exciting project in mind? I'd love to hear about
              it. Let's collaborate and bring your ideas to life.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-2xl shadow-gray-900/5 backdrop-blur-sm">
                <div className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="group">
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-red-600 transition-colors">
                        <User className="inline w-4 h-4 mr-2" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full px-5 py-4 border border-gray-200 rounded-xl bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent focus:bg-white transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="group">
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-red-600 transition-colors">
                        <Mail className="inline w-4 h-4 mr-2" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full px-5 py-4 border border-gray-200 rounded-xl bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent focus:bg-white transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-red-600 transition-colors">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      className="w-full px-5 py-4 border border-gray-200 rounded-xl bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent focus:bg-white transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="group">
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-red-600 transition-colors">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project, ideas, or just say hello..."
                      className="w-full px-5 py-4 border border-gray-200 rounded-xl bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent focus:bg-white resize-none transition-all duration-300"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-red-400 disabled:to-red-500 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/40 hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:hover:shadow-lg group">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Social Links Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-2xl shadow-gray-900/5 backdrop-blur-sm h-fit">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Connect With Me
                </h3>
                <div className="space-y-4">
                  {socialLinks.map((social: SocialLink) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-transparent transition-all duration-300 ${social.color} hover:text-white hover:shadow-lg hover:-translate-y-1`}>
                        <div className="flex-shrink-0">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-grow">
                          <div className="font-semibold text-gray-900 group-hover:text-white transition-colors">
                            {social.name}
                          </div>
                          <div className="text-sm text-gray-500 group-hover:text-white/80 transition-colors">
                            {social.description}
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>

                {/* Additional Info */}
                <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Quick Response
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      I typically respond within 24 hours
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-green-600 font-medium">
                        Available
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom decorative section */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-white rounded-full border border-gray-200 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <span className="text-gray-700 font-medium">
                  Let's build something amazing together
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
