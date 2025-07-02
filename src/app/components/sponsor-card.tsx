type SponsorCardProps = {
  tier: string;
  logo: string;
};

export default function SponsorCard({ tier, logo }: SponsorCardProps) {
  let color = "";

  // Determine card color
  if (tier === "Platinum") {
    color = "#B7BFCC";
  } else if (tier === "Gold") {
    color = "#C09E5E";
  } else if (tier === "Silver") {
    color = "#81848B";
  } else {
    color = "#A6714F";
  }

  return (
    <div
      className="flex flex-col items-center justify-center rounded-lg shadow-md w-[250px] h-[250px]"
      style={{ backgroundColor: color }}
    >

      <img src={logo} alt={`${tier} sponsor`} className="w-[120px] h-auto" />
      <p className="text-[#001F5B] font-bold text-lg mt-4">{tier}</p>
    
    </div>
  );
}
