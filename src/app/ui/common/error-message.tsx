type Props = {
  children: string;
};

function ErrorMessage({ children }: Props) {
  return <div className="text-[#FF0000]">{children}</div>;
}

export default ErrorMessage;
