type ButtonProps = {
  title: string | JSX.Element;
  onClick: () => void;
};

export default function Button({ title, onClick }: ButtonProps) {
  return (
    <button
      className="ml-3 btn btn-primary text-white bg-washed-teal-alt dark:bg-washed-teal dark:text-gray-700 border-none hover:bg-teal-700
                          dark:hover:bg-teal-300"
      onClick={onClick}
    >
      {title}
    </button>
  );
}
