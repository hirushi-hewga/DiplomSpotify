const GenreWaveBackground: React.FC<{ color: string; className?: string }> = ({ color, className }) => {
  const svg = `
    <svg width="173" height="183" viewBox="0 0 173 183" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M152.749 183V182.23C152.749 173.49 154.979 165.58 158.509 157.58C171.189 128.81 171.329 104.4 161.229 77.57C138.009 19.69 169.449 0.510015 172.769 0.390015H15.9893C7.40926 0.390015 0.449219 7.34999 0.449219 15.93V167.46C0.449219 176.04 7.40926 183 15.9893 183H152.749Z"
      fill="${color}"
      />
    </svg>
  `;

  const backgroundImage = `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;

  return (
    <div
      className={className}
      style={{
        width: '176px',
        height: '182px',
        backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
    </div>
  );
};

export default GenreWaveBackground;