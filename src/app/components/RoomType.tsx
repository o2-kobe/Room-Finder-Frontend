// import { type UseFormRegister } from "react-hook-form";
// import type { ListingFormData } from "../schema/listing.schema";

// interface RoomTypeProps {
//   register: UseFormRegister<ListingFormData>;
//   selected?: string[];
// }

// export default function RoomType({ register, selected = [] }: RoomTypeProps) {
//   const ROOM_OPTIONS = [
//     { label: "Single (1 in a room)", value: "1-in-a-room" },
//     { label: "2 in a room", value: "2-in-a-room" },
//     { label: "3 in a room", value: "3-in-a-room" },
//     { label: "4 in a room", value: "4-in-a-room" },
//     { label: "More than 4 in a room", value: "More-than-4" },
//     { label: "Executive / Self-contained", value: "Exclusive" },
//   ];

//   return (
//     <div className="bg-white rounded-2xl p-6 shadow-sm">
//       <h3 className="text-lg mb-4">Room Types</h3>
//       <p className="text-sm text-muted-foreground mb-4">
//         Add different room types available in your hostel
//       </p>

//       {ROOM_OPTIONS.map((room) => (
//         <div key={room.value} className="my-3 rounded-2xl p-3 shadow-sm">
//           <div className="space-x-2 mt-3">
//             <input
//               type="checkbox"
//               value={room.value}
//               id={room.value}
//               {...register("roomTypes")}
//               defaultChecked={selected.includes(room.value)}
//             />
//             <label htmlFor={room.value}>{room.label}</label>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

import {
  type UseFormRegister,
  type FieldValues,
  type Path,
} from "react-hook-form";

// Since only Hostel form has roomTypes, we can be more specific
// or keep it generic for flexibility. Let's stay Generic for consistency.
interface HasRoomTypes {
  roomTypes: string[];
}

interface RoomTypeProps<T extends FieldValues & HasRoomTypes> {
  register: UseFormRegister<T>;
  selected?: string[];
}

export default function RoomType<T extends FieldValues & HasRoomTypes>({
  register,
  selected = [],
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
    </div>
  );
}
