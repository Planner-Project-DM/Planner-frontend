import Switch from "@mui/joy/Switch/index.d.ts";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function NotificationToggle({size, checkedObj, onChange, variant, label, marginLeft, disabled}) {

    return (
        <>
            <FormControlLabel
                control={<Switch
                    disabled={disabled}
                    size={size}
                    checked={checkedObj}
                    onChange={onChange}
                    color="primary"
                    variant={checkedObj ? 'solid' : 'outlined'}
                />}
                label={<span className="text-text-main">{label}</span>}
                sx={{ gap: '8px',
                    marginLeft: marginLeft
                }}

            />

        </>
    )
}