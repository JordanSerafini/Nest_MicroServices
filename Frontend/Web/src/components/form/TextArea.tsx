
interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ label, value, onChange }) => {
  return (
    <div className="w-full flex flex-col lg:items-center ">
      <label className="block text-sm lg:text-base text-center font-medium text-gray-700">{label}</label>
      <textarea
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:border-blue-300 h-20 lg:h-32 lg:w-9/10 lg:justify-center sm:text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default TextArea;
