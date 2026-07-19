interface SummaryCardProps {
  label: string;
  value: number;
  accent: "blue" | "green" | "red";
}

const accentStyles = {
  blue: "bg-blue-50 text-blue-700",
  green: "bg-green-50 text-green-700",
  red: "bg-red-50 text-red-700",
};

export default function SummaryCard({ label, value, accent }: SummaryCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <p className="text-sm text-gray-500 mb-2">{label}</p>
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg font-semibold text-xl ${accentStyles[accent]}`}>
        {value}
      </div>
    </div>
  );
}