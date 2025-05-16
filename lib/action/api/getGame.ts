export const fetchGamesFromRAWG = async (search = "") => {
    const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=40&search=${encodeURIComponent(search)}`;
  
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch games");
  
    const data = await res.json();
    return data.results;
  };
  