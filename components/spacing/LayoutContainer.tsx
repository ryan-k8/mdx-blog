type ContainerProps = {
  children: Readonly<React.ReactNode>;
};

export default function LayoutContainer({ children }: ContainerProps) {
  return <div className="px-5 py-1 h-full w-full">{children}</div>;
}
