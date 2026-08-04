import { FormControl, MenuItem, Select } from "@mui/material";

function VideoSort({ value, onChange }) {
    return (
        <FormControl size="small" sx={{ minWidth: 170 }}>
            <Select value={value} onChange={(e) => onChange(e.target.value)} displayEmpty>
                <MenuItem value="createdAt-desc">Latest</MenuItem>
                <MenuItem value="createdAt-asc">Oldest</MenuItem>
                <MenuItem value="views-desc">Most Viewed</MenuItem>
                <MenuItem value="views-asc">Least Viewed</MenuItem>
            </Select>
        </FormControl>
    );
}

export default VideoSort;