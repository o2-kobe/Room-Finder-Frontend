import {
  type UseFormRegister,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface HasRoomTypes {
  roomTypes: string[];
}

interface RoomTypeProps<T extends FieldValues & HasRoomTypes> {
  register: UseFormRegister<T>;
  selected?: string[];
  error?: string | undefined;
}

export default function RoomType<T extends FieldValues & HasRoomTypes>({
  register,
  selected = [],
  error,
}: RoomTypeProps<T>) {
  const ROOM_OPTIONS = [
    { label: "Single (1 in a room)", value: "1-in-a-room" },
    { label: "2 in a room", value: "2-in-a-room" },
    { label: "3 in a room", value: "3-in-a-room" },
    { label: "4 in a room", value: "4-in-a-room" },
    { label: "More than 4 in a room", value: "More-than-4" },
    { label: "Executive / Self-contained", value: "Exclusive" },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg mb-4">Room Types</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Add different room types available in your hostel
      </p>

      {ROOM_OPTIONS.map((room) => (
        <div key={room.value} className="my-3 rounded-2xl p-3 shadow-sm">
          <div className="space-x-2 mt-3">
            <input
              type="checkbox"
              value={room.value}
              id={room.value}
              {...register("roomTypes" as Path<T>)}
              defaultChecked={selected.includes(room.value)}
            />
            <label htmlFor={room.value}>{room.label}</label>
          </div>
        </div>
      ))}

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
