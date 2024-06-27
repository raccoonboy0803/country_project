interface CountryCardProps {
  flag: string;
  countryName: string;
  capital: string[];
  isSelected: boolean;
  onClick: () => void;
}

function CountryCard({
  onClick,
  flag,
  countryName,
  capital,
  isSelected,
}: CountryCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white flex flex-col gap-2 p-4 rounded-lg cursor-pointer ${
        isSelected ? 'border border-green-500' : 'border-none'
      }`}
    >
      <img src={flag} alt="flag image" className="w-16 h-12 mx-auto mb-4" />
      <h2 className="font-bold">{countryName}</h2>
      <p>{capital}</p>
    </div>
  );
}

export default CountryCard;
