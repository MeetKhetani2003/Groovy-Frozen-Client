import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import { assets } from '@/utils/AssetImport';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    number: false,
    message: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {
      name: !formData.name,
      email: !/\S+@\S+\.\S+/.test(formData.email),
      number: !formData.number || !/^\d+$/.test(formData.number),
      message: !formData.message,
    };
    setErrors(tempErrors);
    return Object.values(tempErrors).every((error) => !error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate an API call
      setTimeout(() => {
        setIsSubmitting(false);
        alert('Thank you for contacting us!');
        setFormData({ name: '', email: '', message: '', number: '' });
      }, 1500);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ pt: 20, pb: 6 }}>
      <Grid container spacing={4} alignItems="center">
        {/* Left Side - Image and Text */}
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: 'center' }}>
            <img
              src={assets.contact}
              alt="Contact Us"
              style={{ maxWidth: '100%', height: 'auto', marginBottom: '16px' }}
            />
          </Box>
        </Grid>

        {/* Right Side - Contact Form */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            className="text-center"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Contact Us
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', fontSize: '1rem' }}
          >
            We would love to hear from you! Fill out the form, and we’ll get
            back to you shortly.
          </Typography>
          <Box
            sx={{
              p: 4,
              boxShadow: 4,
              borderRadius: 2,
              backgroundColor: '#ffffff',
            }}
          >
            <Box component="form" noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    helperText={errors.name && 'Name is required.'}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    helperText={errors.email && 'Enter a valid email.'}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="number"
                    type="text"
                    value={formData.number}
                    onChange={handleChange}
                    error={errors.number}
                    helperText={
                      errors.number &&
                      'Enter a valid phone number (digits only).'
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    error={errors.message}
                    helperText={errors.message && 'Message cannot be empty.'}
                  />
                </Grid>
              </Grid>
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    px: 5,
                    py: 1.5,
                    borderRadius: '20px',
                    textTransform: 'none',
                    boxShadow: 3,
                    backgroundColor: '#EE7301',
                    '&:hover': { backgroundColor: '#D65F00' }, // Slightly darker shade for hover effect
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactUs;
