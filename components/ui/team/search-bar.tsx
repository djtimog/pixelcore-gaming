// "use client";


// import { useState, ChangeEvent } from "react";
// import SearchIcon from "@mui/icons-material/Search";
// import CloseIcon from "@mui/icons-material/Close";
// import {
//   IconButton,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Modal,
//   Box,
//   Typography,
//   Divider,
// } from "@mui/material";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
// import InputAdornment from "@mui/material/InputAdornment";
// import FormControl from "@mui/material/FormControl";
// import Link from "next/link";
// import Image from "next/image";

// const SearchPlayerCard = ({
//   image,
//   link,
//   name,
//   ign,
// }: {
//   image: string;
//   link: string;
//   name: string;
//   ign: string;
// }) => {
//   return (
//     <Link href={link}>
//       <div>
//         <div className="h-32 w-32">
//           <Image src={image} alt={name} className="object-cover rounded" />
//         </div>
//         <div>
//           <p>
//             {name}
//             <span>{ign}</span>
//           </p>
//         </div>
//       </div>
//     </Link>
//   );
// };

// const SearchBar: React.FC = () => {
//   const [searchBarOpen, setSearchBarOpen] = useState<boolean>(false);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
//   const [recentSearches, setRecentSearches] = useState<string[]>(
//     initialRecentSearches
//   );

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     setFilteredSuggestions(
//       value
//         ? carSuggestions.filter((car) =>
//             car.toLowerCase().includes(value.toLowerCase())
//           )
//         : []
//     );
//   };

//   const handleSuggestionClick = (suggestion: string): void => {
//     setSearchTerm(suggestion);
//     setFilteredSuggestions([]);
//   };

//   const handleRemoveRecentSearch = (search: string): void => {
//     setRecentSearches(recentSearches.filter((item) => item !== search));
//   };

//   return (
//     <div>
//       <IconButton color="inherit" onClick={() => setSearchBarOpen(true)}>
//         <SearchIcon />
//       </IconButton>

//       <Modal
//         open={searchBarOpen}
//         onClose={() => setSearchBarOpen(false)}
//         aria-labelledby="search-modal-title"
//         aria-describedby="search-modal-description"
//         sx={{
//           backdropFilter: "blur(5px)",
//           backgroundColor: "rgba(0, 0, 0, 0.5)",
//         }}
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: { xs: "90%", sm: 500 },
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 2,
//           }}
//         >
//           <Typography id="search-modal-title" variant="h6" component="h2">
//             Search
//           </Typography>
//           <FormControl fullWidth sx={{ mt: 2 }}>
//             <InputLabel htmlFor="search">Search</InputLabel>
//             <OutlinedInput
//               id="search"
//               startAdornment={
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               }
//               label="Search"
//               autoFocus
//               value={searchTerm}
//               onChange={handleInputChange}
//             />
//           </FormControl>

//           {searchTerm ? (
//             <SuggestionsList
//               suggestions={filteredSuggestions}
//               onClick={handleSuggestionClick}
//             />
//           ) : (
//             <RecentSearchesList
//               recentSearches={recentSearches}
//               onClick={handleSuggestionClick}
//               onRemove={handleRemoveRecentSearch}
//             />
//           )}
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// const SuggestionsList: React.FC<{
//   suggestions: string[];
//   onClick: (suggestion: string) => void;
// }> = ({ suggestions, onClick }) => (
//   <>
//     <Typography variant="subtitle1" sx={{ mt: 2 }}>
//       Suggestions
//     </Typography>
//     <Divider />
//     <List sx={{ mt: 1, maxHeight: 200, overflowY: "auto" }}>
//       {suggestions.map((suggestion, index) => (
//         <ListItem key={index} disablePadding>
//           <ListItemButton
//             onClick={() => onClick(suggestion)}
//             href={`/dashboard/buy/shop/${suggestion}`}
//           >
//             <ListItemText primary={suggestion} />
//           </ListItemButton>
//         </ListItem>
//       ))}
//     </List>
//   </>
// );

// const RecentSearchesList: React.FC<{
//   recentSearches: string[];
//   onClick: (recent: string) => void;
//   onRemove: (search: string) => void;
// }> = ({ recentSearches, onClick, onRemove }) => (
//   <>
//     <Typography variant="subtitle1" sx={{ mt: 2 }}>
//       Recent Searches
//     </Typography>
//     <Divider />
//     <List sx={{ mt: 1, maxHeight: 200 }}>
//       {recentSearches.map((recent, index) => (
//         <ListItem key={index} disablePadding>
//           <ListItemButton
//             onClick={() => onClick(recent)}
//             href={`/dashboard/buy/shop/${recent}`}
//           >
//             <ListItemText primary={recent} />
//           </ListItemButton>
//           <IconButton
//             edge="end"
//             aria-label="delete"
//             onClick={() => onRemove(recent)}
//           >
//             <CloseIcon />
//           </IconButton>
//         </ListItem>
//       ))}
//     </List>
//   </>
// );

// export default SearchBar;

export default function SearchBar() {
  return(
    <div>search bar</div>
  )
}