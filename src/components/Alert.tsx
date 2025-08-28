interface AlertProps {
  type: "success" | "error";
  message: string;
}

export default function Alert({ type, message }: AlertProps) {
  const bgColor = type === "success" ? "bg-green-100" : "bg-red-100";
  const textColor = type === "success" ? "text-green-800" : "text-red-800";
  return (
    <div className={`${bgColor} ${textColor} p-3 rounded mb-4`}>
      {message}
    </div>
  );
}
