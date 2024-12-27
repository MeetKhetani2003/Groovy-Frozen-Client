import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Icon,
} from '@mui/material';
import { Clock10Icon, PhoneIcon } from 'lucide-react';
import { useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';

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
      setTimeout(() => {
        setIsSubmitting(false);
        alert('Thank you for contacting us!');
        setFormData({ name: '', email: '', message: '', number: '' });
      }, 1500);
    }
  };

  return (
    <Container maxWidth='lg' sx={{ pt: 10, pb: 6 }}>
      <Typography
        variant='h4'
        className='text-center'
        gutterBottom
        sx={{
          fontWeight: 700,
          fontSize: { xs: '1.8rem', md: '2.2rem' },
          color: '#333',
        }}
      >
        Contact Us
      </Typography>
      <Typography
        variant='body1'
        sx={{
          color: 'text.secondary',
          fontSize: '1rem',
          marginBottom: 2,
          textAlign: 'center',
        }}
      >
        We&apos;d love to hear from you! Fill out the form and we&apos;ll get
        back to you shortly.
      </Typography>
      <Grid
        container
        spacing={4}
        sx={{
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
        }}
      >
        {/* Contact Form */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 4,
              boxShadow: 2,
              borderRadius: 2,
              backgroundColor: '#f9f9f9',
            }}
          >
            <Box component='form' noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    helperText={errors.name && 'Name is required.'}
                    sx={{ backgroundColor: '#fff' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Email'
                    name='email'
                    type='email'
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    helperText={errors.email && 'Enter a valid email.'}
                    sx={{ backgroundColor: '#fff' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Phone Number'
                    name='number'
                    type='text'
                    value={formData.number}
                    onChange={handleChange}
                    error={errors.number}
                    helperText={
                      errors.number &&
                      'Enter a valid phone number (digits only).'
                    }
                    sx={{ backgroundColor: '#fff' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Message'
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    error={errors.message}
                    helperText={errors.message && 'Message cannot be empty.'}
                    sx={{ backgroundColor: '#fff' }}
                  />
                </Grid>
              </Grid>
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Button
                  type='submit'
                  variant='contained'
                  size='large'
                  sx={{
                    px: 5,
                    py: 1.5,
                    borderRadius: '20px',
                    textTransform: 'none',
                    boxShadow: 2,
                    backgroundColor: '#FFD900',
                    '&:hover': { backgroundColor: '#FFB900' },
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Contact Details */}
        <Grid item xs={12} md={6}>
          <Box>
            <Typography
              variant='h5'
              display={'flex'}
              sx={{ mb: 2, fontWeight: 600 }}
            >
              <CiLocationOn sx={{ verticalAlign: 'middle', marginRight: 1 }} />
              Address:
            </Typography>
            <Box
              sx={{
                backgroundColor: '#fff',
                padding: '15px',
                borderRadius: 2,
                boxShadow: 1,
                fontWeight: 500,
                color: '#333',
              }}
            >
              Groovy Multi Services Pvt. Ltd. Gate No 2 Plot No. E-0112, Road-B,
              Behind Ufresh Dairy Opp. ICICI BANK Road, Near Swaminarayan
              Restaurant, Rajkot-Kalawad Road, Metoda GIDC, Rajkot - 360021
            </Box>
          </Box>

          {/* Additional Information */}
          <Box sx={{ mt: 4 }}>
            <Typography
              variant='h6'
              display={'flex'}
              gap={1}
              sx={{ mb: 2, fontWeight: 600 }}
            >
              <Clock10Icon />
              Opening Hours:
            </Typography>
            <Box
              sx={{
                backgroundColor: '#fff',
                padding: '15px',
                borderRadius: 2,
                boxShadow: 1,
                fontWeight: 500,
                color: '#333',
              }}
            >
              Monday-Sunday, 10:00 AM to 11:00 PM
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography
              variant='h6'
              display={'flex'}
              gap={1}
              sx={{ mb: 2, fontWeight: 600 }}
            >
              <PhoneIcon />
              Contact Info:
            </Typography>
            <Box
              sx={{
                backgroundColor: '#fff',
                padding: '15px',
                borderRadius: 2,
                boxShadow: 1,
                fontWeight: 500,
                display: 'flex',
                flexDirection: 'column',
                color: '#333',
              }}
            >
              <strong>Email:</strong> admin@groovycafe.com
              <strong>Call:</strong> +91 9316500343
            </Box>
            {/* <Box
              sx={{
                backgroundColor: '#fff',
                padding: '15px',
                borderRadius: 2,
                boxShadow: 1,
                fontWeight: 500,
                color: '#333',
              }}
            >
            </Box> */}
          </Box>
        </Grid>
      </Grid>

      {/* Map */}
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14767.858607910088!2d70.7581320871582!3d22.2793288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395927d878f13b95%3A0x2dc90395b210b8d9!2sReliance%20Mall!5e0!3m2!1sen!2sin!4v1732599067442!5m2!1sen!2sin'
          width='100%'
          height='400'
          style={{ border: 0 }}
          allowFullScreen=''
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        ></iframe>
      </Box>
    </Container>
  );
};

export default ContactUs;
