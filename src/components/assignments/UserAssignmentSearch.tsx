import { useState } from "react";
import { searchUsers } from "../../api/userService";
import type { User } from "../../api/users";

interface Props {
  token: string;
  onUserSelect: (user: User) => void;
}

export default function UserAssignmentSearch({
  token,
  onUserSelect,
}: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<User[]>([]);

  async function handleSearch(
    value: string
  ) {
    setQuery(value);

    if (value.trim().length < 2) {
      setResults([]);
      return;
    }

    try {
      const users =
        await searchUsers(
          value,
          token
        );

      setResults(users);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) =>
          handleSearch(e.target.value)
        }
        placeholder="Search user..."
        className="w-full border rounded px-3 py-2"
      />

      {results.length > 0 && (
        <div className="absolute z-50 w-full bg-white border rounded shadow mt-1">
          {results.map((user) => (
            <button
              key={user.id}
              type="button"
              onClick={() => {
                onUserSelect(user);
                setResults([]);
                setQuery(
                  `${user.first_name} ${user.last_name}`
                );
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-100"
            >
              {user.first_name}{" "}
              {user.last_name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}