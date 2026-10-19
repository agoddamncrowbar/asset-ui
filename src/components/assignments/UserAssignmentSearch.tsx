import { useState } from "react";
import { searchUsers } from "../../api/userService";
import type { User } from "../../api/types/users";

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
        placeholder="Search user ... "
        className="
          w-full border border-slate-200 px-3 py-2
          text-sm text-slate-900 placeholder:text-slate-400
          transition-colors
          focus:outline-none focus:border-blue-400
        "
      />

      {results.length > 0 && (
        <div className="absolute z-50 w-full border border-slate-200 bg-white mt-1 overflow-hidden">
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
              className="
                w-full text-left px-3 py-2
                text-sm font-medium text-slate-900
                border-t border-slate-100 first:border-t-0
                transition-colors
                hover:bg-blue-50
              "
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