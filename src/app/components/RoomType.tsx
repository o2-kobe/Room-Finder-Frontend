export default function RoomType() {
  const ROOM_OPTIONS = [
    { label: "Single (1 in a room)", value: "single" },
    { label: "2 in a room", value: "two_in_room" },
    { label: "3 in a room", value: "three_in_room" },
    { label: "4 in a room", value: "four_in_room" },
    { label: "Executive / Self-contained", value: "executive" },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg mb-4">Room Types</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Add different room types available in your hostel
      </p>

      {ROOM_OPTIONS.map((room) => (
        <div className="my-3 rounded-2xl p-3 shadow-sm">
          <div className="space-x-1 mt-3">
            <input type="checkbox" name={room.label} id={room.value} />
            <label htmlFor={room.value}>{room.label}</label>
          </div>
        </div>
      ))}
    </div>
  );
}
