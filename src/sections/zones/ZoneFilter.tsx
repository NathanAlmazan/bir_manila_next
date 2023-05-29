// mui
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
// types
import { ZonalClassification, Zone } from 'src/graphql/zones';


function unique(a: string[]) {
    var seen: any = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

export default function ZoneFilter({ 
    zones, 
    selectedZone, 
    selectedBarangay, 
    selectedCategory, 
    handleSelectZone, 
    handleSelectBarangay,
    handleSelectCategory
}: {
    zones: Zone[], 
    selectedZone: number, 
    selectedBarangay: string, 
    selectedCategory: string,
    handleSelectZone: (zone: number) => void, 
    handleSelectBarangay: (barangay: string) => void,
    handleSelectCategory: (category: string) => void
}) {
    const filters = zones.map(z => ({
        zone: z.number,
        barangays: unique(z.values.map(v => v.barangay)),
        classifications: unique(z.values.map(z => z.classification.name))
    }))

    return (
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent='flex-end' spacing={2} sx={{ p: 3 }}>
            {filters.length > 1 && (
                <TextField
                    label="Zone Number"
                    value={selectedZone}
                    onChange={(e) => handleSelectZone(parseInt(e.target.value))}
                    select
                    sx={{ width: 200 }}
                >
                    {filters.filter(f => f.barangays.length > 0).map(f => (
                        <MenuItem key={f.zone} value={f.zone}>{`Zone ${f.zone}`}</MenuItem>
                    ))}
                </TextField>
            )}

            <TextField
                label="Barangay"
                value={selectedBarangay}
                onChange={(e) => handleSelectBarangay(e.target.value)}
                select
                sx={{ width: 200 }}
            >
                <MenuItem key='none' value='none'>None</MenuItem>
                {filters.find(f => f.zone === selectedZone)?.barangays.map((b, index) => (
                    <MenuItem key={index} value={b}>{'Brgy. ' + b}</MenuItem>
                ))}
            </TextField>

            <TextField
                label="Classification"
                value={selectedCategory}
                onChange={(e) => handleSelectCategory(e.target.value)}
                select
                sx={{ width: 200 }}
            >
                <MenuItem key='none' value='none'>None</MenuItem>
                {filters.find(f => f.zone === selectedZone)?.classifications.map((c, index) => (
                    <MenuItem key={index} value={c}>{c}</MenuItem>
                ))}
            </TextField>
        </Stack>
    )
}