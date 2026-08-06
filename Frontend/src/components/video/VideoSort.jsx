import { FormControl, MenuItem, Select } from "@mui/material";

function VideoSort({ value, onChange }) {
    return (
        <FormControl size="small" sx={{ minWidth: 170 }}>
            <Select 
                className="rounded-xl border border-primary bg-surface px-4 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary"
                value={value} 
                onChange={(e) => onChange(e.target.value)} 
                displayEmpty
            >
                <MenuItem value="createdAt-desc" className="bg-surface text-foreground">
                    Latest
                </MenuItem>
                <MenuItem value="createdAt-asc">
                    Oldest
                </MenuItem>
                <MenuItem value="views-desc">
                    Most Viewed
                </MenuItem>
                <MenuItem value="views-asc">
                    Least Viewed
                </MenuItem>
            </Select>
        </FormControl>
    );
}

export default VideoSort;