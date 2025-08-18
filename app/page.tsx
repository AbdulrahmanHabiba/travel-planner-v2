import React from "react";
import { Github, Map as MapIcon } from "lucide-react";
import { auth } from "@/auth";
import AuthButton from "@/components/auth-button";
export default async function LandingPage() {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-surface py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-main">
                Plan your perfect trip, every time
              </h1>
              <p className="mb-8 text-main">
                Create itineraries, organize destinations, and share your travel
                plans all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AuthButton
                  isLoggedIn={isLoggedIn}
                  className="w-full  sm:w-auto bg-blue-600 text-white hover:bg-blue-700 button "
                >
                  {isLoggedIn ? (
                    "Check it Out"
                  ) : (
                    <div className="flex justify-center items-center ">
                      <svg
                      className=" text-white!"
                      
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#fff fff"
                          d="M22.132 10.033a.5.5 0 0 0-.492-.41h-9.418a.5.5 0 0 0-.5.498v3.869a.5.5 0 0 0 .5.5h4.735a4.136 4.136 0 0 1-1.627 2.103a5.55 5.55 0 0 1-3.108.87A5.434 5.434 0 0 1 7.1 13.682v-.002a5.416 5.416 0 0 1 0-3.48v-.002a5.434 5.434 0 0 1 5.12-3.781a4.93 4.93 0 0 1 3.48 1.357a.5.5 0 0 0 .7-.007l2.868-2.869a.5.5 0 0 0-.013-.72a10.135 10.135 0 0 0-7.032-2.738A10.451 10.451 0 0 0 2.84 7.225a10.51 10.51 0 0 0 0 9.43a10.453 10.453 0 0 0 9.383 5.785a10.034 10.034 0 0 0 6.952-2.552l.005-.002a10.296 10.296 0 0 0 3.143-7.719c0-.716-.064-1.43-.19-2.134z"
                        />
                      </svg>

                      <span className="ml-2">Log in</span>
                    </div>
                  )}
                </AuthButton>
              </div>
            </div>
          </div>
          {/* Decorative Clipped Background at the Bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-24 bg-surface"
            style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)" }}
          />
        </section>
        {/* Features Section */}
        <section className="py-16 md:py-24 bg-surface text-main">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-main">
              Plan with confidence
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg border shadow-sm bg-card-surface text-card-main">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "var(--accent)" }}
                >
                  <MapIcon
                    className="h-6 w-6"
                    style={{ color: "var(--primary)" }}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-card-main">
                  Interactive Maps
                </h3>
                <p className="text-card-main">
                  Visualize your trip with interactive maps. See your entire
                  itinerary at a glance.
                </p>
              </div>
              <div className="p-6 rounded-lg border shadow-sm bg-card-surface text-card-main">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "var(--accent)" }}
                >
                  <svg
                    className="h-6 w-6"
                    style={{ color: "var(--primary)" }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-card-main">
                  Day-by-Day Itineraries
                </h3>
                <p className="text-card-main">
                  Organize your trip day by day. Never miss a beat with
                  structured planning.
                </p>
              </div>
              <div className="p-6 rounded-lg border shadow-sm bg-card-surface text-card-main">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "var(--accent)" }}
                >
                  <svg
                    className="h-6 w-6"
                    style={{ color: "var(--primary)" }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 15a4 4 0 004 4h9a5 5 0 10-4.5-6.5L12 7" />
                    <path d="M15 5v4h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-card-main">
                  Drag & Drop Planning
                </h3>
                <p className="text-card-main">
                  Easily rearrange your itinerary with simple drag and drop
                  functionality.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Call to Action Section */}
        <section className="py-16 md:py-24 bg-surface text-main">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold  mb-6 text-main">
              Ready to plan your next adventure?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-main">
              Join thousands of travelers who plan better trips with
              TripPlanner.
            </p>
            <AuthButton
              isLoggedIn={isLoggedIn}
              className="sm:w-auto bg-red-600 text-white hover:bg-red-700 button"
            >
              {isLoggedIn ? "Check it out" : "Sign Up Now"}
            </AuthButton>
          </div>
        </section>
      </main>

      {/* Footer */}
    </div>
  );
}
