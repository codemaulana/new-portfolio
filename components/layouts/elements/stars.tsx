interface PropsStars {
  size: String;
  position: any;
  duration: String;
  delay?: String;
}

export default function Stars({ size, position, duration, delay }: PropsStars) {
  const style = {
    width: size,
    height: size,
    ...position,
    animationDuration: duration,
    animationDelay: delay,
  };

  return (
    <div className="absolute top-1/2 left-1/2 animate-orbit" style={style}>
      <div className="absolute bg-neutral-200  top-0 left-0 h-full w-full rounded-full dark:bg-white/50 shadow-sm" />
    </div>
  );
}
