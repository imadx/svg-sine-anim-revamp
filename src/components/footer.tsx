import { FullscreenIcon, GithubIcon } from 'lucide-react';
import { useEffect } from 'react';

export const Footer = () => {
  const handleClickFullscreen = () => {
    const elem = document.documentElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _elem = document.documentElement as any;
    if (_elem.mozRequestFullScreen) {
      _elem.mozRequestFullScreen();
    } else if (_elem.webkitRequestFullscreen) {
      _elem.webkitRequestFullscreen();
    } else if (_elem.msRequestFullscreen) {
      _elem.msRequestFullscreen();
    }
  };

  useEffect(() => {
    //     hide the panel on fullscreen
    const handleFullscreenChange = () => {
      const isFullscreen = document.fullscreenElement !== null;
      const panel = document.getElementById('control-panel');
      if (panel) {
        panel.classList.toggle('hidden', isFullscreen);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="text-sm text-gray-400 w-64 text-left flex flex-col gap-3">
      <p>
        <span className="font-bold">Note:</span> This is a simple example of how
        to use SVG to create a continuous waveform animation.
      </p>
      <p>
        <span
          className="!text-gray-300 hover:!text-white transition-colors duration-200 cursor-pointer flex gap-2"
          onClick={handleClickFullscreen}
        >
          <FullscreenIcon />
          Go Fullscreen
        </span>
      </p>
      <p>
        <a
          href="https://github.com/imadx/svg-sine-anim-revamp"
          target="_blank"
          rel="noopener noreferrer"
          className="!text-gray-300 hover:!text-white transition-colors duration-200 cursor-pointer flex gap-2"
        >
          <GithubIcon />
          Find the code on GitHub
        </a>
      </p>
    </div>
  );
};
