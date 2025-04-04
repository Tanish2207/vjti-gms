let reasonsData: { get_reason_id: number; get_reason: string }[] = [];
let isReasonsLoaded = false;

export async function fetchReasons(): Promise<{ get_reason_id: number; get_reason: string }[]> {
  if (isReasonsLoaded) return reasonsData; // Return cached data if already loaded

  try {
    const response = await fetch("/api/visit_reasons");
    if (!response.ok) throw new Error("Failed to fetch visit reasons");

    const data: { get_reason_id: number; get_reason: string }[] = await response.json();

    reasonsData = data; // Cache the raw data
    isReasonsLoaded = true; // Mark as loaded
    return reasonsData;
  } catch (error) {
    console.error("Error fetching reasons:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}