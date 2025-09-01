type Props = {
  className: string;
  message: string;
};

function ErrorMessage({ className, message }: Props) {
  return <div className={`text-[#FF0000] ${className}`}>{message}</div>;
}

export default ErrorMessage;
