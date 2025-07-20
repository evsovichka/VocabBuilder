import { Box, CircularProgress } from "@mui/material";
import { useResizeWindow } from "../../hooks/resizeWindow";
import css from "./ProgressBar.module.css";

export default function ProgressBar({ value }) {
  const sizeWindow = useResizeWindow();
  const isMobile = sizeWindow < 768;
  return (
    <div className={css.wrap}>
      {!isMobile && <p>{value}%</p>}
      <Box position="relative" display="inline-flex">
        <CircularProgress
          size={isMobile ? 24 : 26}
          variant="determinate"
          value={100}
          sx={{
            color: "#d4f8d3",
          }}
        />
        <CircularProgress
          variant="determinate"
          size={isMobile ? 24 : 26}
          value={value}
          sx={{
            color: "#2bd627",
            position: "absolute",
            left: 0,
          }}
        />
      </Box>
    </div>
  );
}
