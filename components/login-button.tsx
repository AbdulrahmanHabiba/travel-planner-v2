import { loginWithGithub , loginWithGoogle} from '@/lib/auth-actions';

import React from 'react'

export function LoginButton({className} : {className? :string}) {

  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className || ""} `}>
      <button
        onClick={() => loginWithGoogle()}
        className="flex items-center justify-center gap-2 px-4 py-2 rounded bg-white text-gray-700 border hover:bg-gray-100 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="#4285F4"
            d="M22.132 10.033a.5.5 0 0 0-.492-.41h-9.418a.5.5 0 0 0-.5.498v3.869a.5.5 0 0 0 .5.5h4.735a4.136 4.136 0 0 1-1.627 2.103a5.55 5.55 0 0 1-3.108.87A5.434 5.434 0 0 1 7.1 13.682v-.002a5.416 5.416 0 0 1 0-3.48v-.002a5.434 5.434 0 0 1 5.12-3.781a4.93 4.93 0 0 1 3.48 1.357a.5.5 0 0 0 .7-.007l2.868-2.869a.5.5 0 0 0-.013-.72a10.135 10.135 0 0 0-7.032-2.738A10.451 10.451 0 0 0 2.84 7.225a10.51 10.51 0 0 0 0 9.43a10.453 10.453 0 0 0 9.383 5.785a10.034 10.034 0 0 0 6.952-2.552l.005-.002a10.296 10.296 0 0 0 3.143-7.719c0-.716-.064-1.43-.19-2.134z"
          />
        </svg>
        <span>Continue with Google</span>
      </button>

      <button
        onClick={() => loginWithGithub()}
        className="flex items-center justify-center gap-2 px-4 py-2 rounded bg-black text-white hover:bg-gray-800 transition"
      >
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.24 1.83 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.05.14 3.01.41 2.29-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.93.43.37.81 1.1.81 2.23 0 1.61-.02 2.91-.02 3.31 0 .32.22.69.83.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
        <span>Continue with GitHub</span>
      </button>
    </div>
  );
}