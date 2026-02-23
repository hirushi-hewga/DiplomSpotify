import { useEffect, useState } from "react";
import { apiFetch } from "../../../api/apiClient.ts";

type Mode = "list" | "search" | "create" | "edit";

type ServiceResponse<T = any> = {
  isSuccess: boolean;
  message: string;
  payload: T | null;
};

function useDebounce<T>(value: T, ms = 400) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return v;
}

async function unwrapServiceResponse<T>(res: Response): Promise<T> {
  const json = (await res.json().catch(() => null)) as ServiceResponse<T> | null;

  if (!json) throw new Error("Empty response from server");

  if (!res.ok) throw new Error(json.message || "Request failed");
  if (!json.isSuccess) throw new Error(json.message || "Operation failed");

  return json.payload as T;
}

export function UsersBody({
                            mode,
                            setMode,
                            query,
                          }: {
  mode: Mode;
  setMode: (m: Mode) => void;
  query: string;
}) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selected, setSelected] = useState<any | null>(null);

  // форма
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [role, setRole] = useState("");

  const debouncedQuery = useDebounce(query, 400);

  async function loadAll() {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch("/api/user", { method: "GET" });
      const payload = await unwrapServiceResponse<any[] | any>(res);

      setItems(Array.isArray(payload) ? payload : payload ? [payload] : []);
    } catch (e: any) {
      setError(e.message || "Unknown error");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  async function search(q: string) {
    setLoading(true);
    setError(null);

    try {
      const url = `/api/user?userName=${encodeURIComponent(q)}`;

      const res = await apiFetch(url, { method: "GET" });
      const payload = await unwrapServiceResponse<any[] | any>(res);

      setItems(Array.isArray(payload) ? payload : payload ? [payload] : []);
    } catch (e: any) {
      setError(e.message || "Unknown error");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  async function submitCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const body = { userName, email, password, birthDate, role };

      const res = await apiFetch("/api/user", {
        method: "POST",
        body: JSON.stringify(body),
      });

      await unwrapServiceResponse(res);

      setUserName("");
      setEmail("");
      setMode("list");
      await loadAll();
    } catch (e: any) {
      setError(e.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  function openEdit(u: any) {
    setSelected(u);
    setUserName(u.userName ?? "");
    setEmail(u.email ?? "");
    setMode("edit");
  }

  async function submitEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected?.id) return;

    setLoading(true);
    setError(null);

    try {
      const body = { id: selected.id, userName, email };

      const res = await apiFetch("/api/user", {
        method: "PUT",
        body: JSON.stringify(body),
      });

      await unwrapServiceResponse(res);

      setSelected(null);
      setMode("list");
      await loadAll();
    } catch (e: any) {
      setError(e.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  async function onDelete(id: string) {
    setLoading(true);
    setError(null);

    try {
      const res = await apiFetch(`/api/user?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });

      await unwrapServiceResponse(res);

      if (mode === "search") {
        const q = debouncedQuery.trim();
        if (q) await search(q);
        else {
          setMode("list");
          await loadAll();
        }
      } else {
        await loadAll();
      }
    } catch (e: any) {
      setError(e.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (mode === "list") loadAll();
  }, [mode]);

  useEffect(() => {
    if (mode !== "search") return;

    const q = debouncedQuery.trim();
    if (!q) {
      setItems([]);
      return;
    }

    search(q);
  }, [mode, debouncedQuery]);

  if (mode === "create") {
    return (
      <div className="flex flex-col gap-3">
        {error && <div className="text-red-300">{error}</div>}

        <form onSubmit={submitCreate} className="flex flex-col gap-3">
          <input className="rounded px-3 py-2 text-black" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input className="rounded px-3 py-2 text-black" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <input className="rounded px-3 py-2 text-black" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="UserName" />
          <input className="rounded px-3 py-2 text-black" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} placeholder="Birthdate" />
          <input className="rounded px-3 py-2 text-black" value={role} onChange={(e) => setRole(e.target.value)} placeholder="UserName" />
          <button disabled={loading} className="underline self-start">
            {loading ? "Creating..." : "Create"}
          </button>
        </form>

        <button className="underline opacity-70 self-start" onClick={() => setMode("list")}>
          Back
        </button>
      </div>
    );
  }

  if (mode === "edit") {
    return (
      <div className="flex flex-col gap-3">
        {error && <div className="text-red-300">{error}</div>}
        <div className="text-sm opacity-80">Editing: {selected?.id}</div>

        <form onSubmit={submitEdit} className="flex flex-col gap-3">
          <input className="rounded px-3 py-2 text-black" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="UserName" />
          <input className="rounded px-3 py-2 text-black" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <button disabled={loading} className="underline self-start">
            {loading ? "Saving..." : "Save"}
          </button>
        </form>

        <button
          className="underline opacity-70 self-start"
          onClick={() => {
            setSelected(null);
            setMode("list");
          }}
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {error && <div className="text-red-300">{error}</div>}
      {loading && <div className="opacity-70">Loading...</div>}

      {!loading && items.length === 0 && <div className="opacity-70">No matches found</div>}

      {items.map((u) => (
        <div key={u.id} className="flex justify-between items-center border-b border-white/10 pb-2">
          <div>
            <div className="font-medium">{u.userName}</div>
            <div className="text-sm opacity-80">{u.email}</div>
          </div>

          <div className="flex gap-3">
            <button className="underline" onClick={() => openEdit(u)}>Edit</button>
            <button className="underline text-red-300" onClick={() => onDelete(u.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}