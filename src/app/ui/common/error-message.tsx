type Props = {
  message: string;
};

function ErrorMessage({ message }: Props) {
  return <div className="text-[#FF0000]">{message}</div>;
}

export default ErrorMessage;
