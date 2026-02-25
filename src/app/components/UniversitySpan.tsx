const UniversitySpan = ({ name }: { name: string | undefined }) => {
  return (
    <div className="text-balance">
      <span className="hidden md:inline-block">
        {name && name?.length > 31 ? `${name?.slice(0, 39)}..` : name}
      </span>

      <span className="md:hidden">
        {name && name?.length > 31 ? `${name?.slice(0, 31)}..` : name}..
      </span>
    </div>
  );
};
export default UniversitySpan;
