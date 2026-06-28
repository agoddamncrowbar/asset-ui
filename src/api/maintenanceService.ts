import type {
    CreateMaintenanceJob,
    MaintenanceJob,
} from "./maintenance";

const API = import.meta.env.VITE_API_URL;

export async function createMaintenanceJob(
    data: CreateMaintenanceJob,
    token: string
): Promise<MaintenanceJob> {

    const res = await fetch(`${API}/maintenance`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok)
        throw new Error(json.message);

    return json.data;
}