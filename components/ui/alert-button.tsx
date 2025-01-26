'use client'
import React, { useState, useEffect } from "react";
import { Alert, LinearProgress, Box, Slide } from "@mui/material";

const AlertButton = ({ message, duration }: { message: string; duration: number }) => {
  const [progress, setProgress] = useState(100);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const interval = 100; 
    const step = (interval / duration) * 100; 

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev - step;
        if (next <= 0) {
          clearInterval(timer); 
          setOpen(false); 
          return 0;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [duration]);

  return (
    <Slide in={open} direction="up" mountOnEnter unmountOnExit>
      <Box sx={{ width: "min", position: "fixed", top: 50, right: 50, zIndex: 1000 }}>
        <Alert severity="success" onClose={() => setOpen(false)}>
          {message}
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ marginTop: 1 }}
            color="success"
          />
        </Alert>
      </Box>
    </Slide>
  );
};

export default AlertButton;