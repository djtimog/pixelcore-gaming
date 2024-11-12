// components/Footer.tsx
import { Typography, TextField, Button } from '@mui/material';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <img src="/logo.png" alt="Elementrix Logo" className="mb-4" />
          <Typography variant="body1">Professional E-sport team in Nepal</Typography>
        </div>
        
        <div>
          <Typography variant="h6" className="font-bold mb-4">Quick Links</Typography>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">About us</a></li>
            <li><a href="#" className="hover:text-white">Schedule</a></li>
          </ul>
        </div>
        
        <div>
          <Typography variant="h6" className="font-bold mb-4">Join with Us</Typography>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Becoming a member</a></li>
            <li><a href="#" className="hover:text-white">Join the team</a></li>
            <li><a href="#" className="hover:text-white">Match streaming</a></li>
          </ul>
        </div>
        
        <div>
          <Typography variant="h6" className="font-bold mb-4">Support</Typography>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Customer services</a></li>
            <li><a href="#" className="hover:text-white">Email us</a></li>
          </ul>
          <div className="mt-4">
            <TextField
              label="Your email address"
              variant="outlined"
              size="small"
              className="bg-white rounded"
              fullWidth
            />
            <Button variant="contained" color="primary" className="mt-2">Send email</Button>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <Typography variant="body2">
          &copy;2022 ElementriX | Design by Hem Bdr Pun with <span className="text-red-500">&hearts;</span>
        </Typography>
      </div>
    </footer>
  );
}

export default Footer;
