const Container = ({
  children,
  maxWidth = 768,
}: Readonly<{ children: React.ReactNode; maxWidth?: number }>) => {
  return (
    <div className="flex flex-row justify-center">
      <div className="w-full" style={{ maxWidth: `${maxWidth}px` }}>
        {children}
      </div>
    </div>
  );
};

export default Container;
