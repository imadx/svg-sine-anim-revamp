import { GithubIcon } from 'lucide-react';

export const Footer = () => {
  return (
    <div className="text-sm text-gray-400 w-64 text-left flex flex-col gap-3">
      <p>
        <span className="font-bold">Note:</span> This is a simple example of how
        to use SVG to create a continuous waveform animation.
      </p>
      <p>
        <a
          href="https://github.com/imadx/svg-sine-anim-revamp"
          className="!text-gray-100 hover:!text-gray-200 transition-colors duration-200"
        >
          Find the code on{' '}
          <GithubIcon
            style={{
              display: 'inline-block',
            }}
          />
        </a>
      </p>
    </div>
  );
};
